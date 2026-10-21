import { act, renderHook, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { AppState, type AppStateStatus } from "react-native";

import {
  addStudyNotificationResponseListener,
  cancelStudyEndNotification,
  clearLastStudyNotificationResponse,
  getLastStudyNotificationResponse,
  getStudyNotificationPermission,
  notifyStudyPhaseCompleted,
  requestStudyNotificationPermission,
  scheduleStudyEndNotification,
} from "../../storage/study-notifications";
import { loadStudySession, saveStudySession } from "../../storage/study-session-storage";
import {
  createPomodoroSession,
  startPomodoroSession,
} from "../../domain/pomodoro-session";
import {
  DEFAULT_POMODORO_SETTINGS,
  type PomodoroSettings,
} from "../../domain/pomodoro-settings";
import { usePomodoroSettings } from "../use-pomodoro-settings";
import {
  PomodoroSessionProvider,
  usePomodoroSession,
} from "../use-pomodoro-session";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("../../hooks/use-pomodoro-settings", () => ({
  usePomodoroSettings: jest.fn(),
}));
jest.mock("../../storage/study-session-storage", () => ({
  loadStudySession: jest.fn(),
  saveStudySession: jest.fn(),
}));
jest.mock("../../storage/study-notifications", () => ({
  addStudyNotificationResponseListener: jest.fn(),
  cancelStudyEndNotification: jest.fn(),
  clearLastStudyNotificationResponse: jest.fn(),
  getLastStudyNotificationResponse: jest.fn(),
  getStudyNotificationPermission: jest.fn(),
  notifyStudyPhaseCompleted: jest.fn(),
  requestStudyNotificationPermission: jest.fn(),
  scheduleStudyEndNotification: jest.fn(),
}));

const mockUseSettings = jest.mocked(usePomodoroSettings);
const mockLoadSession = jest.mocked(loadStudySession);
const mockSaveSession = jest.mocked(saveStudySession);
const mockGetPermission = jest.mocked(getStudyNotificationPermission);
const mockGetLastNotificationResponse = jest.mocked(
  getLastStudyNotificationResponse,
);
const mockClearLastNotificationResponse = jest.mocked(
  clearLastStudyNotificationResponse,
);
const mockAddNotificationResponseListener = jest.mocked(
  addStudyNotificationResponseListener,
);
const mockRequestPermission = jest.mocked(
  requestStudyNotificationPermission,
);
const mockScheduleNotification = jest.mocked(scheduleStudyEndNotification);
const mockNotifyPhaseCompleted = jest.mocked(notifyStudyPhaseCompleted);
const mockCancelNotification = jest.mocked(cancelStudyEndNotification);
const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn();
const mockUseRouter = jest.mocked(useRouter);
const settings: PomodoroSettings = {
  ...DEFAULT_POMODORO_SETTINGS,
  studyDurationMinutes: 1,
  shortBreakDurationMinutes: 1,
  longBreakDurationMinutes: 2,
  pomodorosBeforeLongBreak: 2,
};
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PomodoroSessionProvider>{children}</PomodoroSessionProvider>
);

