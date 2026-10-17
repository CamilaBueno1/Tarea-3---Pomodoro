import AsyncStorage from "@react-native-async-storage/async-storage";

import type {
  PausedPomodoroSession,
  PomodoroPhase,
  PomodoroSession,
  ReadyPomodoroSession,
  RunningPomodoroSession,
} from "../domain/pomodoro-session";

const STUDY_SESSION_STORAGE_KEY = "@cotopaxi/study-session";
const phases: readonly PomodoroPhase[] = [
  "study",
  "shortBreak",
  "longBreak",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value);
}

function isValidSession(value: unknown): value is PomodoroSession {
  if (
    !isRecord(value) ||
    (value.status !== "ready" &&
      value.status !== "running" &&
      value.status !== "paused") ||
    !phases.includes(value.phase as PomodoroPhase) ||
    !isFiniteInteger(value.initialDurationMs) ||
    value.initialDurationMs <= 0 ||
    !isFiniteInteger(value.completedPomodoros) ||
    value.completedPomodoros < 0 ||
    !isFiniteInteger(value.cycleTarget) ||
    value.cycleTarget < 1 ||
    value.completedPomodoros >= value.cycleTarget
  ) {
    return false;
  }

  if (value.status === "running") {
    return (
      isFiniteInteger(value.endsAt) &&
      value.endsAt > 0 &&
      !("lastCompletedPhase" in value) &&
      !("remainingMs" in value)
    );
  }

  if (
    value.status === "ready" &&
    value.lastCompletedPhase !== null &&
    !phases.includes(value.lastCompletedPhase as PomodoroPhase)
  ) {
    return false;
  }

  return (
    isFiniteInteger(value.remainingMs) &&
    value.remainingMs >= 0 &&
    value.remainingMs <= value.initialDurationMs &&
    (value.status !== "paused" || !("lastCompletedPhase" in value)) &&
    !("endsAt" in value)
  );
}

export async function loadStudySession(): Promise<PomodoroSession | null> {
  const serializedSession = await AsyncStorage.getItem(
    STUDY_SESSION_STORAGE_KEY,
  );

  if (serializedSession === null) {
    return null;
  }

  const storedValue: unknown = JSON.parse(serializedSession);
  if (!isValidSession(storedValue)) {
    throw new Error("Stored study session has an invalid format.");
  }

  return storedValue;
}

export async function saveStudySession(
  session: PomodoroSession,
): Promise<void> {
  if (!isValidSession(session)) {
    throw new Error("Cannot save an invalid study session.");
  }

  await AsyncStorage.setItem(
    STUDY_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
}

export function isRunningStudySession(
  session: PomodoroSession,
): session is RunningPomodoroSession {
  return session.status === "running";
}

export function isPausedStudySession(
  session: PomodoroSession,
): session is PausedPomodoroSession {
  return session.status === "paused";
}

export function isReadyStudySession(
  session: PomodoroSession,
): session is ReadyPomodoroSession {
  return session.status === "ready";
}
