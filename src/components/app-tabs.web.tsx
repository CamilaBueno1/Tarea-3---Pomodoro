import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CotopaxiColors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.tabSlot} />
      <TabList asChild>
        <SafeAreaView edges={['bottom']} style={styles.tabBar}>
          <View style={styles.tabButtons}>
            <TabTrigger name="index" href="/" asChild>
              <TabButton>Temporizador</TabButton>
            </TabTrigger>
            <TabTrigger name="settings" href="/settings" asChild>
              <TabButton>Ajustes</TabButton>
            </TabTrigger>
          </View>
        </SafeAreaView>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  children,
  isFocused,
  ...props
}: TabTriggerSlotProps) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={[styles.tabButton, isFocused && styles.selectedTabButton]}>
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
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: CotopaxiColors.navy,
  },
  tabButtons: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
  },
  tabButton: {
    minHeight: 48,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  selectedTabButton: {
    backgroundColor: CotopaxiColors.gold,
  },
  tabLabel: {
    color: CotopaxiColors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  selectedTabLabel: {
    color: CotopaxiColors.text,
  },
});
