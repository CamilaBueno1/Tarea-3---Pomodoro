import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { PomodoroSettingsProvider } from '@/hooks/use-pomodoro-settings';
import { PomodoroSessionProvider } from '@/hooks/use-pomodoro-session';

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
