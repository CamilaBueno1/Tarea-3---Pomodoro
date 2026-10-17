export type RunningStudyTimerState = {
  status: "running";
  initialDurationMs: number;
  targetEndTime: number;
};

export type PausedStudyTimerState = {
  status: "paused";
  initialDurationMs: number;
  remainingMs: number;
};

export type StudyTimerState =
  | RunningStudyTimerState
  | PausedStudyTimerState;

export function startStudyTimer(
  initialDurationMs: number,
  startedAtMs: number,
): RunningStudyTimerState {
  return {
    status: "running",
    initialDurationMs,
    targetEndTime: startedAtMs + initialDurationMs,
  };
}

export function getRemainingTime(
  timer: StudyTimerState,
  nowMs: number,
): number {
  if (timer.status === "paused") {
    return timer.remainingMs;
  }

  return Math.max(0, timer.targetEndTime - nowMs);
}

export function pauseStudyTimer(
  timer: RunningStudyTimerState,
  pausedAtMs: number,
): PausedStudyTimerState {
  return {
    status: "paused",
    initialDurationMs: timer.initialDurationMs,
    remainingMs: getRemainingTime(timer, pausedAtMs),
  };
}

export function resumeStudyTimer(
  timer: PausedStudyTimerState,
  resumedAtMs: number,
): RunningStudyTimerState {
  return {
    status: "running",
    initialDurationMs: timer.initialDurationMs,
    targetEndTime: resumedAtMs + timer.remainingMs,
  };
}

export function restartStudyTimer(
  timer: StudyTimerState,
  restartedAtMs: number,
): StudyTimerState {
  if (timer.status === "paused") {
    return {
      status: "paused",
      initialDurationMs: timer.initialDurationMs,
      remainingMs: timer.initialDurationMs,
    };
  }

  return {
    status: "running",
    initialDurationMs: timer.initialDurationMs,
    targetEndTime: restartedAtMs + timer.initialDurationMs,
  };
}

export function formatRemainingTime(remainingMs: number): string {
  const totalSeconds = Math.ceil(Math.max(0, remainingMs) / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
