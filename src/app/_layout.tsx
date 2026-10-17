import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { PomodoroSettingsProvider } from '@/hooks/use-pomodoro-settings';
import { PomodoroSessionProvider } from '@/hooks/use-pomodoro-session';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PomodoroSettingsProvider>
        <PomodoroSessionProvider>
          <AppTabs />
        </PomodoroSessionProvider>
      </PomodoroSettingsProvider>
    </ThemeProvider>
  );
}
