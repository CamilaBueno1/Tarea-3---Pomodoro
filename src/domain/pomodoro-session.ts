import { formatRemainingTime } from "./study-timer";
import type { PomodoroSettings } from "./pomodoro-settings";

export type PomodoroPhase = "study" | "shortBreak" | "longBreak";

type PomodoroSessionProgress = {
  phase: PomodoroPhase;
  initialDurationMs: number;
  completedPomodoros: number;
  cycleTarget: number;
};

export type ReadyPomodoroSession = PomodoroSessionProgress & {
  status: "ready";
  remainingMs: number;
  lastCompletedPhase: PomodoroPhase | null;
};

export type RunningPomodoroSession = PomodoroSessionProgress & {
  status: "running";
  endsAt: number;
};

export type PausedPomodoroSession = PomodoroSessionProgress & {
  status: "paused";
  remainingMs: number;
};

export type PomodoroSession =
  | ReadyPomodoroSession
  | RunningPomodoroSession
  | PausedPomodoroSession;

export function getPhaseDurationMs(
  phase: PomodoroPhase,
  settings: PomodoroSettings,
): number {
  const minutes = {
    study: settings.studyDurationMinutes,
    shortBreak: settings.shortBreakDurationMinutes,
    longBreak: settings.longBreakDurationMinutes,
  }[phase];

  return minutes * 60_000;
}

export function createPomodoroSession(
  settings: PomodoroSettings,
): ReadyPomodoroSession {
  const initialDurationMs = getPhaseDurationMs("study", settings);

  return {
    status: "ready",
    phase: "study",
    initialDurationMs,
    remainingMs: initialDurationMs,
    completedPomodoros: 0,
    cycleTarget: settings.pomodorosBeforeLongBreak,
    lastCompletedPhase: null,
  };
}

export function updateReadyPhaseDuration(
  session: ReadyPomodoroSession,
  settings: PomodoroSettings,
): ReadyPomodoroSession {
  const initialDurationMs = getPhaseDurationMs(session.phase, settings);

  return {
    ...session,
    initialDurationMs,
    remainingMs: initialDurationMs,
  };
}

export function getPomodoroRemainingTime(
  session: PomodoroSession,
  nowMs: number,
): number {
  if (session.status === "running") {
    return Math.max(0, session.endsAt - nowMs);
  }

  return session.remainingMs;
}

export function formatPomodoroRemainingTime(
  session: PomodoroSession,
  nowMs: number,
): string {
  return formatRemainingTime(getPomodoroRemainingTime(session, nowMs));
}

export function startPomodoroSession(
  session: ReadyPomodoroSession,
  startedAtMs: number,
): RunningPomodoroSession {
  return {
    status: "running",
    phase: session.phase,
    initialDurationMs: session.initialDurationMs,
    endsAt: startedAtMs + session.remainingMs,
    completedPomodoros: session.completedPomodoros,
    cycleTarget: session.cycleTarget,
  };
}

export function pausePomodoroSession(
  session: RunningPomodoroSession,
  pausedAtMs: number,
): PausedPomodoroSession {
  return {
    status: "paused",
    phase: session.phase,
    initialDurationMs: session.initialDurationMs,
    remainingMs: getPomodoroRemainingTime(session, pausedAtMs),
    completedPomodoros: session.completedPomodoros,
    cycleTarget: session.cycleTarget,
  };
}

export function resumePomodoroSession(
  session: PausedPomodoroSession,
  resumedAtMs: number,
): RunningPomodoroSession {
  return {
    status: "running",
    phase: session.phase,
    initialDurationMs: session.initialDurationMs,
    endsAt: resumedAtMs + session.remainingMs,
    completedPomodoros: session.completedPomodoros,
    cycleTarget: session.cycleTarget,
  };
}

export function restartPomodoroSession(
  session: PomodoroSession,
  restartedAtMs: number,
): PomodoroSession {
  if (session.status === "running") {
    return {
      ...session,
      endsAt: restartedAtMs + session.initialDurationMs,
    };
  }

  return {
    ...session,
    remainingMs: session.initialDurationMs,
  };
}

export function advancePomodoroSession(
  session: PomodoroSession,
  nowMs: number,
  settings: PomodoroSettings,
): PomodoroSession {
  if (session.status !== "running" || nowMs < session.endsAt) {
    return session;
  }

  let nextPhase: PomodoroPhase;
  let completedPomodoros = session.completedPomodoros;
  let cycleTarget = session.cycleTarget;

  if (session.phase === "study") {
    completedPomodoros += 1;
    if (completedPomodoros >= session.cycleTarget) {
      nextPhase = "longBreak";
      completedPomodoros = 0;
    } else {
      nextPhase = "shortBreak";
    }
  } else {
    nextPhase = "study";
    if (session.phase === "longBreak") {
      cycleTarget = settings.pomodorosBeforeLongBreak;
      completedPomodoros = 0;
    }
  }

  const initialDurationMs = getPhaseDurationMs(nextPhase, settings);

  return {
    status: "ready",
    phase: nextPhase,
    initialDurationMs,
    remainingMs: initialDurationMs,
    completedPomodoros,
    cycleTarget,
    lastCompletedPhase: session.phase,
  };
}

export function isPomodoroSessionRunning(
  session: PomodoroSession,
): session is RunningPomodoroSession {
  return session.status === "running";
}
