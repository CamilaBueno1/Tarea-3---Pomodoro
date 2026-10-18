import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  DEFAULT_POMODORO_SETTINGS,
  validatePomodoroSettings,
  type PomodoroSettings,
  type PomodoroSettingsFieldError,
  type PomodoroSettingsInput,
} from '@/domain/pomodoro-settings';
import { CotopaxiColors, MaxContentWidth, Spacing } from '@/constants/theme';
import { usePomodoroSettings } from '@/hooks/use-pomodoro-settings';

type SettingsFieldName = keyof PomodoroSettings;
const SETTINGS_FIELDS: readonly SettingsFieldName[] = [
  'studyDurationMinutes',
  'shortBreakDurationMinutes',
  'longBreakDurationMinutes',
  'pomodorosBeforeLongBreak',
];

function toFormValues(settings: PomodoroSettings): PomodoroSettingsInput {
  return {
    studyDurationMinutes: String(settings.studyDurationMinutes),
    shortBreakDurationMinutes: String(settings.shortBreakDurationMinutes),
    longBreakDurationMinutes: String(settings.longBreakDurationMinutes),
    pomodorosBeforeLongBreak: String(settings.pomodorosBeforeLongBreak),
  };
}

function errorMessage(
  field: SettingsFieldName,
  error: PomodoroSettingsFieldError,
): string {
  if (error === 'required') {
    return 'Este campo es obligatorio.';
  }

  if (error === 'integer') {
    return 'Ingresa un número entero.';
  }

  return field === 'pomodorosBeforeLongBreak'
    ? 'Ingresa entre 1 y 12 pomodoros.'
    : 'Ingresa entre 1 y 120 minutos.';
}

function toFieldErrors(
  errors: Partial<
    Record<SettingsFieldName, PomodoroSettingsFieldError>
  >,
): Partial<Record<SettingsFieldName, string>> {
  const messages: Partial<Record<SettingsFieldName, string>> = {};

  for (const field of SETTINGS_FIELDS) {
    const error = errors[field];
    if (error) {
      messages[field] = errorMessage(field, error);
    }
  }

  return messages;
}

