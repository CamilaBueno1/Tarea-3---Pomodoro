import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { PermissionStatus } from "expo-modules-core";
import { Platform } from "react-native";

import {
  cancelStudyEndNotification,
  requestStudyNotificationPermission,
  scheduleStudyEndNotification,
} from "../study-notifications";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

jest.mock("expo-notifications", () => ({
  __esModule: true,
  AndroidImportance: { DEFAULT: 3 },
  SchedulableTriggerInputTypes: { DATE: "date" },
  setNotificationHandler: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
}));

const mockGetItem = jest.mocked(AsyncStorage.getItem);
const mockSetItem = jest.mocked(AsyncStorage.setItem);
const mockRemoveItem = jest.mocked(AsyncStorage.removeItem);
const mockGetPermissions = jest.mocked(Notifications.getPermissionsAsync);
const mockRequestPermissions = jest.mocked(
  Notifications.requestPermissionsAsync,
);
const mockScheduleNotification = jest.mocked(
  Notifications.scheduleNotificationAsync,
);
const mockSetNotificationChannel = jest.mocked(
  Notifications.setNotificationChannelAsync,
);
const mockCancelNotification = jest.mocked(
  Notifications.cancelScheduledNotificationAsync,
);

describe("study end notifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockResolvedValue(null);
    mockSetItem.mockResolvedValue(undefined);
    mockRemoveItem.mockResolvedValue(undefined);
    mockGetPermissions.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: PermissionStatus.GRANTED,
    });
    mockRequestPermissions.mockResolvedValue({
      granted: true,
      canAskAgain: true,
      expires: "never",
      status: PermissionStatus.GRANTED,
    });
    mockScheduleNotification.mockResolvedValue("notification-id");
  });

  it("requests permission when it has not already been granted", async () => {
    mockGetPermissions.mockResolvedValue({
      granted: false,
      canAskAgain: true,
      expires: "never",
      status: PermissionStatus.UNDETERMINED,
    });

    await expect(requestStudyNotificationPermission()).resolves.toBe(true);
    expect(mockRequestPermissions).toHaveBeenCalledTimes(1);
  });

  it("does not request permission again when the user has denied it", async () => {
    mockGetPermissions.mockResolvedValue({
      granted: false,
      canAskAgain: false,
      expires: "never",
      status: PermissionStatus.DENIED,
    });

    await expect(requestStudyNotificationPermission()).resolves.toBe(false);
    expect(mockRequestPermissions).not.toHaveBeenCalled();
  });

  it("schedules a notification with the phase and absolute end timestamp", async () => {
    const originalPlatform = Platform.OS;
    Platform.OS = "android";

    try {
      const endsAt = Date.now() + 1_800_000;
      await scheduleStudyEndNotification("shortBreak", endsAt);

      expect(mockScheduleNotification).toHaveBeenCalledWith({
        content: {
          title: "Descanso corto terminado",
          body: "Tu descanso corto terminó. Puedes volver al estudio.",
          data: { phase: "shortBreak" },
          sound: "default",
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          type: "date",
          date: new Date(endsAt),
          channelId: "pomodoro-phase-end",
        },
      });
      expect(mockSetNotificationChannel).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          importance: 3,
          vibrationPattern: [0, 250, 250, 250],
          sound: "default",
        }),
      );
      expect(mockSetItem).toHaveBeenCalledWith(
        expect.any(String),
        "notification-id",
      );
    } finally {
      Platform.OS = originalPlatform;
    }
  });

  it("replaces and cancels only the scheduled study notification", async () => {
    mockGetItem.mockResolvedValue("previous-id");

    await scheduleStudyEndNotification("study", Date.now() + 2_000_000);

    expect(mockCancelNotification).toHaveBeenCalledWith("previous-id");
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);

    mockGetItem.mockResolvedValue("notification-id");
    await cancelStudyEndNotification();

    expect(mockCancelNotification).toHaveBeenCalledWith("notification-id");
    expect(mockRemoveItem).toHaveBeenCalledTimes(2);
  });

  it("propagates scheduling failures", async () => {
    const scheduleError = new Error("schedule failed");
    mockScheduleNotification.mockRejectedValue(scheduleError);

    await expect(
      scheduleStudyEndNotification("study", Date.now() + 2_000_000),
    ).rejects.toBe(scheduleError);
  });
});
