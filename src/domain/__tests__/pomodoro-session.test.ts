import {
  advancePomodoroSession,
  createPomodoroSession,
  getPomodoroRemainingTime,
  pausePomodoroSession,
  restartPomodoroSession,
  resumePomodoroSession,
  startPomodoroSession,
  type PomodoroPhase,
  type ReadyPomodoroSession,
} from "../pomodoro-session";
import {
  DEFAULT_POMODORO_SETTINGS,
  type PomodoroSettings,
} from "../pomodoro-settings";

const minute = 60_000;
const now = Date.parse("2026-10-17T12:00:00Z");
const settings: PomodoroSettings = {
  studyDurationMinutes: 25,
  shortBreakDurationMinutes: 5,
  longBreakDurationMinutes: 15,
  pomodorosBeforeLongBreak: 2,
};

function readySession(
  phase: PomodoroPhase,
  completedPomodoros: number,
  cycleTarget = settings.pomodorosBeforeLongBreak,
): ReadyPomodoroSession {
  const initialDurationMs =
    phase === "study"
      ? settings.studyDurationMinutes * minute
      : phase === "shortBreak"
        ? settings.shortBreakDurationMinutes * minute
        : settings.longBreakDurationMinutes * minute;

  return {
    status: "ready",
    phase,
    initialDurationMs,
    remainingMs: initialDurationMs,
    completedPomodoros,
    cycleTarget,
    lastCompletedPhase: null,
  };
}

describe("Pomodoro session domain", () => {
  it("creates an initial study phase from settings and captures the cycle goal", () => {
    expect(createPomodoroSession(DEFAULT_POMODORO_SETTINGS)).toEqual({
      status: "ready",
      phase: "study",
      initialDurationMs: 25 * minute,
      remainingMs: 25 * minute,
      completedPomodoros: 0,
      cycleTarget: 4,
      lastCompletedPhase: null,
    });
  });

  it("derives running time from endsAt and preserves paused remaining time", () => {
    const running = startPomodoroSession(readySession("study", 0), now);
    expect(running).toMatchObject({ status: "running", endsAt: now + 25 * minute });
    expect(getPomodoroRemainingTime(running, now + 5 * minute)).toBe(
      20 * minute,
    );

    const paused = pausePomodoroSession(running, now + 5 * minute);
    expect(paused).toMatchObject({ status: "paused", remainingMs: 20 * minute });
    expect(getPomodoroRemainingTime(paused, now + 60 * minute)).toBe(
      20 * minute,
    );
  });

  it("resumes a paused phase from its exact remaining time", () => {
    const running = startPomodoroSession(readySession("study", 0), now);
    const paused = pausePomodoroSession(running, now + 5 * minute);

    expect(resumePomodoroSession(paused, now + 30 * minute)).toMatchObject({
      status: "running",
      endsAt: now + 50 * minute,
    });
  });

  it("prepares a short break and advances completed pomodoros", () => {
    const study = startPomodoroSession(readySession("study", 0), now);

    expect(
      advancePomodoroSession(study, study.endsAt, settings),
    ).toEqual({
      ...readySession("shortBreak", 1),
      lastCompletedPhase: "study",
    });
  });

  it("prepares a long break and resets the completed count at the cycle goal", () => {
    const study = startPomodoroSession(
      readySession("study", 1, 2),
      now,
    );

    expect(advancePomodoroSession(study, study.endsAt, settings)).toEqual(
      { ...readySession("longBreak", 0, 2), lastCompletedPhase: "study" },
    );
  });

  it("prepares study after a short break without changing the cycle goal", () => {
    const shortBreak = startPomodoroSession(
      readySession("shortBreak", 1, 3),
      now,
    );

    expect(
      advancePomodoroSession(shortBreak, shortBreak.endsAt, settings),
    ).toEqual({
      ...readySession("study", 1, 3),
      lastCompletedPhase: "shortBreak",
    });
  });

  it("captures the current goal only after the long break completes", () => {
    const longBreak = startPomodoroSession(
      readySession("longBreak", 0, 2),
      now,
    );
    const updatedSettings = { ...settings, pomodorosBeforeLongBreak: 5 };

    expect(
      advancePomodoroSession(longBreak, longBreak.endsAt, updatedSettings),
    ).toEqual({
      ...readySession("study", 0, 5),
      lastCompletedPhase: "longBreak",
    });
  });

  it("does not advance a phase before endsAt", () => {
    const running = startPomodoroSession(readySession("study", 0), now);

    expect(
      advancePomodoroSession(running, running.endsAt - 1, settings),
    ).toBe(running);
  });

  it("reconciles an expired session once and leaves the next phase ready", () => {
    const expired = startPomodoroSession(readySession("study", 0), now);
    const reconciled = advancePomodoroSession(
      expired,
      expired.endsAt + minute,
      settings,
    );

    expect(reconciled.status).toBe("ready");
    expect(advancePomodoroSession(reconciled, expired.endsAt + 2 * minute, settings)).toBe(
      reconciled,
    );
  });

  it("restarts the current phase without changing its phase, count, or state", () => {
    const running = startPomodoroSession(readySession("study", 1), now);
    expect(restartPomodoroSession(running, now + minute)).toMatchObject({
      status: "running",
      phase: "study",
      endsAt: now + minute + 25 * minute,
      completedPomodoros: 1,
    });

    const paused = pausePomodoroSession(running, now + minute);
    expect(restartPomodoroSession(paused, now + 2 * minute)).toMatchObject({
      status: "paused",
      phase: "study",
      remainingMs: 25 * minute,
      completedPomodoros: 1,
    });
  });
});
