import { View, Text } from 'react-native';
import { colors, radius, shadow } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';
import type { Property } from '@rent-central/core';

interface ListingCardProps {
  listing: Property;
  compact?: boolean;
}

const TYPE_EMOJI: Record<string, string> = {
  apartment: '🏠', condo: '🏢', house: '🏡',
  studio: '🏠', basement: '🏗️', townhouse: '🏘️',
};

const TYPE_BG: Record<string, string> = {
  apartment: '#EFF6FF', condo: '#F5F3FF', house: '#ECFDF5',
  studio: '#FFFBEB', basement: '#F3F4F6', townhouse: '#FFF1F2',
};

export function ListingCard({ listing, compact = false }: ListingCardProps) {
  return (
    <View style={{
      backgroundColor: colors.card,
      borderRadius: radius.xl,
      overflow: 'hidden',
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
            backgroundColor: colors.success,
            borderRadius: radius.full,
            paddingHorizontal: 9, paddingVertical: 3,
          }}>
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>New</Text>
          </View>
        )}

        <View style={{
          position: 'absolute', top: 8, right: 8,
          width: 30, height: 30, borderRadius: 15,
          backgroundColor: 'rgba(255,255,255,0.9)',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ fontSize: 13 }}>♡</Text>
        </View>
      </View>

      <View style={{ padding: compact ? 10 : 14 }}>
        <Text style={{ fontSize: compact ? 16 : 18, fontWeight: '700', color: colors.primary }}>
          {formatCurrency(listing.pricePerTerm[12])}
          <Text style={{ fontSize: 12, fontWeight: '400', color: colors.textMuted }}>/mo</Text>
        </Text>
        <Text
          style={{ fontSize: compact ? 13 : 15, fontWeight: '600', color: colors.text, marginTop: 2 }}
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
              <View style={{ backgroundColor: colors.fillSecondary, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 11, color: colors.textSecondary }}>Utilities</Text>
              </View>
            )}
            {listing.petFriendly && (
              <View style={{ backgroundColor: colors.fillSecondary, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 11, color: colors.textSecondary }}>Pet Friendly</Text>
              </View>
            )}
            {listing.parkingIncluded && (
              <View style={{ backgroundColor: colors.fillSecondary, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 11, color: colors.textSecondary }}>Parking</Text>
              </View>
            )}
            {listing.furnished && (
              <View style={{ backgroundColor: colors.fillSecondary, borderRadius: radius.sm, paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 11, color: colors.textSecondary }}>Furnished</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
