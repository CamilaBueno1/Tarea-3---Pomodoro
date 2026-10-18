import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CotopaxiColors, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.tabSlot} />
      <TabList asChild style={styles.tabBar}>
        <SafeAreaView edges={['bottom']} style={styles.tabBar}>
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon="◷">Temporizador</TabButton>
          </TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild>
            <TabButton icon="⚙">Ajustes</TabButton>
          </TabTrigger>
        </SafeAreaView>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  children,
  isFocused,
  icon,
  ...props
}: TabTriggerSlotProps & { icon: string }) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={[styles.tabButton, isFocused && styles.selectedTabButton]}>
      <Text style={[styles.tabIcon, isFocused && styles.selectedTabLabel]}>
        {icon}
      </Text>
      <Text style={[styles.tabLabel, isFocused && styles.selectedTabLabel]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabSlot: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: Spacing.two,
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.one,
    padding: Spacing.one,
    borderRadius: 28,
    backgroundColor: CotopaxiColors.white,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  tabButton: {
    minHeight: 52,
    minWidth: 148,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderRadius: 24,
    paddingHorizontal: Spacing.four,
  },
  selectedTabButton: {
    backgroundColor: CotopaxiColors.gold,
  },
  tabIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
  tabLabel: {
    color: CotopaxiColors.secondaryText,
    fontSize: 15,
    fontWeight: '600',
  },
  selectedTabLabel: {
    color: CotopaxiColors.text,
  },
});