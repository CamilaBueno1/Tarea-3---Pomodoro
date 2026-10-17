import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loadStudySession,
  saveStudySession,
} from "../study-session-storage";
import {
  createPomodoroSession,
  startPomodoroSession,
} from "../../domain/pomodoro-session";
import {
  DEFAULT_POMODORO_SETTINGS,
  type PomodoroSettings,
} from "../../domain/pomodoro-settings";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

const mockGetItem = jest.mocked(AsyncStorage.getItem);
const mockSetItem = jest.mocked(AsyncStorage.setItem);

const settings: PomodoroSettings = {
  ...DEFAULT_POMODORO_SETTINGS,
  studyDurationMinutes: 1,
};

describe("study session storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockResolvedValue(null);
    mockSetItem.mockResolvedValue(undefined);
  });

  it("returns null when no session is saved", async () => {
    await expect(loadStudySession()).resolves.toBeNull();
  });

  it("round trips a running session with an absolute end time", async () => {
    const session = startPomodoroSession(
      createPomodoroSession(settings),
      Date.parse("2026-10-17T12:00:00Z"),
    );
    mockGetItem.mockResolvedValue(JSON.stringify(session));

    await expect(loadStudySession()).resolves.toEqual(session);
    await saveStudySession(session);

    expect(mockSetItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(session),
    );
  });

  it("rejects malformed or semantically invalid session records", async () => {
    mockGetItem.mockResolvedValue("{not-json");
    await expect(loadStudySession()).rejects.toThrow();

    mockGetItem.mockResolvedValue(
      JSON.stringify({
        status: "running",
        phase: "study",
        initialDurationMs: 60_000,
        endsAt: Number.NaN,
        completedPomodoros: 0,
        cycleTarget: 4,
      }),
    );
    await expect(loadStudySession()).rejects.toThrow(
      "Stored study session has an invalid format.",
    );
  });

  it("propagates storage read failures", async () => {
    const storageError = new Error("read failed");
    mockGetItem.mockRejectedValue(storageError);

    await expect(loadStudySession()).rejects.toBe(storageError);
  });

  it("propagates storage write failures", async () => {
    const storageError = new Error("write failed");
    mockSetItem.mockRejectedValue(storageError);

    await expect(
      saveStudySession(createPomodoroSession(settings)),
    ).rejects.toBe(storageError);
  });
});
