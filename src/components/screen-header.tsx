import { StyleSheet, Text, View } from 'react-native';

import { CotopaxiColors, Spacing } from '@/constants/theme';

type ScreenHeaderProps = {
  badge?: string;
  description?: string;
  title: string;
  variant?: 'default' | 'plain';
};

export function ScreenHeader({
  badge,
  description,
  title,
  variant = 'default',
}: ScreenHeaderProps) {
  return (
    <View style={[styles.header, variant === 'plain' && styles.plainHeader]}>
      <View style={styles.badgeRow}>
        <Text
          style={[
            styles.eyebrow,
            variant === 'plain' && styles.plainEyebrow,
          ]}>
          ACADEMIA COTOPAXI
        </Text>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text
        accessibilityRole="header"
        style={[styles.title, variant === 'plain' && styles.plainTitle]}>
        {title}
      </Text>
      {description ? (
        <Text
          style={[
            styles.description,
            variant === 'plain' && styles.plainDescription,
          ]}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 24,
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    gap: Spacing.one,
    borderColor: CotopaxiColors.navy,
    borderTopColor: CotopaxiColors.white,
    borderWidth: 1,
    borderTopWidth: 2,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  plainHeader: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: Spacing.one,
    shadowOpacity: 0,
    elevation: 0,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  eyebrow: {
    color: CotopaxiColors.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  plainEyebrow: {
    color: CotopaxiColors.secondaryText,
  },
  badge: {
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 8,
  },
  badgeText: {
    color: CotopaxiColors.text,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    color: CotopaxiColors.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  plainTitle: {
    color: CotopaxiColors.navy,
  },
  description: {
    color: CotopaxiColors.white,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  plainDescription: {
    color: CotopaxiColors.secondaryText,
  },
});
