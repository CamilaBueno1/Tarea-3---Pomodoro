import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";

const alarmAudio = require("../../assets/audio/alarm-tone.wav");

export function usePhaseAlarmAudio(enabled = true) {
  const player = useAudioPlayer(alarmAudio);
  const status = useAudioPlayerStatus(player);
  const stopped = useRef(false);
  const [playbackError, setPlaybackError] = useState<Error | null>(null);

  const stop = useCallback(() => {
    if (stopped.current) {
      return;
    }

    stopped.current = true;
    try {
      player.loop = false;
      player.pause();
    } catch (error) {
      setPlaybackError(
        error instanceof Error
          ? error
          : new Error("No se pudo detener el audio de la alarma."),
      );
    }
  }, [player]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    try {
      player.loop = true;
      player.play();
    } catch (error) {
      setPlaybackError(
        error instanceof Error
          ? error
          : new Error("No se pudo reproducir el audio de la alarma."),
      );
    }

    return stop;
  }, [enabled, player, stop]);

  return {
    error:
      playbackError ??
      (status.error ? new Error(status.error) : null),
    stop,
  };
}
