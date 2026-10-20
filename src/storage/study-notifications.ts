import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { NativeModules, Platform } from "react-native";

import type { PomodoroPhase } from "../domain/pomodoro-session";

type NotificationsModule = typeof import("expo-notifications");
type NotificationPermissionsStatus =
  import("expo-notifications").NotificationPermissionsStatus;

const STUDY_END_NOTIFICATION_ID_KEY = "@cotopaxi/study-end-notification-id";
const STUDY_NOTIFICATION_CHANNEL_ID = "studyend8";
const LEGACY_STUDY_NOTIFICATION_CHANNEL_IDS = [
  "default",
  "studyend",
  "studyend2",
  "studyend3",
  "studyend4",
  "studyend5",
  "studyend6",
  "studyend7",
];
const STUDY_NOTIFICATION_CATEGORY_ID = "studyend";
const STUDY_NOTIFICATION_STOP_ACTION_ID = "stop";
const STUDY_NOTIFICATION_VIBRATION_PATTERN = [0, 250, 250, 250];
let notificationsModulePromise: Promise<NotificationsModule | null> | null =
  null;

type NotificationResponse = import("expo-notifications").NotificationResponse;
type NativeAlarmChannelModule = {
  configure: (
    channelId: string,
    legacyChannelIds: string[],
    vibrationPattern: number[],
  ) => Promise<void>;
};

function isNativeAlarmChannelModule(
  value: unknown,
): value is NativeAlarmChannelModule {
  return (
    typeof value === "object" &&
    value !== null &&
    "configure" in value &&
    typeof value.configure === "function"
  );
}

const phaseMessages: Record<PomodoroPhase, { title: string; body: string }> = {
  study: {
    title: "Tiempo de estudio terminado",
    body: "Tu tiempo de estudio terminó. Puedes iniciar un descanso.",
  },
  shortBreak: {
    title: "Descanso corto terminado",
    body: "Tu descanso corto terminó. Puedes volver al estudio.",
  },
  longBreak: {
    title: "Descanso largo terminado",
    body: "Tu descanso largo terminó. Puedes volver al estudio.",
  },
};

function loadNotificationsModule(): Promise<NotificationsModule | null> {
  if (Constants.appOwnership === "expo") {
    return Promise.resolve(null);
  }

  notificationsModulePromise ??= Promise.resolve()
    .then(() => {
      const notifications: NotificationsModule = require("expo-notifications");
      notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          priority: notifications.AndroidNotificationPriority.MAX,
        }),
      });
      return notifications;
    })
    .catch((error: unknown) => {
      notificationsModulePromise = null;
      const detail = error instanceof Error ? ` (${error.message})` : "";
      throw new Error(
        `Las notificaciones no están disponibles en esta versión de Expo Go. El temporizador seguirá funcionando sin avisos.${detail}`,
      );
    });

  return notificationsModulePromise;
}

async function configureAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") {
    return;
  }

  const nativeModule: unknown = NativeModules.StudyAlarmChannel;
  if (!isNativeAlarmChannelModule(nativeModule)) {
    throw new Error(
      "No se pudo configurar el canal de alarma. Instala la versión Android completa de la aplicación.",
    );
  }

  await nativeModule.configure(
    STUDY_NOTIFICATION_CHANNEL_ID,
    LEGACY_STUDY_NOTIFICATION_CHANNEL_IDS,
    STUDY_NOTIFICATION_VIBRATION_PATTERN,
  );
}

async function configureStudyNotificationCategory(
  notifications: NotificationsModule,
): Promise<void> {
  await notifications.setNotificationCategoryAsync(
    STUDY_NOTIFICATION_CATEGORY_ID,
    [
      {
        identifier: STUDY_NOTIFICATION_STOP_ACTION_ID,
        buttonTitle: "Detener",
        options: { opensAppToForeground: true },
      },
    ],
  );
}

async function configureNotificationPresentation(
  notifications: NotificationsModule,
): Promise<void> {
  await configureAndroidChannel();
  await configureStudyNotificationCategory(notifications);
}

export async function configureStudyNotifications(): Promise<void> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await configureNotificationPresentation(notifications);
}

function hasNotificationPermission(
  permissions: NotificationPermissionsStatus,
): boolean {
  return permissions.granted;
}

export async function getStudyNotificationPermission(): Promise<boolean> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return false;
  }

  await configureNotificationPresentation(notifications);
  const permissions = await notifications.getPermissionsAsync();
  return hasNotificationPermission(permissions);
}

