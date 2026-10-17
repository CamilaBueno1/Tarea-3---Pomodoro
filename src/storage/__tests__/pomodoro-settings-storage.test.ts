import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loadPomodoroSettings,
  savePomodoroSettings,
} from "../pomodoro-settings-storage";
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

describe("pomodoro settings storage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockResolvedValue(null);
    mockSetItem.mockResolvedValue(undefined);
  });

  it("returns the defaults when no settings have been saved", async () => {
    await expect(loadPomodoroSettings()).resolves.toEqual(
      DEFAULT_POMODORO_SETTINGS,
    );
  });

  it("loads a saved settings object", async () => {
    const savedSettings: PomodoroSettings = {
      studyDurationMinutes: 40,
      shortBreakDurationMinutes: 10,
      longBreakDurationMinutes: 20,
      pomodorosBeforeLongBreak: 3,
    };
    mockGetItem.mockResolvedValue(JSON.stringify(savedSettings));

    await expect(loadPomodoroSettings()).resolves.toEqual(savedSettings);
  });

  it("writes only the supplied settings to the local storage key", async () => {
    const settings: PomodoroSettings = {
      studyDurationMinutes: 50,
      shortBreakDurationMinutes: 8,
      longBreakDurationMinutes: 25,
      pomodorosBeforeLongBreak: 5,
    };

    await savePomodoroSettings(settings);

    expect(mockSetItem).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(settings),
    );
  });

  it("rejects malformed saved data instead of substituting defaults", async () => {
    mockGetItem.mockResolvedValue("{not-json");

    await expect(loadPomodoroSettings()).rejects.toThrow();
  });

  it("propagates storage read failures", async () => {
    const storageError = new Error("read failed");
    mockGetItem.mockRejectedValue(storageError);

    await expect(loadPomodoroSettings()).rejects.toBe(storageError);
  });

  it("propagates storage write failures", async () => {
    const storageError = new Error("write failed");
    mockSetItem.mockRejectedValue(storageError);

    await expect(savePomodoroSettings(DEFAULT_POMODORO_SETTINGS)).rejects.toBe(
      storageError,
    );
  });
});
