import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import type { NotificationResponse } from "expo-notifications";
import { useRouter } from "expo-router";
import { AppState } from "react-native";

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
  type PomodoroPhase,
  type PomodoroSession,
} from "../domain/pomodoro-session";
import {
  addStudyNotificationResponseListener,
  cancelStudyEndNotification,
  clearLastStudyNotificationResponse,
  getLastStudyNotificationResponse,
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

const DEFAULT_NOTIFICATION_ACTION_IDENTIFIER =
  "expo.modules.notifications.actions.DEFAULT";

function getResponsePhase(response: NotificationResponse): PomodoroPhase | null {
  const phase: unknown =
    response.notification.request.content.data?.phase;
  if (
    phase === "study" ||
    phase === "shortBreak" ||
    phase === "longBreak"
  ) {
    return phase;
  }

  return null;
}

function getResponseKey(response: NotificationResponse): string {
  return [
    response.notification.request.identifier,
    response.actionIdentifier,
    response.notification.date,
  ].join(":");
}

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
  const router = useRouter();
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
  const handledNotificationResponsesRef = useRef(new Set<string>());
  const pendingNotificationResponseRef =
    useRef<NotificationResponse | null>(null);
  const initialNotificationResponseCheckedRef = useRef(false);

  const persistSession = useCallback(
    async (
      nextSession: PomodoroSession,
      previousSession: PomodoroSession | null,
      notificationsEnabled = notificationPermissionGranted,
      openAlarmOnCompletion = false,
    ) => {
      setError(null);

      const phaseCompleted =
        previousSession?.status === "running" &&
        nextSession.status === "ready" &&
        nextSession.lastCompletedPhase === previousSession.phase;

      if (!phaseCompleted) {
        try {
          await cancelStudyEndNotification();
        } catch (cancelError: unknown) {
          setNotificationError(toError(cancelError));
        }
      }

      try {
        await saveStudySession(nextSession);
      } catch (saveError: unknown) {
        const visibleError = toError(saveError);
        setError(visibleError);

        if (
          previousSession?.status === "running" &&
          notificationsEnabled &&
          !phaseCompleted
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

      if (phaseCompleted) {
        if (
          openAlarmOnCompletion &&
          previousSession !== null
        ) {
          router.push({
            pathname: "/alarm",
            params: { phase: previousSession.phase },
          });
        }
        return true;
      }

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
    [notificationPermissionGranted, router],
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

  const processNotificationResponse = useCallback(
    async (response: NotificationResponse) => {
      if (status !== "ready" || session === null) {
        pendingNotificationResponseRef.current = response;
        return;
      }

      const responseKey = getResponseKey(response);
      if (handledNotificationResponsesRef.current.has(responseKey)) {
        return;
      }
      handledNotificationResponsesRef.current.add(responseKey);

      const now = Date.now();
      setNowMs(now);
      if (session.status === "running") {
        const reconciledSession = advancePomodoroSession(
          session,
          now,
          settings,
        );
        if (reconciledSession !== session) {
          await persistSession(reconciledSession, session);
        }
      }

      if (response.actionIdentifier === DEFAULT_NOTIFICATION_ACTION_IDENTIFIER) {
        const phase = getResponsePhase(response);
        if (phase !== null) {
          router.push({ pathname: "/alarm", params: { phase } });
        }
      } else if (response.actionIdentifier === "stop") {
        router.replace("/");
      }
    },
    [persistSession, router, session, settings, status],
  );

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

  useEffect(() => {
    const pendingResponse = pendingNotificationResponseRef.current;
    if (status !== "ready" || session === null || pendingResponse === null) {
      return;
    }

    pendingNotificationResponseRef.current = null;
    void processNotificationResponse(pendingResponse).catch(
      (responseError: unknown) => setNotificationError(toError(responseError)),
    );
  }, [processNotificationResponse, session, status]);

  useEffect(() => {
    if (status !== "ready" || session === null) {
      return;
    }
    if (initialNotificationResponseCheckedRef.current) {
      return;
    }
    initialNotificationResponseCheckedRef.current = true;

    let isMounted = true;
    void (async () => {
      try {
        const response = await getLastStudyNotificationResponse();
        if (!isMounted || response === null) {
          return;
        }

        await processNotificationResponse(response);
        await clearLastStudyNotificationResponse();
      } catch (responseError: unknown) {
        if (isMounted) {
          setNotificationError(toError(responseError));
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [processNotificationResponse, session, status]);

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
        void persistSession(
          nextSession,
          session,
          undefined,
          AppState.currentState === "active",
        );
      } else {
        setNowMs(now);
      }
    }, 1_000);

    return () => clearInterval(intervalId);
  }, [persistSession, session, settings, status]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        const now = Date.now();
        setNowMs(now);
        if (session?.status === "running") {
          const nextSession = advancePomodoroSession(session, now, settings);
          if (nextSession !== session) {
            void persistSession(nextSession, session, undefined, true);
          } else {
            void (async () => {
              const permissionGranted =
                await getStudyNotificationPermission();
              setNotificationPermissionGranted(permissionGranted);
              if (permissionGranted) {
                await scheduleStudyEndNotification(
                  session.phase,
                  session.endsAt,
                );
                setNotificationError(null);
              } else {
                await cancelStudyEndNotification();
              }
            })().catch((notificationFailure: unknown) => {
              setNotificationError(toError(notificationFailure));
            });
          }
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [persistSession, session, settings]);

  useEffect(() => {
    const unsubscribe =
      typeof addStudyNotificationResponseListener === "function"
        ? addStudyNotificationResponseListener(
            (response) => {
              void processNotificationResponse(response).catch(
                (responseError: unknown) =>
                  setNotificationError(toError(responseError)),
              );
            },
            (listenerError) => {
              setNotificationError(toError(listenerError));
            },
          )
        : null;

    return () => {
      unsubscribe?.();
    };
  }, [processNotificationResponse]);

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
