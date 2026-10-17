import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import {
  advancePomodoroSession,
  createPomodoroSession,
  formatPomodoroRemainingTime,
  getPomodoroRemainingTime,
  pausePomodoroSession,
  restartPomodoroSession,
  resumePomodoroSession,
  startPomodoroSession,
  updateReadyPhaseDuration,
  type PomodoroSession,
} from "../domain/pomodoro-session";
import {
  cancelStudyEndNotification,
  getStudyNotificationPermission,
  requestStudyNotificationPermission,
  scheduleStudyEndNotification,
} from "../storage/study-notifications";
import {
  loadStudySession,
  saveStudySession,
} from "../storage/study-session-storage";
import { usePomodoroSettings } from "./use-pomodoro-settings";

export type PomodoroSessionStatus = "loading" | "ready" | "error";

export type PomodoroSessionContextValue = {
  status: PomodoroSessionStatus;
  session: PomodoroSession | null;
  remainingMs: number;
  formattedRemainingTime: string;
  notificationPermissionGranted: boolean | null;
  notificationError: Error | null;
  error: Error | null;
  start: (notificationsEnabled?: boolean) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  restart: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
};

const PomodoroSessionContext =
  createContext<PomodoroSessionContextValue | null>(null);

function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error(
    typeof error === "string"
      ? error
      : "Ocurrió un error al restaurar o guardar la sesión.",
  );
}