describe("Pomodoro session hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
      replace: mockRouterReplace,
    } as unknown as ReturnType<typeof useRouter>);
    mockUseSettings.mockReturnValue({
      settings,
      status: "ready",
      error: null,
      saveSettings: jest.fn(),
    });
    mockLoadSession.mockResolvedValue(null);
    mockSaveSession.mockResolvedValue(undefined);
    mockGetPermission.mockResolvedValue(true);
    mockGetLastNotificationResponse.mockResolvedValue(null);
    mockClearLastNotificationResponse.mockResolvedValue(undefined);
    mockAddNotificationResponseListener.mockReturnValue(jest.fn());
    mockRequestPermission.mockResolvedValue(true);
    mockScheduleNotification.mockResolvedValue(undefined);
    mockNotifyPhaseCompleted.mockResolvedValue(undefined);
    mockCancelNotification.mockResolvedValue(undefined);
    jest.spyOn(Date, "now").mockReturnValue(1_000_000);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("initializes and persists a ready study phase when no session exists", async () => {
    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.session).toEqual(createPomodoroSession(settings));
    expect(mockSaveSession).toHaveBeenCalledWith(
      createPomodoroSession(settings),
    );
  });

  it("restores a running session and schedules its end notification", async () => {
    const running = startPomodoroSession(
      createPomodoroSession(settings),
      1_000_000,
    );
    mockLoadSession.mockResolvedValue(running);

    const { result, rerender } = await renderHook(() => usePomodoroSession(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.session).toEqual(running);
    expect(result.current.remainingMs).toBe(60_000);
    rerender(undefined);
    await waitFor(() =>
      expect(mockScheduleNotification).toHaveBeenCalledTimes(1),
    );
    rerender(undefined);
    await waitFor(() =>
      expect(mockScheduleNotification).toHaveBeenCalledTimes(1),
    );
    expect(mockScheduleNotification).toHaveBeenCalledWith(
      "study",
      running.endsAt,
    );
    expect(mockScheduleNotification).toHaveBeenCalledTimes(1);
  });

  it("reschedules a running phase notification when returning from system settings", async () => {
    const running = startPomodoroSession(
      createPomodoroSession(settings),
      1_000_000,
    );
    mockLoadSession.mockResolvedValue(running);
    let handleAppStateChange:
      | ((state: AppStateStatus) => void)
      | undefined;
    jest
      .spyOn(AppState, "addEventListener")
      .mockImplementation((_eventType, listener) => {
        handleAppStateChange = listener;
        return { remove: jest.fn() };
      });

    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe("ready"));
    await waitFor(() =>
      expect(mockScheduleNotification).toHaveBeenCalledTimes(1),
    );
    expect(handleAppStateChange).toBeDefined();

    await act(async () => {
      handleAppStateChange?.("active");
    });

    await waitFor(() =>
      expect(mockScheduleNotification).toHaveBeenCalledTimes(2),
    );
    expect(mockScheduleNotification).toHaveBeenLastCalledWith(
      "study",
      running.endsAt,
    );
  });

  it("reconciles an expired running phase once and cancels the old notification", async () => {
    const running = startPomodoroSession(
      createPomodoroSession(settings),
      1_000_000,
    );
    mockLoadSession.mockResolvedValue(running);
    jest.spyOn(Date, "now").mockReturnValue(running.endsAt + 5_000);

    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });

    await waitFor(() =>
      expect(result.current.session?.phase).toBe("shortBreak"),
    );
    expect(result.current.session).toMatchObject({
      status: "ready",
      completedPomodoros: 1,
      lastCompletedPhase: "study",
    });
    expect(mockSaveSession).toHaveBeenCalledTimes(1);
    expect(mockCancelNotification).toHaveBeenCalledTimes(1);
  });

  it("opens the alarm route when a running phase finishes in the foreground", async () => {
    const running = startPomodoroSession(
      createPomodoroSession(settings),
      1_000_000,
    );
    mockLoadSession.mockResolvedValue(running);
    let handleAppStateChange:
      | ((state: AppStateStatus) => void)
      | undefined;
    jest
      .spyOn(AppState, "addEventListener")
      .mockImplementation((_eventType, listener) => {
        handleAppStateChange = listener;
        return { remove: jest.fn() };
      });
    const nowSpy = jest.spyOn(Date, "now").mockReturnValue(1_000_000);

    const { result } = await renderHook(() => usePomodoroSession(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.status).toBe("ready"));

    nowSpy.mockReturnValue(running.endsAt + 5_000);
    await act(async () => {
      handleAppStateChange?.("active");
    });

    await waitFor(() =>
      expect(result.current.session).toMatchObject({
        status: "ready",
        phase: "shortBreak",
        lastCompletedPhase: "study",
      }),
    );
    expect(mockRouterReplace).toHaveBeenCalledWith({
      pathname: "/alarm",
      params: { phase: "study" },
    });
    await waitFor(() =>
      expect(mockNotifyPhaseCompleted).toHaveBeenCalledWith("study"),
    );
  });

  it("handles simultaneous timer and foreground completion only once", async () => {
    const running = startPomodoroSession(
      createPomodoroSession(settings),
      1_000_000,
    );
    mockLoadSession.mockResolvedValue(running);
    let handleAppStateChange:
      | ((state: AppStateStatus) => void)
      | undefined;
    jest
      .spyOn(AppState, "addEventListener")
      .mockImplementation((_eventType, listener) => {
        handleAppStateChange = listener;
        return { remove: jest.fn() };
      });
    const nowSpy = jest.spyOn(Date, "now").mockReturnValue(1_000_000);

    const { result } = await renderHook(() => usePomodoroSession(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.status).toBe("ready"));

    jest.useFakeTimers();
    nowSpy.mockReturnValue(running.endsAt + 5_000);
    await act(async () => {
      handleAppStateChange?.("active");
      await jest.advanceTimersByTimeAsync(1_000);
    });

    await waitFor(() =>
      expect(result.current.session).toMatchObject({
        status: "ready",
        phase: "shortBreak",
        lastCompletedPhase: "study",
      }),
    );
    expect(mockSaveSession).toHaveBeenCalledTimes(1);
    expect(mockNotifyPhaseCompleted).toHaveBeenCalledTimes(1);
    expect(mockRouterReplace).toHaveBeenCalledTimes(1);
  });

  it("opens the alarm route with the completed phase after a body tap while active", async () => {
    const running = startPomodoroSession(
      createPomodoroSession(settings),
      1_000_000,
    );
    mockLoadSession.mockResolvedValue(running);

    let handleResponse: Parameters<
      typeof addStudyNotificationResponseListener
    >[0] = () => undefined;
    mockAddNotificationResponseListener.mockImplementation((onResponse) => {
      handleResponse = onResponse;
      return jest.fn();
    });

    const { result } = await renderHook(() => usePomodoroSession(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.status).toBe("ready"));

    jest.spyOn(Date, "now").mockReturnValue(running.endsAt + 5_000);
    await act(async () => {
      handleResponse({
        actionIdentifier: "expo.modules.notifications.actions.DEFAULT",
        notification: {
          date: Date.now(),
          request: {
            identifier: "study-end",
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
    });

    await waitFor(() =>
      expect(result.current.session).toMatchObject({
        status: "ready",
        phase: "shortBreak",
        lastCompletedPhase: "study",
      }),
    );
    expect(mockRouterReplace).toHaveBeenCalledWith({
      pathname: "/alarm",
      params: { phase: "study" },
    });
  });

  it("opens the alarm route from the initial notification response after reconciling a cold start", async () => {
    const running = startPomodoroSession(
      createPomodoroSession(settings),
      1_000_000,
    );
    mockLoadSession.mockResolvedValue(running);
    jest.spyOn(Date, "now").mockReturnValue(running.endsAt + 5_000);
    mockGetLastNotificationResponse.mockResolvedValue({
      actionIdentifier: "expo.modules.notifications.actions.DEFAULT",
      notification: {
        date: running.endsAt,
        request: {
          identifier: "study-end",
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

    const { result } = await renderHook(() => usePomodoroSession(), {
      wrapper,
    });

    await waitFor(() =>
      expect(result.current.session).toMatchObject({
        status: "ready",
        phase: "shortBreak",
        lastCompletedPhase: "study",
      }),
    );
    await waitFor(() =>
      expect(mockRouterReplace).toHaveBeenCalledWith({
        pathname: "/alarm",
        params: { phase: "study" },
      }),
    );
    expect(mockGetLastNotificationResponse).toHaveBeenCalledTimes(1);
    expect(mockClearLastNotificationResponse).toHaveBeenCalledTimes(1);
  });

  it("opens the reconciled next phase without opening the alarm for the stop action", async () => {
    const running = startPomodoroSession(
      createPomodoroSession(settings),
      1_000_000,
    );
    mockLoadSession.mockResolvedValue(running);

    let handleResponse: Parameters<
      typeof addStudyNotificationResponseListener
    >[0] = () => undefined;
    mockAddNotificationResponseListener.mockImplementation((onResponse) => {
      handleResponse = onResponse;
      return jest.fn();
    });

    const { result } = await renderHook(() => usePomodoroSession(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.status).toBe("ready"));

    jest.spyOn(Date, "now").mockReturnValue(running.endsAt + 5_000);
    await act(async () => {
      handleResponse({
        actionIdentifier: "stop",
        notification: {
          date: Date.now(),
          request: {
            identifier: "study-end",
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
    });

    await waitFor(() =>
      expect(result.current.session).toMatchObject({
        status: "ready",
        phase: "shortBreak",
        lastCompletedPhase: "study",
      }),
    );
    expect(mockRouterPush).not.toHaveBeenCalled();
    expect(mockRouterReplace).toHaveBeenCalledWith("/");
  });

  it("exposes response-listener errors to the notification error state", async () => {
    const listenerError = new Error("notification listener failed");
    let reportListenerError: (error: Error) => void = () => undefined;
    mockAddNotificationResponseListener.mockImplementation(
      (_onResponse, onError) => {
        reportListenerError = onError;
        return jest.fn();
      },
    );

    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe("ready"));

    expect(mockAddNotificationResponseListener).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
    );
    await act(async () => reportListenerError(listenerError));

    expect(result.current.notificationError).toBe(listenerError);
  });

  it("restores a paused session unchanged and cancels scheduled notifications", async () => {
    const paused = {
      status: "paused" as const,
      phase: "study" as const,
      initialDurationMs: 60_000,
      remainingMs: 23_000,
      completedPomodoros: 0,
      cycleTarget: 2,
    };
    mockLoadSession.mockResolvedValue(paused);

    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.session).toEqual(paused);
    expect(result.current.remainingMs).toBe(23_000);
    expect(mockCancelNotification).toHaveBeenCalledTimes(1);
  });

  it("persists start, pause, and resume transitions and schedules only running phases", async () => {
    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe("ready"));

    await act(async () => {
      await result.current.start();
    });
    expect(result.current.session?.status).toBe("running");
    expect(mockScheduleNotification).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.pause();
    });
    expect(result.current.session).toMatchObject({
      status: "paused",
      remainingMs: 60_000,
    });
    expect(mockCancelNotification).toHaveBeenCalledTimes(3);

    await act(async () => {
      await result.current.resume();
    });
    expect(result.current.session?.status).toBe("running");
    expect(mockScheduleNotification).toHaveBeenCalledTimes(2);
  });

  it("keeps the scheduled system notification when a phase completes in the foreground", async () => {
    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe("ready"));
    jest.useFakeTimers();

    await act(async () => {
      await result.current.start();
    });
    const runningSession = result.current.session;
    expect(runningSession?.status).toBe("running");
    if (runningSession?.status !== "running") {
      throw new Error("Expected the study session to be running.");
    }

    mockCancelNotification.mockClear();
    jest.spyOn(Date, "now").mockReturnValue(runningSession.endsAt);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1_000);
    });

    expect(result.current.session).toMatchObject({
      status: "ready",
      phase: "shortBreak",
      lastCompletedPhase: "study",
    });
    expect(mockCancelNotification).not.toHaveBeenCalled();
    expect(mockScheduleNotification).toHaveBeenCalledTimes(1);
  });

  it("continues timer state and exposes an error when persistence fails", async () => {
    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe("ready"));
    const storageError = new Error("write failed");
    mockSaveSession.mockRejectedValueOnce(storageError);

    await act(async () => {
      await result.current.start();
    });

    expect(result.current.session?.status).toBe("ready");
    expect(result.current.error).toBe(storageError);
  });

  it("exposes notification permission errors without preventing the timer", async () => {
    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe("ready"));
    mockRequestPermission.mockRejectedValueOnce(
      new Error("permission failed"),
    );

    await act(async () => {
      await result.current.requestPermission();
    });

    expect(result.current.notificationError?.message).toBe(
      "permission failed",
    );
    await act(async () => {
      await result.current.start();
    });
    expect(result.current.session?.status).toBe("running");
  });

  it("restores and runs the timer when Expo Go cannot load native notifications", async () => {
    const nativeModuleError = new Error(
      "Las notificaciones no están disponibles en esta versión de Expo Go.",
    );
    mockGetPermission.mockRejectedValueOnce(nativeModuleError);

    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.notificationError).toBe(nativeModuleError);
    expect(result.current.notificationPermissionGranted).toBe(false);

    await act(async () => {
      await result.current.start();
    });

    expect(result.current.session?.status).toBe("running");
    expect(mockSaveSession).toHaveBeenCalled();
    expect(mockScheduleNotification).not.toHaveBeenCalled();
  });

  it("continues a timer transition and exposes native cancellation errors", async () => {
    mockGetPermission.mockResolvedValueOnce(false);
    mockCancelNotification.mockResolvedValueOnce(undefined);
    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe("ready"));
    const nativeModuleError = new Error("ExpoTopicSubscriptionModule missing");
    mockCancelNotification.mockRejectedValueOnce(nativeModuleError);

    await act(async () => {
      await result.current.start();
    });

    expect(result.current.session?.status).toBe("running");
    expect(result.current.notificationError).toBe(nativeModuleError);
  });
});
