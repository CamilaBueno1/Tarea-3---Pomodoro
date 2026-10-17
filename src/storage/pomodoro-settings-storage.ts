import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  DEFAULT_POMODORO_SETTINGS,
  validatePomodoroSettings,
  type PomodoroSettings,
} from "../domain/pomodoro-settings";

const POMODORO_SETTINGS_STORAGE_KEY = "@cotopaxi/pomodoro-settings";

export async function loadPomodoroSettings(): Promise<PomodoroSettings> {
  const serializedSettings = await AsyncStorage.getItem(
    POMODORO_SETTINGS_STORAGE_KEY,
  );

  if (serializedSettings === null) {
    return { ...DEFAULT_POMODORO_SETTINGS };
  }

  const storedValue: unknown = JSON.parse(serializedSettings);

  if (
    typeof storedValue !== "object" ||
    storedValue === null ||
    Array.isArray(storedValue) ||
    !("studyDurationMinutes" in storedValue) ||
    !("shortBreakDurationMinutes" in storedValue) ||
    !("longBreakDurationMinutes" in storedValue) ||
    !("pomodorosBeforeLongBreak" in storedValue) ||
    typeof storedValue.studyDurationMinutes !== "number" ||
    typeof storedValue.shortBreakDurationMinutes !== "number" ||
    typeof storedValue.longBreakDurationMinutes !== "number" ||
    typeof storedValue.pomodorosBeforeLongBreak !== "number"
  ) {
    throw new Error("Stored pomodoro settings have an invalid format.");
  }

  const validation = validatePomodoroSettings({
    studyDurationMinutes: String(storedValue.studyDurationMinutes),
    shortBreakDurationMinutes: String(storedValue.shortBreakDurationMinutes),
    longBreakDurationMinutes: String(storedValue.longBreakDurationMinutes),
    pomodorosBeforeLongBreak: String(
      storedValue.pomodorosBeforeLongBreak,
    ),
  });

  if (!validation.valid) {
    throw new Error("Stored pomodoro settings contain invalid values.");
  }

  return validation.value;
}

export async function savePomodoroSettings(
  settings: PomodoroSettings,
): Promise<void> {
  const validation = validatePomodoroSettings({
    studyDurationMinutes: String(settings.studyDurationMinutes),
    shortBreakDurationMinutes: String(settings.shortBreakDurationMinutes),
    longBreakDurationMinutes: String(settings.longBreakDurationMinutes),
    pomodorosBeforeLongBreak: String(settings.pomodorosBeforeLongBreak),
  });

  if (!validation.valid) {
    throw new Error("Cannot save invalid pomodoro settings.");
  }

  await AsyncStorage.setItem(
    POMODORO_SETTINGS_STORAGE_KEY,
    JSON.stringify(validation.value),
  );
}
