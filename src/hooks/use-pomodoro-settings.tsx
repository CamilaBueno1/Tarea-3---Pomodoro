import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import {
  DEFAULT_POMODORO_SETTINGS,
  type PomodoroSettings,
} from "../domain/pomodoro-settings";
import {
  loadPomodoroSettings,
  savePomodoroSettings,
} from "../storage/pomodoro-settings-storage";

export type PomodoroSettingsStatus = "loading" | "ready" | "error";

export type PomodoroSettingsContextValue = {
  settings: PomodoroSettings;
  status: PomodoroSettingsStatus;
  error: Error | null;
  saveSettings: (settings: PomodoroSettings) => Promise<void>;
};

const PomodoroSettingsContext =
  createContext<PomodoroSettingsContextValue | null>(null);

function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error(
    typeof error === "string"
      ? error
      : "No se pudieron cargar o guardar los ajustes.",
  );
}

export function PomodoroSettingsProvider({
  children,
}: PropsWithChildren) {
  const [settings, setSettings] = useState<PomodoroSettings>(() => ({
    ...DEFAULT_POMODORO_SETTINGS,
  }));
  const [status, setStatus] = useState<PomodoroSettingsStatus>("loading");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    loadPomodoroSettings().then(
      (loadedSettings) => {
        if (!isMounted) {
          return;
        }

        setSettings(loadedSettings);
        setStatus("ready");
      },
      (loadError: unknown) => {
        if (!isMounted) {
          return;
        }

        setError(toError(loadError));
        setStatus("error");
      },
    );

    return () => {
      isMounted = false;
    };
  }, []);

  const updateSettings = useCallback(
    async (nextSettings: PomodoroSettings) => {
      if (status !== "ready") {
        throw new Error("Los ajustes todavía no están disponibles.");
      }

      if (error !== null) {
        setError(null);
      }

      try {
        await savePomodoroSettings(nextSettings);
      } catch (saveError: unknown) {
        const visibleError = toError(saveError);
        setError(visibleError);
        throw visibleError;
      }

      setSettings(nextSettings);
    },
    [error, status],
  );

  return (
    <PomodoroSettingsContext.Provider
      value={{ settings, status, error, saveSettings: updateSettings }}>
      {children}
    </PomodoroSettingsContext.Provider>
  );
}

export function usePomodoroSettings(): PomodoroSettingsContextValue {
  const context = useContext(PomodoroSettingsContext);

  if (context === null) {
    throw new Error(
      "usePomodoroSettings debe usarse dentro de PomodoroSettingsProvider.",
    );
  }

  return context;
}
