import { StyleSheet, Text, View } from 'react-native';

import { CotopaxiColors, Fonts } from '@/constants/theme';

const RING_SIZE = 256;
const TICK_COUNT = 48;
const TICK_WIDTH = 4;
const TICK_HEIGHT = 8;
const TICK_RADIUS = 118;

type ProgressRingProps = {
  accessibilityLabel: string;
  color: string;
  progress: number;
  time: string;
};

export function ProgressRing({
  accessibilityLabel,
  color,
  progress,
  time,
}: ProgressRingProps) {
  const activeTicks = Math.floor(progress * TICK_COUNT);
  const percentage = Math.round(progress * 100);

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percentage }}
      style={styles.container}>
      <View style={styles.track} />
      {Array.from({ length: TICK_COUNT }, (_, index) => {
        const angle = (index / TICK_COUNT) * 2 * Math.PI;
        const left =
          RING_SIZE / 2 +
          Math.sin(angle) * TICK_RADIUS -
          TICK_WIDTH / 2;
        const top =
          RING_SIZE / 2 -
          Math.cos(angle) * TICK_RADIUS -
          TICK_HEIGHT / 2;

        return (
          <View
            key={`tick-${index}`}
            accessible={false}
            style={[
              styles.tick,
              { left, top },
              index < activeTicks && { backgroundColor: color },
            ]}
          />
        );
      })}
      <Text
        accessibilityLabel={`Tiempo restante ${time}`}
        adjustsFontSizeToFit
        numberOfLines={1}
        style={styles.time}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  track: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: RING_SIZE / 2,
    borderWidth: 7,
    borderColor: CotopaxiColors.border,
  },
  tick: {
    position: 'absolute',
    width: TICK_WIDTH,
    height: TICK_HEIGHT,
    borderRadius: TICK_HEIGHT / 2,
    backgroundColor: CotopaxiColors.border,
  },
  time: {
    width: '88%',
    color: CotopaxiColors.navy,
    fontVariant: ['tabular-nums'],
    fontFamily: Fonts.mono,
    fontSize: 56,
    fontWeight: '800',
    textAlign: 'center',
  },
});
