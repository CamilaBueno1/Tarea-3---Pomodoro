import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Platform } from "react-native";

import type { PomodoroPhase } from "../domain/pomodoro-session";

type NotificationsModule = typeof import("expo-notifications");
type NotificationPermissionsStatus =
  import("expo-notifications").NotificationPermissionsStatus;

const STUDY_END_NOTIFICATION_ID_KEY = "@cotopaxi/study-end-notification-id";
const STUDY_NOTIFICATION_CHANNEL_ID = "default";
const STUDY_NOTIFICATION_VIBRATION_PATTERN = [0, 250, 250, 250];
let notificationsModulePromise: Promise<NotificationsModule | null> | null =
  null;

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
          shouldVibrate: true,
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

async function configureAndroidChannel(
  notifications: NotificationsModule,
): Promise<void> {
  if (Platform.OS !== "android") {
    return;
  }

  await notifications.setNotificationChannelAsync(
    STUDY_NOTIFICATION_CHANNEL_ID,
    {
      name: "Pomodoro Notifications",
      importance: notifications.AndroidImportance.HIGH,
      vibrationPattern: STUDY_NOTIFICATION_VIBRATION_PATTERN,
      sound: "default",
    },
  );
}

export async function configureStudyNotifications(): Promise<void> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await configureAndroidChannel(notifications);
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

  await configureAndroidChannel(notifications);
  const permissions = await notifications.getPermissionsAsync();
  return hasNotificationPermission(permissions);
}

export async function requestStudyNotificationPermission(): Promise<boolean> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return false;
  }

  await configureAndroidChannel(notifications);
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

  await configureAndroidChannel(notifications);
  await notifications.cancelAllScheduledNotificationsAsync();
  const message = phaseMessages[phase];
  const notificationId = await notifications.scheduleNotificationAsync({
    content: {
      title: message.title,
      body: message.body,
      data: { phase },
      sound: "default",
      vibrate: STUDY_NOTIFICATION_VIBRATION_PATTERN,
      priority: notifications.AndroidNotificationPriority.MAX,
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

  await configureAndroidChannel(notifications);
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
  onResponse?: () => void,
): (() => void) | null {
  if (Constants.appOwnership === "expo") {
    return null;
  }

  try {
    const notifications: NotificationsModule = require("expo-notifications");
    const addListener = notifications.addNotificationResponseReceivedListener;
    if (typeof addListener !== "function") {
      return null;
    }

    const subscription = addListener(() => {
      onResponse?.();
      void notifications.dismissAllNotificationsAsync?.().catch(() => {});
    });
    if (!subscription || typeof subscription.remove !== "function") {
      return null;
    }

    return () => {
      try {
        subscription.remove();
      } catch {
        // El ciclo de vida de la app no debe depender del listener nativo.
      }
    };
  } catch {
    return null;
  }
}
