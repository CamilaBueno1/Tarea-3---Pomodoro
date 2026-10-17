import {
  DEFAULT_POMODORO_SETTINGS,
  validatePomodoroSettings,
  type PomodoroSettings,
  type PomodoroSettingsInput,
} from "../pomodoro-settings";

const validInput: PomodoroSettingsInput = {
  studyDurationMinutes: "25",
  shortBreakDurationMinutes: "5",
  longBreakDurationMinutes: "15",
  pomodorosBeforeLongBreak: "4",
};

describe("pomodoro settings", () => {
  it("provides the accepted default values", () => {
    expect(DEFAULT_POMODORO_SETTINGS).toEqual<PomodoroSettings>({
      studyDurationMinutes: 25,
      shortBreakDurationMinutes: 5,
      longBreakDurationMinutes: 15,
      pomodorosBeforeLongBreak: 4,
    });
  });

  it.each([
    ["studyDurationMinutes", "1"],
    ["studyDurationMinutes", "120"],
    ["shortBreakDurationMinutes", "1"],
    ["shortBreakDurationMinutes", "120"],
    ["longBreakDurationMinutes", "1"],
    ["longBreakDurationMinutes", "120"],
    ["pomodorosBeforeLongBreak", "1"],
    ["pomodorosBeforeLongBreak", "12"],
  ] as const)("accepts the inclusive boundary %s=%s", (field, value) => {
    const result = validatePomodoroSettings({
      ...validInput,
      [field]: value,
    });

    expect(result).toEqual({
      valid: true,
      value: {
        ...DEFAULT_POMODORO_SETTINGS,
        [field]: Number(value),
      },
    });
  });

  it.each([
    ["studyDurationMinutes", "0", "outOfRange"],
    ["studyDurationMinutes", "121", "outOfRange"],
    ["shortBreakDurationMinutes", "0", "outOfRange"],
    ["shortBreakDurationMinutes", "121", "outOfRange"],
    ["longBreakDurationMinutes", "0", "outOfRange"],
    ["longBreakDurationMinutes", "121", "outOfRange"],
    ["pomodorosBeforeLongBreak", "0", "outOfRange"],
    ["pomodorosBeforeLongBreak", "13", "outOfRange"],
    ["studyDurationMinutes", "", "required"],
    ["shortBreakDurationMinutes", "   ", "required"],
    ["longBreakDurationMinutes", "5.5", "integer"],
    ["pomodorosBeforeLongBreak", "four", "integer"],
  ] as const)("rejects %s=%s with %s validation", (field, value, error) => {
    const result = validatePomodoroSettings({
      ...validInput,
      [field]: value,
    });

    expect(result).toEqual({
      valid: false,
      errors: { [field]: error },
    });
  });

  it("rejects the complete form when any field is invalid", () => {
    const result = validatePomodoroSettings({
      ...validInput,
      studyDurationMinutes: "",
      pomodorosBeforeLongBreak: "13",
    });

    expect(result).toEqual({
      valid: false,
      errors: {
        studyDurationMinutes: "required",
        pomodorosBeforeLongBreak: "outOfRange",
      },
    });
  });
});
