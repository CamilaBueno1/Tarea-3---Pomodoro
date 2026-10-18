import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CotopaxiColors,
  Fonts,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';
import { usePomodoroSession } from '@/hooks/use-pomodoro-session';
import type { PomodoroPhase } from '@/domain/pomodoro-session';

const phaseNames: Record<PomodoroPhase, string> = {
  study: 'Estudio',
  shortBreak: 'Descanso corto',
  longBreak: 'Descanso largo',
};

export default function HomeScreen() {
  const timer = usePomodoroSession();
  const [hasExplainedNotificationPermission, setHasExplainedNotificationPermission] =
    useState(false);

  if (timer.status === 'loading') {
    return <StatusMessage message="Cargando tu sesión…" />;
  }

  if (timer.status === 'error' || timer.session === null) {
    return (
      <StatusMessage
        message="No se pudo restaurar la sesión guardada."
        error={timer.error?.message}
      />
    );
  }

  const { session } = timer;
  const phaseStatus =
    session.status === 'ready'
      ? session.lastCompletedPhase
        ? `${phaseNames[session.lastCompletedPhase]} terminado. ${phaseNames[session.phase]} listo`
        : `${phaseNames[session.phase]} listo`
      : session.status === 'running'
        ? `${phaseNames[session.phase]} en marcha`
        : `${phaseNames[session.phase]} pausado`;

  function startWithPermissionExplanation() {
    if (
      timer.notificationPermissionGranted ||
      hasExplainedNotificationPermission
    ) {
      void timer.start();
      return;
    }

    Alert.alert(
      'Avisos del temporizador',
      'Cotopaxi Focus puede mostrar un aviso local cuando termine esta fase. Puedes iniciar sin avisos o permitir las notificaciones.',
      [
        {
          text: 'Iniciar sin avisos',
          style: 'cancel',
          onPress: () => {
            setHasExplainedNotificationPermission(true);
            void timer.start();
          },
        },
        {
          text: 'Permitir avisos',
          onPress: () => {
            setHasExplainedNotificationPermission(true);
            void (async () => {
              const granted = await timer.requestPermission();
              await timer.start(granted);
            })();
          },
        },
      ],
      { cancelable: true },
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        alwaysBounceVertical={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>ACADEMIA COTOPAXI</Text>
            <Text style={styles.title}>Temporizador Pomodoro</Text>
          </View>

          <View style={styles.timerCard}>
            <Text style={styles.phaseName}>{phaseNames[session.phase]}</Text>
            <Text accessibilityLiveRegion="polite" style={styles.statusMessage}>
              {phaseStatus}
            </Text>
            <Text
              accessibilityLabel={`Tiempo restante ${timer.formattedRemainingTime}`}
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.time}>
              {timer.formattedRemainingTime}
            </Text>
            <Text style={styles.progress}>
              Pomodoros completados: {session.completedPomodoros} de{' '}
              {session.cycleTarget}
            </Text>

            {timer.error ? (
              <Text accessibilityRole="alert" style={styles.errorMessage}>
                No se pudo guardar la sesión. {timer.error.message}
              </Text>
            ) : null}
            {timer.notificationError ? (
              <Text accessibilityRole="alert" style={styles.errorMessage}>
                No se pudo programar el aviso. La cuenta seguirá funcionando.
              </Text>
            ) : null}
            {timer.notificationPermissionGranted === false ? (
              <Text style={styles.permissionMessage}>
                Avisos desactivados. La cuenta continuará sin notificaciones.
              </Text>
            ) : null}

            <View style={styles.controls}>
              {session.status === 'ready' ? (
                <TimerButton
                  label={`Iniciar ${phaseNames[session.phase].toLowerCase()}`}
                  title="Iniciar"
                  onPress={startWithPermissionExplanation}
                />
              ) : null}
              {session.status === 'running' ? (
                <TimerButton
                  label="Pausar temporizador"
                  title="Pausar"
                  onPress={() => void timer.pause()}
                />
              ) : null}
              {session.status === 'paused' ? (
                <TimerButton
                  label="Reanudar temporizador"
                  title="Reanudar"
                  onPress={() => void timer.resume()}
                />
              ) : null}
              {session.status !== 'ready' ? (
                <TimerButton
                  destructive
                  label="Reiniciar temporizador"
                  title="Reiniciar"
                  onPress={() =>
                    Alert.alert(
                      'Reiniciar temporizador',
                      'El tiempo restante volverá a la duración inicial de esta fase.',
                      [
                        { text: 'Cancelar', style: 'cancel' },
                        {
                          text: 'Reiniciar',
                          style: 'destructive',
                          onPress: () => {
                            void timer.restart();
                          },
                        },
                      ],
                      { cancelable: true },
                    )
                  }
                />
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusMessage({
  message,
  error,
}: {
  message: string;
  error?: string;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.statusContainer}>
        {error ? null : (
          <ActivityIndicator
            color={CotopaxiColors.navy}
            accessibilityLabel="Cargando sesión"
          />
        )}
        <Text
          accessibilityRole="alert"
          style={[styles.statusMessage, error && styles.errorMessage]}>
          {message}
        </Text>
        {error ? <Text style={styles.errorDetails}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

function TimerButton({
  label,
  title,
  onPress,
  destructive = false,
}: {
  label: string;
  title: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        destructive ? styles.destructiveButton : styles.button,
        pressed && styles.buttonPressed,
      ]}>
      <Text
        style={[
          styles.buttonText,
          destructive && styles.destructiveButtonText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CotopaxiColors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.four,
    paddingBottom: Platform.OS === 'web' ? 112 : Spacing.four,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.five,
  },
  header: {
    paddingHorizontal: Spacing.one,
    gap: Spacing.one,
  },
  eyebrow: {
    color: CotopaxiColors.secondaryText,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: CotopaxiColors.navy,
    fontSize: 28,
    fontWeight: '700',
  },
  timerCard: {
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: CotopaxiColors.white,
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.five,
    gap: Spacing.four,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  phaseName: {
    color: CotopaxiColors.navy,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  statusMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  time: {
    color: CotopaxiColors.navy,
    fontVariant: ['tabular-nums'],
    fontFamily: Fonts.mono,
    fontSize: 84,
    fontWeight: '700',
    textAlign: 'center',
  },
  progress: {
    color: CotopaxiColors.secondaryText,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  permissionMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    textAlign: 'center',
  },
  errorMessage: {
    color: CotopaxiColors.destructive,
    fontSize: 14,
    textAlign: 'center',
  },
  controls: {
    width: '100%',
    gap: Spacing.two,
  },
  button: {
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.four,
    shadowColor: CotopaxiColors.gold,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 3,
  },
  destructiveButton: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: CotopaxiColors.destructive,
    paddingHorizontal: Spacing.four,
  },
  buttonPressed: {
    borderWidth: 2,
    borderColor: CotopaxiColors.navy,
  },
  buttonText: {
    color: CotopaxiColors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  destructiveButtonText: {
    color: CotopaxiColors.white,
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  errorDetails: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    textAlign: 'center',
  },
});
