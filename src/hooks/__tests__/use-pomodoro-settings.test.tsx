import { act, renderHook, waitFor } from "@testing-library/react-native";
import type { PropsWithChildren } from "react";

import {
  loadPomodoroSettings,
  savePomodoroSettings,
} from "../../storage/pomodoro-settings-storage";
import {
  DEFAULT_POMODORO_SETTINGS,
  type PomodoroSettings,
} from "../../domain/pomodoro-settings";
import {
  PomodoroSettingsProvider,
  usePomodoroSettings,
} from "../use-pomodoro-settings";

jest.mock("../../storage/pomodoro-settings-storage", () => ({
  loadPomodoroSettings: jest.fn(),
  savePomodoroSettings: jest.fn(),
}));

const mockLoadSettings = jest.mocked(loadPomodoroSettings);
const mockSaveSettings = jest.mocked(savePomodoroSettings);

const wrapper = ({ children }: PropsWithChildren) => (
  <PomodoroSettingsProvider>{children}</PomodoroSettingsProvider>
);

const savedSettings: PomodoroSettings = {
  studyDurationMinutes: 40,
  shortBreakDurationMinutes: 10,
  longBreakDurationMinutes: 20,
  pomodorosBeforeLongBreak: 3,
};

describe("pomodoro settings provider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadSettings.mockResolvedValue(DEFAULT_POMODORO_SETTINGS);
    mockSaveSettings.mockResolvedValue(undefined);
  });

  it("publishes the stored settings after loading", async () => {
    mockLoadSettings.mockResolvedValue(savedSettings);

    const { result } = await renderHook(() => usePomodoroSettings(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.settings).toEqual(savedSettings);
  });

  it("exposes a visible error when initial loading fails", async () => {
    const storageError = new Error("read failed");
    mockLoadSettings.mockRejectedValue(storageError);

    const { result } = await renderHook(() => usePomodoroSettings(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.error).toBe(storageError);
  });

  it("publishes new settings only after persistence succeeds", async () => {
    const { result } = await renderHook(() => usePomodoroSettings(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.status).toBe("ready"));

    let resolveSave: (() => void) | undefined;
    mockSaveSettings.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveSave = resolve;
        }),
    );

    const savePromise = result.current.saveSettings(savedSettings);
    await Promise.resolve();
    expect(result.current.settings).toEqual(DEFAULT_POMODORO_SETTINGS);

    await act(async () => {
      if (resolveSave === undefined) {
        throw new Error("The storage write did not start.");
      }

      resolveSave();
      await savePromise;
    });

    expect(result.current.settings).toEqual(savedSettings);
    expect(result.current.error).toBeNull();
  });

  it("keeps the confirmed settings and exposes an error when saving fails", async () => {
    const { result } = await renderHook(() => usePomodoroSettings(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.status).toBe("ready"));

    const storageError = new Error("write failed");
    mockSaveSettings.mockRejectedValue(storageError);

    let saveError: unknown;
    await act(async () => {
      try {
        await result.current.saveSettings(savedSettings);
      } catch (error: unknown) {
        saveError = error;
      }
    });

    expect(saveError).toBe(storageError);
    expect(result.current.settings).toEqual(DEFAULT_POMODORO_SETTINGS);
    expect(result.current.error).toBe(storageError);
  });
});
