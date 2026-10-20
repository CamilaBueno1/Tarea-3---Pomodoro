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
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';
import { ScreenHeader } from '@/components/screen-header';
import { ProgressRing } from '@/components/progress-ring';
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
  const shouldShowExactAlarmNotice =
    Platform.OS === 'android' && Number(Platform.Version) >= 31;
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
          <ScreenHeader
            title="Temporizador Pomodoro"
            variant="plain"
          />

          {/* Tarjeta Principal del Temporizador */}
          <View style={styles.timerCard}>
            {/* Indicador visual de fase actual */}
            <View style={styles.phaseHeader}>
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
              <View style={styles.phaseAccent} />
            </View>

            {/* Mensaje de estado descriptivo */}
            <Text accessibilityLiveRegion="polite" style={styles.statusMessage}>
              {phaseStatus}
            </Text>

            {session.status === 'ready' && session.lastCompletedPhase ? (
              <View
                accessibilityLiveRegion="assertive"
                style={styles.completionNotice}
                testID="phase-completion-notice">
                <Text accessibilityRole="alert" style={styles.completionTitle}>
                  ¡{phaseNames[session.lastCompletedPhase]} terminado!
                </Text>
                <Text style={styles.completionMessage}>
                  {phaseNames[session.phase]} está listo para iniciar.
                </Text>
              </View>
            ) : null}

            {/* Display de tiempo restante */}
            <ProgressRing
              accessibilityLabel={`Progreso de ${phaseNames[session.phase].toLowerCase()}`}
              color={isBreak ? CotopaxiColors.success : CotopaxiColors.gold}
              progress={progressRatio}
              time={timer.formattedRemainingTime}
            />

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
            {shouldShowExactAlarmNotice ? (
              <View style={styles.noticeBox}>
                <Text style={styles.permissionMessage}>
                  En Android 12 o posterior, el acceso especial «Alarmas y
                  recordatorios» puede reducir retrasos. Se activa en Ajustes
                  del sistema; la aplicación no puede comprobar si está
                  concedido.
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
        destructive ? styles.secondaryButton : styles.button,
        pressed &&
          (destructive
            ? styles.secondaryButtonPressed
            : styles.buttonPressed),
      ]}>
      <Text
        style={[
          styles.buttonText,
          destructive && styles.secondaryButtonText,
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
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Platform.OS === 'web' ? 104 : Spacing.four,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.three,
  },
  timerCard: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    backgroundColor: CotopaxiColors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: CotopaxiColors.border,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  phaseBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseBadgeStudy: {
    backgroundColor: CotopaxiColors.background,
    borderColor: CotopaxiColors.navy,
    borderWidth: 1,
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
    color: CotopaxiColors.navy,
  },
  phaseNameBreak: {
    color: CotopaxiColors.white,
  },
  phaseHeader: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.one,
  },
  phaseAccent: {
    width: 44,
    height: 3,
    borderRadius: 2,
    backgroundColor: CotopaxiColors.navy,
  },
  statusMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  completionNotice: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 12,
    backgroundColor: CotopaxiColors.success,
  },
  completionTitle: {
    color: CotopaxiColors.white,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  completionMessage: {
    color: CotopaxiColors.white,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  cycleContainer: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  progress: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  cycleDots: {
    flexDirection: 'row',
    gap: Spacing.three,
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
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    width: '100%',
  },
  alertBox: {
    backgroundColor: CotopaxiColors.white,
    borderRadius: 12,
    borderLeftColor: CotopaxiColors.gold,
    borderLeftWidth: 3,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    width: '100%',
  },
  permissionMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 12,
    textAlign: 'left',
    fontWeight: '500',
  },
  errorMessage: {
    color: CotopaxiColors.navy,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
  controls: {
    width: '100%',
    gap: Spacing.one,
    marginTop: Spacing.two,
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: CotopaxiColors.border,
  },
  button: {
    minHeight: 56,
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.five,
    borderColor: CotopaxiColors.navy,
    borderWidth: 1,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 1,
  },
  secondaryButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CotopaxiColors.navy,
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.four,
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },
  secondaryButtonPressed: {
    opacity: 0.86,
  },
  buttonText: {
    color: CotopaxiColors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  secondaryButtonText: {
    color: CotopaxiColors.white,
    fontSize: 14,
    fontWeight: '600',
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
