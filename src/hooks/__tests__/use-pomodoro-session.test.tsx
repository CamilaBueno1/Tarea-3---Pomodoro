import { act, renderHook, waitFor } from "@testing-library/react-native";

import {
  cancelStudyEndNotification,
  getStudyNotificationPermission,
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

jest.mock("../../hooks/use-pomodoro-settings", () => ({
  usePomodoroSettings: jest.fn(),
}));
jest.mock("../../storage/study-session-storage", () => ({
  loadStudySession: jest.fn(),
  saveStudySession: jest.fn(),
}));
jest.mock("../../storage/study-notifications", () => ({
  cancelStudyEndNotification: jest.fn(),
  getStudyNotificationPermission: jest.fn(),
  requestStudyNotificationPermission: jest.fn(),
  scheduleStudyEndNotification: jest.fn(),
}));

const mockUseSettings = jest.mocked(usePomodoroSettings);
const mockLoadSession = jest.mocked(loadStudySession);
const mockSaveSession = jest.mocked(saveStudySession);
const mockGetPermission = jest.mocked(getStudyNotificationPermission);
const mockRequestPermission = jest.mocked(
  requestStudyNotificationPermission,
);
const mockScheduleNotification = jest.mocked(scheduleStudyEndNotification);
const mockCancelNotification = jest.mocked(cancelStudyEndNotification);
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
    mockUseSettings.mockReturnValue({
      settings,
      status: "ready",
      error: null,
      saveSettings: jest.fn(),
    });
    mockLoadSession.mockResolvedValue(null);
    mockSaveSession.mockResolvedValue(undefined);
    mockGetPermission.mockResolvedValue(true);
    mockRequestPermission.mockResolvedValue(true);
    mockScheduleNotification.mockResolvedValue(undefined);
    mockCancelNotification.mockResolvedValue(undefined);
    jest.spyOn(Date, "now").mockReturnValue(1_000_000);
  });

  afterEach(() => {
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

    const { result } = await renderHook(() => usePomodoroSession(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.session).toEqual(running);
    expect(result.current.remainingMs).toBe(60_000);
    expect(mockScheduleNotification).toHaveBeenCalledWith(
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
