export type PomodoroSettings = {
  studyDurationMinutes: number;
  shortBreakDurationMinutes: number;
  longBreakDurationMinutes: number;
  pomodorosBeforeLongBreak: number;
};

export type PomodoroSettingsInput = Record<
  keyof PomodoroSettings,
  string
>;

export type PomodoroSettingsFieldError =
  | "required"
  | "integer"
  | "outOfRange";

export type PomodoroSettingsValidation =
  | { valid: true; value: PomodoroSettings }
  | {
      valid: false;
      errors: Partial<Record<keyof PomodoroSettings, PomodoroSettingsFieldError>>;
    };

export const DEFAULT_POMODORO_SETTINGS: Readonly<PomodoroSettings> =
  Object.freeze({
    studyDurationMinutes: 25,
    shortBreakDurationMinutes: 5,
    longBreakDurationMinutes: 15,
    pomodorosBeforeLongBreak: 4,
  });

const POMODORO_COUNT_FIELD: keyof PomodoroSettings =
  "pomodorosBeforeLongBreak";

export function validatePomodoroSettings(
  input: PomodoroSettingsInput,
): PomodoroSettingsValidation {
  const value: PomodoroSettings = {
    ...DEFAULT_POMODORO_SETTINGS,
  };
  const errors: Partial<
    Record<keyof PomodoroSettings, PomodoroSettingsFieldError>
  > = {};

  for (const field of Object.keys(value) as (keyof PomodoroSettings)[]) {
    const rawValue = input[field].trim();

    if (rawValue.length === 0) {
      errors[field] = "required";
      continue;
    }

    if (!/^\d+$/.test(rawValue)) {
      errors[field] = "integer";
      continue;
    }

    const numericValue = Number(rawValue);
    const maximum = field === POMODORO_COUNT_FIELD ? 12 : 120;

    if (numericValue < 1 || numericValue > maximum) {
      errors[field] = "outOfRange";
      continue;
    }

    value[field] = numericValue;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, value };
}
