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

  const isBreak = session.phase === 'shortBreak' || session.phase === 'longBreak';
  const progressRatio =
    session.initialDurationMs > 0
      ? Math.min(1, Math.max(0, 1 - timer.remainingMs / session.initialDurationMs))
      : 0;

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
          {/* Encabezado Institucional */}
          <View style={styles.header}>
            <View style={styles.badgeRow}>
              <Text style={styles.eyebrow}>ACADEMIA COTOPAXI</Text>
              <View style={styles.focusBadge}>
                <Text style={styles.focusBadgeText}>FOCUS</Text>
              </View>
            </View>
            <Text style={styles.title}>Temporizador Pomodoro</Text>
          </View>

          {/* Tarjeta Principal del Temporizador */}
          <View style={styles.timerCard}>
            {/* Indicador visual de fase actual */}
            <View
              style={[
                styles.phaseBadge,
                isBreak ? styles.phaseBadgeBreak : styles.phaseBadgeStudy,
              ]}>
              <Text
                style={[
                  styles.phaseName,
                  isBreak ? styles.phaseNameBreak : styles.phaseNameStudy,
                ]}>
                {phaseNames[session.phase]}
              </Text>
            </View>

            {/* Mensaje de estado descriptivo */}
            <Text accessibilityLiveRegion="polite" style={styles.statusMessage}>
              {phaseStatus}
            </Text>

            {/* Display de tiempo restante */}
            <View style={styles.timeContainer}>
              <Text
                accessibilityLabel={`Tiempo restante ${timer.formattedRemainingTime}`}
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.time}>
                {timer.formattedRemainingTime}
              </Text>

              {/* Barra de progreso de la fase actual */}
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    isBreak
                      ? styles.progressBarFillBreak
                      : styles.progressBarFillStudy,
                    { width: `${Math.round(progressRatio * 100)}%` },
                  ]}
                />
              </View>
            </View>

            {/* Contador y chips visuales de pomodoros completados en el ciclo */}
            <View style={styles.cycleContainer}>
              <Text style={styles.progress}>
                Pomodoros completados: {session.completedPomodoros} de{' '}
                {session.cycleTarget}
              </Text>
              <View style={styles.cycleDots}>
                {Array.from({ length: session.cycleTarget }).map((_, idx) => {
                  const isCompleted = idx < session.completedPomodoros;
                  const isCurrent =
                    idx === session.completedPomodoros &&
                    session.status === 'running' &&
                    session.phase === 'study';

                  return (
                    <View
                      key={`cycle-dot-${idx}`}
                      style={[
                        styles.dot,
                        isCompleted && styles.dotCompleted,
                        isCurrent && styles.dotCurrent,
                      ]}
                    />
                  );
                })}
              </View>
            </View>

            {/* Mensajes de error o avisos */}
            {timer.error ? (
              <View style={styles.alertBox}>
                <Text accessibilityRole="alert" style={styles.errorMessage}>
                  No se pudo guardar la sesión. {timer.error.message}
                </Text>
              </View>
            ) : null}
            {timer.notificationError ? (
              <View style={styles.alertBox}>
                <Text accessibilityRole="alert" style={styles.errorMessage}>
                  {timer.notificationError.message}
                </Text>
              </View>
            ) : null}
            {timer.notificationPermissionGranted === false ? (
              <View style={styles.noticeBox}>
                <Text style={styles.permissionMessage}>
                  Avisos desactivados. La cuenta continuará sin notificaciones.
                </Text>
              </View>
            ) : null}

            {/* Botones de control */}
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
        pressed && (destructive ? styles.destructiveButtonPressed : styles.buttonPressed),
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
    gap: Spacing.four,
  },
  header: {
    paddingHorizontal: Spacing.one,
    gap: Spacing.half,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  eyebrow: {
    color: CotopaxiColors.secondaryText,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  focusBadge: {
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.one,
    paddingVertical: 2,
    borderRadius: 6,
  },
  focusBadgeText: {
    color: CotopaxiColors.text,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: CotopaxiColors.navy,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  timerCard: {
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: CotopaxiColors.white,
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.five,
    gap: Spacing.four,
    borderColor: CotopaxiColors.border,
    borderWidth: 1,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
    borderTopColor: CotopaxiColors.white,
    borderTopWidth: 2,
  },
  phaseBadge: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseBadgeStudy: {
    backgroundColor: CotopaxiColors.navy,
  },
  phaseBadgeBreak: {
    backgroundColor: CotopaxiColors.success,
  },
  phaseName: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  phaseNameStudy: {
    color: CotopaxiColors.white,
  },
  phaseNameBreak: {
    color: CotopaxiColors.white,
  },
  statusMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  timeContainer: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.two,
  },
  time: {
    color: CotopaxiColors.navy,
    fontVariant: ['tabular-nums'],
    fontFamily: Fonts.mono,
    fontSize: 88,
    fontWeight: '800',
    textAlign: 'center',
  },
  progressBarTrack: {
    width: '80%',
    height: 8,
    borderRadius: 4,
    backgroundColor: CotopaxiColors.background,
    overflow: 'hidden',
    borderColor: CotopaxiColors.border,
    borderWidth: 1,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressBarFillStudy: {
    backgroundColor: CotopaxiColors.gold,
  },
  progressBarFillBreak: {
    backgroundColor: CotopaxiColors.success,
  },
  cycleContainer: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  progress: {
    color: CotopaxiColors.secondaryText,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  cycleDots: {
    flexDirection: 'row',
    gap: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: CotopaxiColors.background,
    borderColor: CotopaxiColors.border,
    borderWidth: 2,
  },
  dotCompleted: {
    backgroundColor: CotopaxiColors.gold,
    borderColor: CotopaxiColors.navy,
  },
  dotCurrent: {
    borderColor: CotopaxiColors.navy,
    borderWidth: 3,
    backgroundColor: CotopaxiColors.white,
  },
  noticeBox: {
    backgroundColor: CotopaxiColors.white,
    borderColor: CotopaxiColors.border,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    width: '100%',
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    borderTopColor: CotopaxiColors.white,
  },
  alertBox: {
    backgroundColor: CotopaxiColors.white,
    borderColor: CotopaxiColors.destructive,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    width: '100%',
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    borderTopColor: CotopaxiColors.white,
  },
  permissionMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
  errorMessage: {
    color: CotopaxiColors.destructive,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
  controls: {
    width: '100%',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  button: {
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.four,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 4,
    borderColor: CotopaxiColors.gold,
    borderTopColor: CotopaxiColors.white,
    borderWidth: 1,
    borderTopWidth: 2,
  },
  destructiveButton: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: CotopaxiColors.destructive,
    paddingHorizontal: Spacing.four,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 3,
    borderColor: CotopaxiColors.destructive,
    borderTopColor: CotopaxiColors.white,
    borderWidth: 1,
    borderTopWidth: 2,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  destructiveButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonText: {
    color: CotopaxiColors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  destructiveButtonText: {
    color: CotopaxiColors.white,
    fontSize: 16,
    fontWeight: '700',
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