export function PomodoroSessionProvider({
  children,
}: PropsWithChildren) {
  const {
    settings,
    status: settingsStatus,
    error: settingsError,
  } = usePomodoroSettings();
  const [session, setSession] = useState<PomodoroSession | null>(null);
  const [status, setStatus] = useState<PomodoroSessionStatus>("loading");
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [error, setError] = useState<Error | null>(null);
  const [notificationError, setNotificationError] = useState<Error | null>(
    null,
  );
  const [notificationPermissionGranted, setNotificationPermissionGranted] =
    useState<boolean | null>(null);

  const persistSession = useCallback(
    async (
      nextSession: PomodoroSession,
      previousSession: PomodoroSession | null,
      notificationsEnabled = notificationPermissionGranted,
    ) => {
      setError(null);

      try {
        await cancelStudyEndNotification();
      } catch (cancelError: unknown) {
        setNotificationError(toError(cancelError));
        return false;
      }

      try {
        await saveStudySession(nextSession);
      } catch (saveError: unknown) {
        const visibleError = toError(saveError);
        setError(visibleError);

        if (
          previousSession?.status === "running" &&
          notificationsEnabled
        ) {
          try {
            await scheduleStudyEndNotification(
              previousSession.phase,
              previousSession.endsAt,
            );
          } catch (scheduleError: unknown) {
            setNotificationError(toError(scheduleError));
          }
        }

        return false;
      }

      setSession(nextSession);
      setNowMs(Date.now());
      setStatus("ready");
      setError(null);

      if (nextSession.status === "running") {
        if (notificationsEnabled) {
          try {
            await scheduleStudyEndNotification(
              nextSession.phase,
              nextSession.endsAt,
            );
            setNotificationError(null);
          } catch (scheduleError: unknown) {
            setNotificationError(toError(scheduleError));
          }
        }
      } else {
        setNotificationError(null);
      }

      return true;
    },
    [notificationPermissionGranted],
  );

  useEffect(() => {
    if (settingsStatus === "error") {
      setError(settingsError);
      setStatus("error");
      return;
    }

    if (settingsStatus !== "ready") {
      return;
    }

    let isMounted = true;

    async function restoreSession() {
      let storedSession: PomodoroSession | null;
      try {
        storedSession = await loadStudySession();
      } catch (loadError: unknown) {
        if (isMounted) {
          setError(toError(loadError));
          setStatus("error");
        }
        return;
      }

      let permissionGranted = false;
      let permissionError: Error | null = null;
      try {
        permissionGranted = await getStudyNotificationPermission();
      } catch (checkError: unknown) {
        permissionError = toError(checkError);
      }

      if (!isMounted) {
        return;
      }

      setNotificationPermissionGranted(permissionGranted);
      setNotificationError(permissionError);
      const now = Date.now();
      let restored = storedSession ?? createPomodoroSession(settings);
      restored = advancePomodoroSession(restored, now, settings);

      if (restored.status === "ready") {
        const updatedReady = updateReadyPhaseDuration(restored, settings);
        restored = {
          ...updatedReady,
          cycleTarget:
            updatedReady.phase === "study" &&
            updatedReady.completedPomodoros === 0
              ? settings.pomodorosBeforeLongBreak
              : updatedReady.cycleTarget,
        };
      }

      setSession(restored);
      setNowMs(now);
      setStatus("ready");

      if (storedSession === null || restored !== storedSession) {
        try {
          await saveStudySession(restored);
          if (isMounted) {
            setError(null);
          }
        } catch (saveError: unknown) {
          if (isMounted) {
            setError(toError(saveError));
          }
        }
      }

      try {
        if (restored.status === "running" && permissionGranted) {
          await scheduleStudyEndNotification(restored.phase, restored.endsAt);
        } else {
          await cancelStudyEndNotification();
        }
      } catch (notificationFailure: unknown) {
        if (isMounted) {
          setNotificationError(toError(notificationFailure));
        }
      }
    }

    void restoreSession();
    return () => {
      isMounted = false;
    };
  }, [settings, settingsError, settingsStatus]);

  const requestPermission = useCallback(async () => {
    try {
      const granted = await requestStudyNotificationPermission();
      setNotificationPermissionGranted(granted);
      setNotificationError(null);
      return granted;
    } catch (permissionError: unknown) {
      setNotificationPermissionGranted(false);
      setNotificationError(toError(permissionError));
      return false;
    }
  }, []);

  const start = useCallback(async (notificationsEnabled?: boolean) => {
    if (session?.status !== "ready") {
      return;
    }

    const startedAt = Date.now();
    const readyWithCurrentSettings = updateReadyPhaseDuration(
      session,
      settings,
    );
    const currentCycleTarget =
      readyWithCurrentSettings.phase === "study" &&
      readyWithCurrentSettings.completedPomodoros === 0
        ? settings.pomodorosBeforeLongBreak
        : readyWithCurrentSettings.cycleTarget;
    const nextSession = startPomodoroSession(
      { ...readyWithCurrentSettings, cycleTarget: currentCycleTarget },
      startedAt,
    );
    await persistSession(
      nextSession,
      session,
      notificationsEnabled ?? notificationPermissionGranted ?? false,
    );
  }, [notificationPermissionGranted, persistSession, session, settings]);

  const pause = useCallback(async () => {
    if (session?.status !== "running") {
      return;
    }

    const pausedAt = Date.now();
    const nextSession = pausePomodoroSession(session, pausedAt);
    await persistSession(nextSession, session);
  }, [persistSession, session]);

  const resume = useCallback(async () => {
    if (session?.status !== "paused") {
      return;
    }

    const resumedAt = Date.now();
    const nextSession = resumePomodoroSession(session, resumedAt);
    await persistSession(nextSession, session);
  }, [persistSession, session]);

  const restart = useCallback(async () => {
    if (session === null || session.status === "ready") {
      return;
    }

    const restartedAt = Date.now();
    const nextSession = restartPomodoroSession(session, restartedAt);
    await persistSession(nextSession, session);
  }, [persistSession, session]);

  useEffect(() => {
    if (status !== "ready" || session?.status !== "ready") {
      return;
    }

    const updatedReady = updateReadyPhaseDuration(session, settings);
    const nextCycleTarget =
      updatedReady.phase === "study" &&
      updatedReady.completedPomodoros === 0
        ? settings.pomodorosBeforeLongBreak
        : updatedReady.cycleTarget;
    if (
      session.initialDurationMs === updatedReady.initialDurationMs &&
      session.cycleTarget === nextCycleTarget
    ) {
      return;
    }

    void persistSession(
      { ...updatedReady, cycleTarget: nextCycleTarget },
      session,
    );
  }, [persistSession, session, settings, status]);

  useEffect(() => {
    if (status !== "ready" || session?.status !== "running") {
      return;
    }

    const intervalId = setInterval(() => {
      const now = Date.now();
      const nextSession = advancePomodoroSession(session, now, settings);

      if (nextSession !== session) {
        void persistSession(nextSession, session);
      } else {
        setNowMs(now);
      }
    }, 1_000);

    return () => clearInterval(intervalId);
  }, [persistSession, session, settings, status]);

  const remainingMs =
    session === null ? 0 : getPomodoroRemainingTime(session, nowMs);

  return (
    <PomodoroSessionContext.Provider
      value={{
        status,
        session,
        remainingMs,
        formattedRemainingTime:
          session === null
            ? "00:00"
            : formatPomodoroRemainingTime(session, nowMs),
        notificationPermissionGranted,
        notificationError,
        error,
        start,
        pause,
        resume,
        restart,
        requestPermission,
      }}>
      {children}
    </PomodoroSessionContext.Provider>
  );
}

export function usePomodoroSession(): PomodoroSessionContextValue {
  const context = useContext(PomodoroSessionContext);
  if (context === null) {
    throw new Error(
      "usePomodoroSession debe usarse dentro de PomodoroSessionProvider.",
    );
  }

  return context;
}
