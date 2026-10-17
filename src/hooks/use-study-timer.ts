import { useCallback, useEffect, useState } from "react";

import {
  formatRemainingTime,
  getRemainingTime,
  pauseStudyTimer,
  restartStudyTimer,
  resumeStudyTimer,
  startStudyTimer,
  type StudyTimerState,
} from "../domain/study-timer";

export function useStudyTimer(initialDurationMs: number) {
  const [timer, setTimer] = useState<StudyTimerState | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (timer?.status !== "running") {
      return;
    }

    const intervalId = setInterval(() => {
      setNowMs(Date.now());
    }, 1_000);

    return () => clearInterval(intervalId);
  }, [timer?.status]);

  const start = useCallback(() => {
    if (timer !== null) {
      return;
    }

    const startedAtMs = Date.now();
    setNowMs(startedAtMs);
    setTimer(startStudyTimer(initialDurationMs, startedAtMs));
  }, [initialDurationMs, timer]);

  const pause = useCallback(() => {
    if (timer?.status !== "running") {
      return;
    }

    const pausedAtMs = Date.now();
    setNowMs(pausedAtMs);
    setTimer(pauseStudyTimer(timer, pausedAtMs));
  }, [timer]);

  const resume = useCallback(() => {
    if (timer?.status !== "paused") {
      return;
    }

    const resumedAtMs = Date.now();
    setNowMs(resumedAtMs);
    setTimer(resumeStudyTimer(timer, resumedAtMs));
  }, [timer]);

  const restart = useCallback(() => {
    if (timer === null) {
      return;
    }

    const restartedAtMs = Date.now();
    setNowMs(restartedAtMs);
    setTimer(restartStudyTimer(timer, restartedAtMs));
  }, [timer]);

  const remainingMs =
    timer === null
      ? initialDurationMs
      : getRemainingTime(timer, nowMs);

  return {
    status: timer?.status ?? "idle",
    remainingMs,
    formattedRemainingTime: formatRemainingTime(remainingMs),
    start,
    pause,
    resume,
    restart,
  } as const;
}
