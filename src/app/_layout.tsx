import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { PomodoroSettingsProvider } from '@/hooks/use-pomodoro-settings';
import { PomodoroSessionProvider } from '@/hooks/use-pomodoro-session';
import { configureStudyNotifications } from '@/storage/study-notifications';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    void configureStudyNotifications().catch((error: unknown) => {
      console.error(
        'No se pudieron configurar las notificaciones locales.',
        error,
      );
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PomodoroSettingsProvider>
        <PomodoroSessionProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </PomodoroSessionProvider>
      </PomodoroSettingsProvider>
    </ThemeProvider>
  );
}
