import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePhaseAlarmAudio } from '@/hooks/use-phase-alarm-audio';
import { usePhaseAlarmSignals } from '@/hooks/use-phase-alarm-signals';
import {
  CotopaxiColors,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';
import type { PomodoroPhase } from '@/domain/pomodoro-session';

const phaseNames: Record<PomodoroPhase, string> = {
  study: 'Estudio',
  shortBreak: 'Descanso corto',
  longBreak: 'Descanso largo',
};

const phases = Object.keys(phaseNames) as PomodoroPhase[];

export default function AlarmRoute() {
  const { phase } = useLocalSearchParams<{
    phase?: string | string[];
  }>();
  const completedPhase =
    typeof phase === 'string' && phases.includes(phase as PomodoroPhase)
      ? (phase as PomodoroPhase)
      : null;

  if (completedPhase === null) {
    const router = useRouter();
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.screen}>
          <Text accessibilityRole="alert" style={styles.title}>
            No se pudo identificar la fase terminada.
          </Text>
          <Pressable
            accessibilityLabel="Cerrar alarma"
            accessibilityRole="button"
            onPress={() => router.replace('/')}
            style={styles.button}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return <ActiveAlarmScreen completedPhase={completedPhase} />;
}

function ActiveAlarmScreen({
  completedPhase,
}: {
  completedPhase: PomodoroPhase;
}) {
  const router = useRouter();
  const { error: audioError, stop: stopAudio } = usePhaseAlarmAudio();
  const { error: signalError, stop: stopSignals } = usePhaseAlarmSignals();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen} testID="alarm-screen">
        <View style={styles.messageContainer}>
          <Text accessibilityRole="header" style={styles.title}>
            ¡Tiempo terminado!
          </Text>
          <Text style={styles.phaseName}>{phaseNames[completedPhase]}</Text>
          {signalError ? (
            <Text accessibilityRole="alert" style={styles.audioError}>
              No se pudo activar una señal de alarma: {signalError.message}
            </Text>
          ) : null}
          {audioError ? (
            <Text accessibilityRole="alert" style={styles.audioError}>
              No se pudo reproducir la alarma: {audioError.message}
            </Text>
          ) : null}
        </View>
        <Pressable
          accessibilityHint="Cierra la alarma y muestra la siguiente fase preparada."
          accessibilityLabel="Detener"
          accessibilityRole="button"
          onPress={() => {
            stopAudio();
            stopSignals();
            router.replace('/');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Detener</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CotopaxiColors.background,
  },
  screen: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.three,
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
    paddingHorizontal: Spacing.two,
  },
  title: {
    color: CotopaxiColors.navy,
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
  },
  phaseName: {
    color: CotopaxiColors.white,
    backgroundColor: CotopaxiColors.navy,
    overflow: 'hidden',
    borderRadius: 16,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  audioError: {
    color: CotopaxiColors.destructive,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    minHeight: 64,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CotopaxiColors.navy,
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.five,
  },
  buttonText: {
    color: CotopaxiColors.text,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
});
