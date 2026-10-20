import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { PermissionStatus } from "expo-modules-core";
import { NativeModules, Platform } from "react-native";

import appConfig from "../../../app.json";

import {
  cancelStudyEndNotification,
  addStudyNotificationResponseListener,
  configureStudyNotifications,
  getStudyNotificationPermission,
  getLastStudyNotificationResponse,
  clearLastStudyNotificationResponse,
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
  AndroidNotificationPriority: { MAX: "max" },
  SchedulableTriggerInputTypes: { DATE: "date" },
  DEFAULT_ACTION_IDENTIFIER: "expo.modules.notifications.actions.DEFAULT",
  setNotificationHandler: jest.fn(),
  setNotificationCategoryAsync: jest.fn().mockResolvedValue(undefined),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
  addNotificationResponseReceivedListener: jest.fn(),
  getLastNotificationResponse: jest.fn(),
  clearLastNotificationResponse: jest.fn(),
  dismissNotificationAsync: jest.fn().mockResolvedValue(undefined),
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
const mockConfigureNativeAlarmChannel = jest.fn();
const mockSetNotificationCategory = jest.mocked(
  Notifications.setNotificationCategoryAsync,
);
const mockCancelNotification = jest.mocked(
  Notifications.cancelScheduledNotificationAsync,
);
const mockCancelAllScheduledNotifications = jest.mocked(
  Notifications.cancelAllScheduledNotificationsAsync,
);
const mockAddNotificationListener = jest.mocked(
  Notifications.addNotificationResponseReceivedListener,
);
const mockGetLastNotificationResponse = jest.mocked(
  Notifications.getLastNotificationResponse,
);
const mockClearLastNotificationResponse = jest.mocked(
  Notifications.clearLastNotificationResponse,
);
const mockDismissNotification = jest.mocked(
  Notifications.dismissNotificationAsync,
);

describe("study end notifications", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    NativeModules.StudyAlarmChannel = {
      configure: mockConfigureNativeAlarmChannel,
    };
    mockConfigureNativeAlarmChannel.mockResolvedValue(undefined);
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
    mockCancelAllScheduledNotifications.mockResolvedValue(undefined);
    mockGetLastNotificationResponse.mockReturnValue(null);
    mockClearLastNotificationResponse.mockImplementation(() => undefined);
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

  it("creates the Android channel before requesting notification permission", async () => {
    const originalPlatform = Platform.OS;
    Platform.OS = "android";
    mockGetPermissions.mockResolvedValue({
      granted: false,
      canAskAgain: true,
      expires: "never",
      status: PermissionStatus.UNDETERMINED,
    });

    try {
      await expect(requestStudyNotificationPermission()).resolves.toBe(true);

      expect(mockConfigureNativeAlarmChannel.mock.invocationCallOrder[0]).toBeLessThan(
        mockRequestPermissions.mock.invocationCallOrder[0],
      );
    } finally {
      Platform.OS = originalPlatform;
    }
  });

  it("configures the native alarm channel before permission is requested", async () => {
    const originalPlatform = Platform.OS;
    Platform.OS = "android";

    try {
      await configureStudyNotifications();

      expect(mockConfigureNativeAlarmChannel).toHaveBeenCalledWith(
        "studyend8",
        [
          "default",
          "studyend",
          "studyend2",
          "studyend3",
          "studyend4",
          "studyend5",
          "studyend6",
          "studyend7",
        ],
        [0, 250, 250, 250],
      );
    } finally {
      Platform.OS = originalPlatform;
    }
  });

  it("declares the Android exact-alarm access without USE_EXACT_ALARM", () => {
    const androidConfig = appConfig.expo.android as {
      permissions?: string[];
    };
    const permissions = androidConfig.permissions;

    expect(permissions).toEqual(
      expect.arrayContaining(["android.permission.SCHEDULE_EXACT_ALARM"]),
    );
    expect(permissions).not.toContain("android.permission.USE_EXACT_ALARM");
  });

  it("registers a foreground stop action for phase notifications", async () => {
    await configureStudyNotifications();

    expect(mockSetNotificationCategory).toHaveBeenCalledWith("studyend", [
      {
        identifier: "stop",
        buttonTitle: "Detener",
        options: { opensAppToForeground: true },
      },
    ]);
  });

  it("reads and clears the initial notification response supported by SDK 57", async () => {
    const initialResponse = {
      actionIdentifier: Notifications.DEFAULT_ACTION_IDENTIFIER,
      notification: {
        date: Date.now(),
        request: {
          identifier: "cold-start-notification",
          content: {
            title: "Tiempo de estudio terminado",
            subtitle: null,
            body: "Tu tiempo de estudio terminó.",
            data: { phase: "study" },
            categoryIdentifier: "studyend",
            sound: "default" as const,
            launchImageName: null,
            badge: null,
            attachments: [],
            threadIdentifier: null,
          },
          trigger: null,
        },
      },
    };
    mockGetLastNotificationResponse.mockReturnValue(initialResponse);

    await expect(getLastStudyNotificationResponse()).resolves.toEqual(
      initialResponse,
    );
    await clearLastStudyNotificationResponse();

    expect(mockGetLastNotificationResponse).toHaveBeenCalledTimes(1);
    expect(mockClearLastNotificationResponse).toHaveBeenCalledTimes(1);
  });

  it("schedules a notification with the phase and absolute end timestamp", async () => {
    const originalPlatform = Platform.OS;
    Platform.OS = "android";

    try {
      const endsAt = Date.now() + 1_800_000;
      await scheduleStudyEndNotification("shortBreak", endsAt);

      expect(mockCancelAllScheduledNotifications).toHaveBeenCalledTimes(1);
      expect(mockCancelAllScheduledNotifications.mock.invocationCallOrder[0])
        .toBeLessThan(mockScheduleNotification.mock.invocationCallOrder[0]);
      expect(mockScheduleNotification).toHaveBeenCalledWith({
        content: {
          title: "Descanso corto terminado",
          body: "Tu descanso corto terminó. Puedes volver al estudio.",
          data: { phase: "shortBreak" },
          sound: "default",
          vibrate: [0, 250, 250, 250],
          priority: Notifications.AndroidNotificationPriority.MAX,
          categoryIdentifier: "studyend",
        },
        trigger: {
          type: "date",
          date: new Date(endsAt),
          channelId: "studyend8",
        },
      });
      expect(
        mockConfigureNativeAlarmChannel.mock.invocationCallOrder[0],
      ).toBeLessThan(mockScheduleNotification.mock.invocationCallOrder[0]);
      expect(mockConfigureNativeAlarmChannel).toHaveBeenCalledWith(
        "studyend8",
        [
          "default",
          "studyend",
          "studyend2",
          "studyend3",
          "studyend4",
          "studyend5",
          "studyend6",
          "studyend7",
        ],
        [0, 250, 250, 250],
      );
      expect(mockSetNotificationCategory).toHaveBeenCalledWith(
        "studyend",
        expect.any(Array),
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

    expect(mockCancelAllScheduledNotifications).toHaveBeenCalledTimes(1);
    expect(mockCancelAllScheduledNotifications.mock.invocationCallOrder[0])
      .toBeLessThan(mockScheduleNotification.mock.invocationCallOrder[0]);
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
      expect(
        addStudyNotificationResponseListener(jest.fn(), jest.fn()),
      ).toBeNull();
      expect(mockGetPermissions).not.toHaveBeenCalled();
      expect(mockRequestPermissions).not.toHaveBeenCalled();
      expect(mockScheduleNotification).not.toHaveBeenCalled();
      expect(mockCancelAllScheduledNotifications).not.toHaveBeenCalled();
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

  it("reports listener registration failures", () => {
    const listenerError = jest.fn();
    mockAddNotificationListener.mockImplementationOnce(() => {
      throw new Error("ExpoTopicSubscriptionModule missing");
    });

    expect(
      addStudyNotificationResponseListener(jest.fn(), listenerError),
    ).toBeNull();
    expect(listenerError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("ExpoTopicSubscriptionModule missing"),
      }),
    );
  });

  it("forwards the response and dismisses the tapped notification", () => {
    const onResponse = jest.fn();
    mockAddNotificationListener.mockReturnValueOnce({
      remove: jest.fn(),
    });

    addStudyNotificationResponseListener(onResponse, jest.fn());
    const listener = mockAddNotificationListener.mock.calls[0]?.[0];
    if (listener === undefined) {
      throw new Error("The notification response listener was not registered.");
    }

    listener({
      actionIdentifier: "stop",
      notification: {
        date: Date.now(),
        request: {
          identifier: "delivered-notification",
          content: {
            title: "Tiempo de estudio terminado",
            subtitle: null,
            body: "Tu tiempo de estudio terminó.",
            data: { phase: "study" },
            categoryIdentifier: "studyend",
            sound: "default",
            launchImageName: null,
            badge: null,
            attachments: [],
            threadIdentifier: null,
          },
          trigger: null,
        },
      },
    });

    expect(onResponse).toHaveBeenCalledWith(
      expect.objectContaining({ actionIdentifier: "stop" }),
    );
    expect(mockDismissNotification).toHaveBeenCalledWith(
      "delivered-notification",
    );
  });

  it("reports notification dismissal failures", async () => {
    const dismissalError = new Error("dismiss failed");
    const onError = jest.fn();
    mockDismissNotification.mockRejectedValueOnce(dismissalError);
    mockAddNotificationListener.mockReturnValueOnce({
      remove: jest.fn(),
    });

    addStudyNotificationResponseListener(jest.fn(), onError);
    const listener = mockAddNotificationListener.mock.calls[0]?.[0];
    if (listener === undefined) {
      throw new Error("The notification response listener was not registered.");
    }
    listener({
      actionIdentifier: Notifications.DEFAULT_ACTION_IDENTIFIER,
      notification: {
        date: Date.now(),
        request: {
          identifier: "tapped-notification",
          content: {
            title: null,
            subtitle: null,
            body: null,
            categoryIdentifier: null,
            sound: "default",
            launchImageName: null,
            badge: null,
            attachments: [],
            threadIdentifier: null,
          },
          trigger: null,
        },
      },
    });

    await Promise.resolve();
    expect(onError).toHaveBeenCalledWith(dismissalError);
  });

  it("surfaces native listener cleanup failures", () => {
    mockAddNotificationListener.mockReturnValueOnce({
      remove: () => {
        throw new Error("listener already removed");
      },
    });

    const unsubscribe = addStudyNotificationResponseListener(
      jest.fn(),
      jest.fn(),
    );
    expect(() => unsubscribe?.()).toThrow("listener already removed");
  });

  it("reports an unavailable Expo Go native module without crashing on import", async () => {
    jest.resetModules();
    jest.doMock("expo-notifications", () => {
      throw new Error("Cannot find native module 'ExpoTopicSubscriptionModule'");
    });

    const notificationAdapter: typeof import("../study-notifications") =
      require("../study-notifications");

    const listenerError = jest.fn();
    expect(
      notificationAdapter.addStudyNotificationResponseListener(
        jest.fn(),
        listenerError,
      ),
    ).toBeNull();
    expect(listenerError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("ExpoTopicSubscriptionModule"),
      }),
    );
    await expect(
      notificationAdapter.getStudyNotificationPermission(),
    ).rejects.toThrow(
      "Las notificaciones no están disponibles en esta versión de Expo Go.",
    );
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
