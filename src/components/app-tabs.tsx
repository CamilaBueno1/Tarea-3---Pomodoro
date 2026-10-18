import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { CotopaxiColors } from '@/constants/theme';

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={CotopaxiColors.background}
      indicatorColor={CotopaxiColors.gold}
      labelStyle={{
        selected: { color: CotopaxiColors.navy },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Temporizador</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="timer" md="timer" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Ajustes</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gearshape" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
