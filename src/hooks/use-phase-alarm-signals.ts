import { useKeepAwake } from "expo-keep-awake";
import { Vibration } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";

const ALARM_KEEP_AWAKE_TAG = "cotopaxi-phase-alarm";
const ALARM_VIBRATION_PATTERN = [0, 700, 300];

export function usePhaseAlarmSignals() {
  useKeepAwake(ALARM_KEEP_AWAKE_TAG);
  const vibrationStarted = useRef(false);
  const [error, setError] = useState<Error | null>(null);

  const stop = useCallback(() => {
    if (!vibrationStarted.current) {
      return;
    }
    vibrationStarted.current = false;
    try {
      Vibration.cancel();
    } catch (vibrationError: unknown) {
      setError(
        vibrationError instanceof Error
          ? vibrationError
          : new Error("No se pudo detener la vibración de la alarma."),
      );
    }
  }, []);

  useEffect(() => {
    try {
      Vibration.vibrate(ALARM_VIBRATION_PATTERN, true);
      vibrationStarted.current = true;
    } catch (vibrationError: unknown) {
      setError(
        vibrationError instanceof Error
          ? vibrationError
          : new Error("No se pudo iniciar la vibración de la alarma."),
      );
    }

    return stop;
  }, [stop]);

  return { error, stop };
}
