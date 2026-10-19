import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { PermissionStatus } from "expo-modules-core";
import { Platform } from "react-native";

import {
  cancelStudyEndNotification,
  addStudyNotificationResponseListener,
  configureStudyNotifications,
  getStudyNotificationPermission,
  requestStudyNotificationPermission,
  scheduleStudyEndNotification,
  notifyStudyPhaseCompleted,
} from "../study-notifications";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

jest.mock("expo-constants", () => ({
  __esModule: true,
  default: { appOwnership: null },
}));

jest.mock("expo-notifications", () => ({
  __esModule: true,
  AndroidImportance: { DEFAULT: 3, HIGH: 4 },
  AndroidNotificationPriority: { MAX: "max" },
  SchedulableTriggerInputTypes: { DATE: "date" },
  setNotificationHandler: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
  addNotificationResponseReceivedListener: jest.fn(),
  dismissAllNotificationsAsync: jest.fn().mockResolvedValue(undefined),
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
const mockSetNotificationHandler = jest.mocked(
  Notifications.setNotificationHandler,
);
const mockSetNotificationChannel = jest.mocked(
  Notifications.setNotificationChannelAsync,
);
const mockCancelNotification = jest.mocked(
  Notifications.cancelScheduledNotificationAsync,
);
const mockAddNotificationListener = jest.mocked(
  Notifications.addNotificationResponseReceivedListener,
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
    const handler = mockSetNotificationHandler.mock.calls[0]?.[0];
    if (handler === undefined || handler === null) {
      throw new Error(
        "The foreground notification handler was not configured.",
      );
    }

    const behavior = await handler.handleNotification({
      date: Date.now(),
      request: {
        identifier: "notification-id",
        content: {
          title: "Temporizador",
          subtitle: null,
          body: "Finalizó la fase.",
          data: {},
          categoryIdentifier: null,
          sound: "default",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: Date.now(),
        },
      },
    });
    expect(behavior).toMatchObject({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      priority: Notifications.AndroidNotificationPriority.MAX,
    });
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

  it("configures the default high-importance Android notification channel", async () => {
    const originalPlatform = Platform.OS;
    Platform.OS = "android";

    try {
      await configureStudyNotifications();

      expect(mockSetNotificationChannel).toHaveBeenCalledWith("default", {
        name: "Pomodoro Notifications",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: "default",
      });
    } finally {
      Platform.OS = originalPlatform;
    }
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
          priority: Notifications.AndroidNotificationPriority.MAX,
        },
        trigger: {
          type: "date",
          date: new Date(endsAt),
          channelId: "default",
        },
      });
      expect(mockSetNotificationChannel).toHaveBeenCalledWith(
        "default",
        expect.objectContaining({
          importance: 4,
          name: "Pomodoro Notifications",
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

  it("sends an immediate notification when a phase completes", async () => {
    await notifyStudyPhaseCompleted();

    expect(mockScheduleNotification).toHaveBeenCalledWith({
      content: {
        title: "¡Tiempo finalizado!",
        body: "Tu sesión ha concluido.",
        sound: true,
        vibrate: [0, 250, 250, 250],
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: null,
    });
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

  it("preserves the notification ID and surfaces cancellation failures", async () => {
    const cancellationError = new Error("native notifications unavailable");
    mockGetItem.mockResolvedValue("previous-id");
    mockCancelNotification.mockRejectedValueOnce(cancellationError);

    await expect(cancelStudyEndNotification()).rejects.toBe(cancellationError);

    expect(mockRemoveItem).not.toHaveBeenCalled();
  });

  it("propagates scheduling failures", async () => {
    const scheduleError = new Error("schedule failed");
    mockScheduleNotification.mockRejectedValue(scheduleError);

    await expect(
      scheduleStudyEndNotification("study", Date.now() + 2_000_000),
    ).rejects.toBe(scheduleError);
  });

  it("reports an unavailable Expo Go native module without crashing on import", async () => {
    jest.resetModules();
    jest.doMock("expo-notifications", () => {
      throw new Error("Cannot find native module 'ExpoTopicSubscriptionModule'");
    });

    const notificationAdapter: typeof import("../study-notifications") =
      require("../study-notifications");

    expect(
      notificationAdapter.addStudyNotificationResponseListener(),
    ).toBeNull();
    await expect(
      notificationAdapter.getStudyNotificationPermission(),
    ).rejects.toThrow(
      "Las notificaciones no están disponibles en esta versión de Expo Go.",
    );
  });

  it("treats notifications as unavailable in Expo Go", async () => {
    const ownershipDescriptor = Object.getOwnPropertyDescriptor(
      Constants,
      "appOwnership",
    );
    Object.defineProperty(Constants, "appOwnership", {
      configurable: true,
      value: "expo",
    });

    try {
      mockGetItem.mockResolvedValue("previous-id");

      await expect(getStudyNotificationPermission()).resolves.toBe(false);
      await expect(requestStudyNotificationPermission()).resolves.toBe(false);
      await expect(
        scheduleStudyEndNotification("study", Date.now() + 2_000_000),
      ).resolves.toBeUndefined();
      await expect(cancelStudyEndNotification()).resolves.toBeUndefined();
      expect(addStudyNotificationResponseListener()).toBeNull();
      expect(mockGetPermissions).not.toHaveBeenCalled();
      expect(mockRequestPermissions).not.toHaveBeenCalled();
      expect(mockScheduleNotification).not.toHaveBeenCalled();
      expect(mockCancelNotification).not.toHaveBeenCalled();
      expect(mockAddNotificationListener).not.toHaveBeenCalled();
    } finally {
      if (ownershipDescriptor) {
        Object.defineProperty(
          Constants,
          "appOwnership",
          ownershipDescriptor,
        );
      } else {
        Reflect.deleteProperty(Constants, "appOwnership");
      }
    }
  });

  it("ignores listener registration failures when the native module is unavailable", () => {
    mockAddNotificationListener.mockImplementationOnce(() => {
      throw new Error("ExpoTopicSubscriptionModule missing");
    });

    expect(addStudyNotificationResponseListener()).toBeNull();
  });

  it("does not let native listener cleanup failures escape", () => {
    mockAddNotificationListener.mockReturnValueOnce({
      remove: () => {
        throw new Error("listener already removed");
      },
    });

    const unsubscribe = addStudyNotificationResponseListener();
    expect(() => unsubscribe?.()).not.toThrow();
  });

  it("does not mutate a read-only Expo global while importing the adapter", () => {
    const originalExpoDescriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "expo",
    );
    Object.defineProperty(globalThis, "expo", {
      configurable: true,
      value: Object.freeze({ modules: Object.freeze({}) }),
      writable: false,
    });

    try {
      jest.resetModules();
      const notificationAdapter: typeof import("../study-notifications") =
        require("../study-notifications");

      expect(notificationAdapter.getStudyNotificationPermission).toEqual(
        expect.any(Function),
      );
      expect(
        Object.getOwnPropertyDescriptor(globalThis, "expo")?.writable,
      ).toBe(false);
    } finally {
      if (originalExpoDescriptor) {
        Object.defineProperty(globalThis, "expo", originalExpoDescriptor);
      } else {
        Reflect.deleteProperty(globalThis, "expo");
      }
      jest.resetModules();
    }
  });
});
