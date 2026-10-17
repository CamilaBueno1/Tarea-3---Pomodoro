import { useState } from 'react';
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
            <View style={styles.header}>
              <Text style={styles.eyebrow}>ACADEMIA COTOPAXI</Text>
              <Text style={styles.title}>Ajustes</Text>
              <Text style={styles.headerDescription}>
                Adapta los tiempos a tu ritmo de estudio.
              </Text>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Duración de cada fase</Text>
              <SettingsField
                label="Duración de estudio en minutos"
                value={formValues.studyDurationMinutes}
                hint="De 1 a 120 minutos."
                error={fieldErrors.studyDurationMinutes}
                onChangeText={(value) =>
                  updateField('studyDurationMinutes', value)
                }
              />
              <SettingsField
                label="Duración del descanso corto en minutos"
                value={formValues.shortBreakDurationMinutes}
                hint="De 1 a 120 minutos."
                error={fieldErrors.shortBreakDurationMinutes}
                onChangeText={(value) =>
                  updateField('shortBreakDurationMinutes', value)
                }
              />
              <SettingsField
                label="Duración del descanso largo en minutos"
                value={formValues.longBreakDurationMinutes}
                hint="De 1 a 120 minutos."
                error={fieldErrors.longBreakDurationMinutes}
                onChangeText={(value) =>
                  updateField('longBreakDurationMinutes', value)
                }
              />

              <Text style={styles.sectionTitle}>Ciclo Pomodoro</Text>
              <SettingsField
                label="Pomodoros antes del descanso largo"
                value={formValues.pomodorosBeforeLongBreak}
                hint="De 1 a 12 pomodoros."
                error={fieldErrors.pomodorosBeforeLongBreak}
                onChangeText={(value) =>
                  updateField('pomodorosBeforeLongBreak', value)
                }
              />

              {operationError ? (
                <Text accessibilityRole="alert" style={styles.errorText}>
                  {operationError}
                </Text>
              ) : null}
              {savedMessage ? (
                <Text accessibilityRole="alert" style={styles.successText}>
                  {savedMessage}
                </Text>
              ) : null}

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
        </ScrollView>
      </KeyboardAvoidingView>
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
  hint,
  error,
  onChangeText,
}: {
  label: string;
  value: string;
  hint: string;
  error?: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={error ? `${hint} ${error}` : hint}
        keyboardType="number-pad"
        onChangeText={onChangeText}
        value={value}
        style={[styles.input, error && styles.inputError]}
      />
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
        pressed && !disabled && styles.buttonPressed,
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
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.four,
    paddingBottom: Spacing.five,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.four,
  },
  header: {
    borderRadius: Spacing.three,
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  eyebrow: {
    color: CotopaxiColors.white,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  title: {
    color: CotopaxiColors.white,
    fontSize: 24,
    fontWeight: '700',
  },
  headerDescription: {
    color: CotopaxiColors.white,
    fontSize: 15,
  },
  formCard: {
    borderColor: CotopaxiColors.border,
    borderRadius: Spacing.three,
    borderWidth: 1,
    backgroundColor: CotopaxiColors.white,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  sectionTitle: {
    color: CotopaxiColors.navy,
    fontSize: 18,
    fontWeight: '700',
  },
  field: {
    gap: Spacing.one,
  },
  fieldLabel: {
    color: CotopaxiColors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    minHeight: 48,
    borderColor: CotopaxiColors.border,
    borderRadius: Spacing.two,
    borderWidth: 1,
    backgroundColor: CotopaxiColors.white,
    color: CotopaxiColors.text,
    paddingHorizontal: Spacing.three,
    fontSize: 18,
  },
  inputError: {
    borderColor: CotopaxiColors.destructive,
  },
  fieldHint: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
  },
  errorText: {
    color: CotopaxiColors.destructive,
  },
  successText: {
    borderRadius: Spacing.two,
    backgroundColor: CotopaxiColors.success,
    color: CotopaxiColors.white,
    padding: Spacing.two,
  },
  button: {
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.two,
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.four,
  },
  destructiveButton: {
    backgroundColor: CotopaxiColors.destructive,
  },
  buttonPressed: {
    borderColor: CotopaxiColors.navy,
    borderWidth: 2,
  },
  buttonDisabled: {
    borderColor: CotopaxiColors.border,
    borderWidth: 1,
  },
  buttonText: {
    color: CotopaxiColors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  destructiveButtonText: {
    color: CotopaxiColors.white,
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