export async function requestStudyNotificationPermission(): Promise<boolean> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return false;
  }

  await configureNotificationPresentation(notifications);
  const currentPermissions = await notifications.getPermissionsAsync();

  if (hasNotificationPermission(currentPermissions)) {
    return true;
  }

  if (!currentPermissions.canAskAgain) {
    return false;
  }

  const requestedPermissions = await notifications.requestPermissionsAsync();
  return hasNotificationPermission(requestedPermissions);
}

export async function cancelStudyEndNotification(): Promise<void> {
  const notificationId = await AsyncStorage.getItem(
    STUDY_END_NOTIFICATION_ID_KEY,
  );

  if (notificationId === null) {
    return;
  }

  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await notifications.cancelScheduledNotificationAsync(notificationId);
  await AsyncStorage.removeItem(STUDY_END_NOTIFICATION_ID_KEY);
}

export async function getLastStudyNotificationResponse(): Promise<
  NotificationResponse | null
> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return null;
  }

  return notifications.getLastNotificationResponse();
}

export async function clearLastStudyNotificationResponse(): Promise<void> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  notifications.clearLastNotificationResponse();
}

export async function scheduleStudyEndNotification(
  phase: PomodoroPhase,
  endsAt: number,
): Promise<void> {
  await cancelStudyEndNotification();

  if (endsAt <= Date.now()) {
    return;
  }

  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await configureNotificationPresentation(notifications);
  await notifications.cancelAllScheduledNotificationsAsync();
  const message = phaseMessages[phase];
  const notificationId = await notifications.scheduleNotificationAsync({
    content: {
      title: message.title,
      body: message.body,
      data: { phase },
      sound: "default",
      ...(Platform.OS === "android"
        ? {
            vibrate: STUDY_NOTIFICATION_VIBRATION_PATTERN,
            priority: notifications.AndroidNotificationPriority.MAX,
          }
        : {}),
      categoryIdentifier: STUDY_NOTIFICATION_CATEGORY_ID,
    },
    trigger: {
      type: notifications.SchedulableTriggerInputTypes.DATE,
      date: new Date(endsAt),
      ...(Platform.OS === "android"
        ? { channelId: STUDY_NOTIFICATION_CHANNEL_ID }
        : {}),
    },
  });

  try {
    await AsyncStorage.setItem(
      STUDY_END_NOTIFICATION_ID_KEY,
      notificationId,
    );
  } catch (error: unknown) {
    await notifications.cancelScheduledNotificationAsync(notificationId);
    throw error;
  }
}

export async function notifyStudyPhaseCompleted(): Promise<void> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await configureAndroidChannel();
  await notifications.cancelAllScheduledNotificationsAsync();
  await notifications.scheduleNotificationAsync({
    content: {
      title: "¡Tiempo finalizado!",
      body: "Tu sesión ha concluido.",
      sound: true,
      vibrate: STUDY_NOTIFICATION_VIBRATION_PATTERN,
      priority: notifications.AndroidNotificationPriority.MAX,
    },
    trigger: null,
  });
}

export function addStudyNotificationResponseListener(
  onResponse: (response: NotificationResponse) => void,
  onError: (error: Error) => void,
): (() => void) | null {
  if (Constants.appOwnership === "expo") {
    return null;
  }

  try {
    const notifications: NotificationsModule = require("expo-notifications");
    const subscription = notifications.addNotificationResponseReceivedListener(
      (response) => {
        try {
          onResponse(response);
        } catch (error: unknown) {
          onError(
            error instanceof Error
              ? error
              : new Error("No se pudo procesar la respuesta al aviso."),
          );
        }

        void notifications
          .dismissNotificationAsync(
            response.notification.request.identifier,
          )
          .catch((error: unknown) => {
            onError(
              error instanceof Error
                ? error
                : new Error("No se pudo descartar el aviso."),
            );
          });
    });
    if (!subscription || typeof subscription.remove !== "function") {
      throw new Error("No se pudo registrar la respuesta a notificaciones.");
    }

    return () => {
      subscription.remove();
    };
  } catch (error: unknown) {
    const detail = error instanceof Error ? ` (${error.message})` : "";
    onError(
      new Error(`No se pudieron escuchar las respuestas al aviso.${detail}`),
    );
    return null;
  }
}
