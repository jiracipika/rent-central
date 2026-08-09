import { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { colors, radius, shadow, animation } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';
import type { Property } from '@rent-central/core';

interface ListingCardProps {
  listing: Property;
  compact?: boolean;
  /** stagger index for entrance animation (0-based) */
  index?: number;
}

const TYPE_EMOJI: Record<string, string> = {
  apartment: '🏠', condo: '🏢', house: '🏡',
  studio: '🏠', basement: '🏗️', townhouse: '🏘️',
};

const TYPE_BG: Record<string, string> = {
  apartment: '#EFF6FF', condo: '#F5F3FF', house: '#ECFDF5',
  studio: '#FFFBEB', basement: '#F3F4F6', townhouse: '#FFF1F2',
};

const springConfig = {
  damping: animation.spring.damping,
  stiffness: animation.spring.stiffness,
  mass: animation.spring.mass,
};

export function ListingCard({ listing, compact = false, index = 0 }: ListingCardProps) {
  const scale = useSharedValue(1);
  const entrance = useSharedValue(0);

  useEffect(() => {
    entrance.value = withDelay(
      index * 60,
      withSpring(1, springConfig),
    );
  }, [index, entrance]);

  const pressAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const entranceAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(entrance.value, [0, 1], [0, 1]),
    transform: [
      { translateY: interpolate(entrance.value, [0, 1], [16, 0]) },
      { scale: interpolate(entrance.value, [0, 0.5, 1], [0.96, 1.02, 1]) },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100, easing: Easing.out(Easing.quad) });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  return (
    <Animated.View style={entranceAnimatedStyle}>
      <Animated.View style={pressAnimatedStyle}>
        <View style={{
          backgroundColor: colors.glassCard,
          borderRadius: radius.xl,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.glassBorder,
          ...shadow.md,
        }}>
          {/* Image area */}
          <View style={{
            height: compact ? 120 : 160,
            backgroundColor: TYPE_BG[listing.type] ?? '#F3F4F6',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <Text style={{ fontSize: compact ? 32 : 40, opacity: 0.7 }}>
              {TYPE_EMOJI[listing.type] ?? '🏠'}
            </Text>

            {listing.isNew && (
              <View style={{
                position: 'absolute', top: 10, left: 10,
                backgroundColor: colors.primary,
                borderRadius: radius.full,
                paddingHorizontal: 9, paddingVertical: 3,
              }}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>New</Text>
              </View>
            )}

            <Pressable
              onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              style={{
                position: 'absolute', top: 8, right: 8,
                width: 36, height: 36, borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.9)',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 14 }}>♡</Text>
            </Pressable>
          </View>

          <View style={{ padding: compact ? 10 : 14 }}>
            {/* Price with gradient-style color */}
            <Text style={{ fontSize: compact ? 16 : 18, fontWeight: '700', color: colors.primary }}>
              {formatCurrency(listing.pricePerTerm[12])}
              <Text style={{ fontSize: 12, fontWeight: '400', color: colors.textMuted }}>/mo</Text>
            </Text>
            <Text
              style={{ fontSize: compact ? 13 : 15, fontWeight: '600', color: colors.text, marginTop: 2, letterSpacing: -0.2 }}
              numberOfLines={1}
            >
              {listing.title}
            </Text>
            <Text
              style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}
              numberOfLines={1}
            >
              {listing.address}, {listing.city}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>
                🛏 {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bd`}
              </Text>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>
                🚿 {listing.bathrooms} ba
              </Text>
              {listing.squareFootage && (
                <Text style={{ fontSize: 12, color: colors.textMuted }}>
                  📐 {listing.squareFootage} sqft
                </Text>
              )}
            </View>

            {!compact && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {listing.utilitiesIncluded && (
                  <View style={{ backgroundColor: colors.primaryLight, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 11, color: colors.primaryDark, fontWeight: '500' }}>Utilities</Text>
                  </View>
                )}
                {listing.petFriendly && (
                  <View style={{ backgroundColor: colors.primaryLight, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 11, color: colors.primaryDark, fontWeight: '500' }}>Pet Friendly</Text>
                  </View>
                )}
                {listing.parkingIncluded && (
                  <View style={{ backgroundColor: colors.primaryLight, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 11, color: colors.primaryDark, fontWeight: '500' }}>Parking</Text>
                  </View>
                )}
                {listing.furnished && (
                  <View style={{ backgroundColor: colors.primaryLight, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontSize: 11, color: colors.primaryDark, fontWeight: '500' }}>Furnished</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
