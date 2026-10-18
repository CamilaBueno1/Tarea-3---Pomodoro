import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import type { PomodoroPhase } from "../domain/pomodoro-session";

const STUDY_END_NOTIFICATION_ID_KEY = "@cotopaxi/study-end-notification-id";
const STUDY_NOTIFICATION_CHANNEL_ID = "pomodoro-phase-end";
const STUDY_NOTIFICATION_VIBRATION_PATTERN = [0, 250, 250, 250];

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldVibrate: true,
  }),
});

async function configureAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync(
    STUDY_NOTIFICATION_CHANNEL_ID,
    {
      name: "Fin de fase Pomodoro",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: STUDY_NOTIFICATION_VIBRATION_PATTERN,
      sound: "default",
    },
  );
}

function hasNotificationPermission(
  permissions: Notifications.NotificationPermissionsStatus,
): boolean {
  return permissions.granted;
}

export async function getStudyNotificationPermission(): Promise<boolean> {
  const permissions = await Notifications.getPermissionsAsync();
  return hasNotificationPermission(permissions);
}

export async function requestStudyNotificationPermission(): Promise<boolean> {
  await configureAndroidChannel();
  const currentPermissions = await Notifications.getPermissionsAsync();

  if (hasNotificationPermission(currentPermissions)) {
    return true;
  }

  if (!currentPermissions.canAskAgain) {
    return false;
  }

  const requestedPermissions = await Notifications.requestPermissionsAsync();
  return hasNotificationPermission(requestedPermissions);
}

export async function cancelStudyEndNotification(): Promise<void> {
  const notificationId = await AsyncStorage.getItem(
    STUDY_END_NOTIFICATION_ID_KEY,
  );

  if (notificationId === null) {
    return;
  }

  await Notifications.cancelScheduledNotificationAsync(notificationId);
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

  await configureAndroidChannel();
  const message = phaseMessages[phase];
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: message.title,
      body: message.body,
      data: { phase },
      sound: "default",
      vibrate: STUDY_NOTIFICATION_VIBRATION_PATTERN,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
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
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    throw error;
  }
}