export default function SettingsScreen() {
  const { settings, status, error, saveSettings } = usePomodoroSettings();
  const [values, setValues] = useState<PomodoroSettingsInput | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<SettingsFieldName, string>>
  >({});
  const [operationError, setOperationError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const formValues = values ?? toFormValues(settings);

  useEffect(() => {
    if (!savedMessage) {
      return;
    }

    const timeoutId = setTimeout(() => setSavedMessage(null), 3_500);
    return () => clearTimeout(timeoutId);
  }, [savedMessage]);

  async function persistSettings(nextSettings: PomodoroSettings) {
    setIsSaving(true);
    setOperationError(null);
    setSavedMessage(null);

    try {
      await saveSettings(nextSettings);
      setValues(toFormValues(nextSettings));
      setSavedMessage('Ajustes guardados correctamente.');
    } catch (saveError: unknown) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : 'Ocurrió un error inesperado.';
      setOperationError(`No se pudieron guardar los ajustes. ${message}`);
    } finally {
      setIsSaving(false);
    }
  }

  function handleSave() {
    const validation = validatePomodoroSettings(formValues);

    if (!validation.valid) {
      setFieldErrors(toFieldErrors(validation.errors));
      setSavedMessage(null);
      return;
    }

    setFieldErrors({});
    Alert.alert(
      'Guardar ajustes',
      '¿Deseas aplicar estos cambios?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Guardar',
          onPress: () => {
            void persistSettings(validation.value);
          },
        },
      ],
      { cancelable: true },
    );
  }

  function handleReset() {
    Alert.alert(
      'Restablecer ajustes',
      'Se volverá a los valores predeterminados: 25, 5, 15 minutos y 4 pomodoros.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Restablecer',
          style: 'destructive',
          onPress: () => {
            void persistSettings({ ...DEFAULT_POMODORO_SETTINGS });
          },
        },
      ],
      { cancelable: true },
    );
  }

  function updateField(field: SettingsFieldName, value: string) {
    setValues((currentValues) => ({
      ...(currentValues ?? toFormValues(settings)),
      [field]: value,
    }));
    setFieldErrors((currentErrors) => {
      if (!(field in currentErrors)) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setOperationError(null);
    setSavedMessage(null);
  }

  if (status === 'loading') {
    return <StatusView message="Cargando los ajustes…" />;
  }

  if (status === 'error') {
    return (
      <StatusView
        message="No se pudieron cargar los ajustes guardados."
        error={error?.message}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            {/* Encabezado Institucional */}
            <View style={styles.header}>
              <View style={styles.badgeRow}>
                <Text style={styles.eyebrow}>ACADEMIA COTOPAXI</Text>
                <View style={styles.focusBadge}>
                  <Text style={styles.focusBadgeText}>CONFIGURACIÓN</Text>
                </View>
              </View>
              <Text style={styles.title}>Ajustes</Text>
              <Text style={styles.headerDescription}>
                Adapta los tiempos a tu ritmo de estudio.
              </Text>
            </View>

            {/* Tarjeta de Formulario Principal */}
            <View style={styles.formCard}>
              {/* Sección 1: Duración de cada fase */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Duración de cada fase</Text>
                <Text style={styles.sectionSubtitle}>
                  Los cambios se aplican al comenzar la siguiente fase.
                </Text>
              </View>

              <SettingsField
                label="Duración de estudio en minutos"
                value={formValues.studyDurationMinutes}
                unit="min"
                hint="De 1 a 120 minutos."
                error={fieldErrors.studyDurationMinutes}
                onChangeText={(value) =>
                  updateField('studyDurationMinutes', value)
                }
              />
              <SettingsField
                label="Duración del descanso corto en minutos"
                value={formValues.shortBreakDurationMinutes}
                unit="min"
                hint="De 1 a 120 minutos."
                error={fieldErrors.shortBreakDurationMinutes}
                onChangeText={(value) =>
                  updateField('shortBreakDurationMinutes', value)
                }
              />
              <SettingsField
                label="Duración del descanso largo en minutos"
                value={formValues.longBreakDurationMinutes}
                unit="min"
                hint="De 1 a 120 minutos."
                error={fieldErrors.longBreakDurationMinutes}
                onChangeText={(value) =>
                  updateField('longBreakDurationMinutes', value)
                }
              />

              <View style={styles.divider} />

              {/* Sección 2: Ciclo Pomodoro */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Ciclo Pomodoro</Text>
                <Text style={styles.sectionSubtitle}>
                  Cantidad de pomodoros de estudio antes de un descanso largo.
                </Text>
              </View>

              <SettingsField
                label="Pomodoros antes del descanso largo"
                value={formValues.pomodorosBeforeLongBreak}
                unit="pomodoros"
                hint="De 1 a 12 pomodoros."
                error={fieldErrors.pomodorosBeforeLongBreak}
                onChangeText={(value) =>
                  updateField('pomodorosBeforeLongBreak', value)
                }
              />

              {operationError ? (
                <View style={styles.errorBox}>
                  <Text accessibilityRole="alert" style={styles.errorText}>
                    {operationError}
                  </Text>
                </View>
              ) : null}
              {/* Botones de acción */}
              <View style={styles.buttonGroup}>
                <SettingsButton
                  label="Guardar ajustes"
                  title={isSaving ? 'Guardando…' : 'Guardar ajustes'}
                  onPress={handleSave}
                  disabled={isSaving}
                />
                <SettingsButton
                  destructive
                  label="Restablecer valores"
                  title="Restablecer valores"
                  onPress={handleReset}
                  disabled={isSaving}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {savedMessage ? (
        <View pointerEvents="box-none" style={styles.toastLayer}>
          <View
            accessibilityLiveRegion="polite"
            accessibilityRole="alert"
            style={styles.successToast}>
            <Text style={styles.successText}>{savedMessage}</Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

function StatusView({
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
            accessibilityLabel="Cargando ajustes"
          />
        )}
        <Text
          accessibilityRole="alert"
          style={[styles.statusMessage, error && styles.errorText]}>
          {message}
        </Text>
        {error ? <Text style={styles.errorDetails}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

function SettingsField({
  label,
  value,
  unit,
  hint,
  error,
  onChangeText,
}: {
  label: string;
  value: string;
  unit?: string;
  hint: string;
  error?: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          accessibilityLabel={label}
          accessibilityHint={error ? `${hint} ${error}` : hint}
          keyboardType="number-pad"
          onChangeText={onChangeText}
          value={value}
          style={styles.input}
        />
        {unit ? (
          <View style={styles.unitBadge}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.fieldHint, error && styles.errorText]}>
        {error ?? hint}
      </Text>
    </View>
  );
}

function SettingsButton({
  label,
  title,
  onPress,
  disabled,
  destructive = false,
}: {
  label: string;
  title: string;
  onPress: () => void;
  disabled: boolean;
  destructive?: boolean;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        destructive && styles.destructiveButton,
        pressed && !disabled && (destructive ? styles.destructiveButtonPressed : styles.buttonPressed),
        disabled && styles.buttonDisabled,
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
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: CotopaxiColors.background,
  },
  toastLayer: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.three,
    right: Spacing.three,
    zIndex: 10,
    alignItems: 'center',
  },
  successToast: {
    width: '100%',
    maxWidth: 560,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: CotopaxiColors.success,
    borderTopColor: CotopaxiColors.white,
    borderTopWidth: 2,
    backgroundColor: CotopaxiColors.success,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 7,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.four,
    paddingBottom: Platform.OS === 'web' ? 112 : Spacing.five,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.four,
  },
  header: {
    borderRadius: 24,
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    gap: Spacing.one,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    borderColor: CotopaxiColors.navy,
    borderTopColor: CotopaxiColors.white,
    borderWidth: 1,
    borderTopWidth: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  eyebrow: {
    color: CotopaxiColors.gold,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  focusBadge: {
    backgroundColor: CotopaxiColors.white,
    paddingHorizontal: Spacing.one,
    paddingVertical: 2,
    borderRadius: 6,
  },
  focusBadgeText: {
    color: CotopaxiColors.navy,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: CotopaxiColors.white,
    fontSize: 28,
    fontWeight: '800',
  },
  headerDescription: {
    color: CotopaxiColors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  formCard: {
    borderColor: CotopaxiColors.border,
    borderRadius: 28,
    borderWidth: 1,
    backgroundColor: CotopaxiColors.white,
    padding: Spacing.four,
    gap: Spacing.three,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
    borderTopColor: CotopaxiColors.white,
    borderTopWidth: 2,
  },
  sectionHeader: {
    gap: Spacing.half,
  },
  sectionTitle: {
    color: CotopaxiColors.navy,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: CotopaxiColors.secondaryText,
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: CotopaxiColors.border,
    marginVertical: Spacing.one,
  },
  field: {
    gap: Spacing.one,
  },
  fieldLabel: {
    color: CotopaxiColors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  inputWrapper: {
    minHeight: 52,
    borderColor: CotopaxiColors.border,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: CotopaxiColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  input: {
    flex: 1,
    color: CotopaxiColors.text,
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: Spacing.two,
  },
  inputError: {
    borderColor: CotopaxiColors.destructive,
    backgroundColor: CotopaxiColors.white,
  },
  unitBadge: {
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 8,
  },
  unitText: {
    color: CotopaxiColors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  fieldHint: {
    color: CotopaxiColors.secondaryText,
    fontSize: 13,
  },
  errorBox: {
    backgroundColor: CotopaxiColors.white,
    borderColor: CotopaxiColors.destructive,
    borderWidth: 1,
    borderRadius: 24,
    padding: Spacing.three,
  },
  errorText: {
    color: CotopaxiColors.destructive,
    fontSize: 13,
    fontWeight: '600',
  },
  successText: {
    color: CotopaxiColors.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonGroup: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  button: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.four,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 3,
    borderColor: CotopaxiColors.gold,
    borderTopColor: CotopaxiColors.white,
    borderWidth: 1,
    borderTopWidth: 2,
  },
  destructiveButton: {
    backgroundColor: CotopaxiColors.destructive,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
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
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: CotopaxiColors.text,
    fontSize: 17,
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
    padding: Spacing.four,
    gap: Spacing.three,
  },
  statusMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorDetails: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    textAlign: 'center',
  },
});
