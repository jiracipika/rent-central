import { View, Text } from 'react-native';
import { colors } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';
import type { Property } from '@rent-central/core';

interface ListingCardProps {
  listing: Property;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <View
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      {/* Image placeholder */}
      <View className="h-40 bg-gray-200 items-center justify-center relative">
        <Text className="text-3xl">🏠</Text>
        {listing.isNew && (
          <View className="absolute top-3 left-3 bg-[#2563EB] px-2.5 py-1 rounded-full">
            <Text className="text-white text-xs font-semibold">New</Text>
          </View>
        )}
      </View>

      <View className="p-4">
        <Text className="font-semibold text-base" style={{ color: colors.text }} numberOfLines={1}>
          {listing.title}
        </Text>
        <Text className="text-sm mt-0.5" style={{ color: colors.textSecondary }} numberOfLines={1}>
          {listing.address}, {listing.city}
        </Text>

        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-lg font-bold" style={{ color: colors.primary }}>
            {formatCurrency(listing.pricePerTerm[12])}/mo
          </Text>
          <View className="flex-row gap-3">
            <Text className="text-sm" style={{ color: colors.textMuted }}>
              {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bd`}
            </Text>
            <Text className="text-sm" style={{ color: colors.textMuted }}>
              {listing.bathrooms} ba
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap gap-1.5 mt-2.5">
          {listing.utilitiesIncluded && (
            <View className="bg-gray-100 px-2 py-0.5 rounded-md">
              <Text className="text-xs" style={{ color: colors.textSecondary }}>Utilities</Text>
            </View>
          )}
          {listing.petFriendly && (
            <View className="bg-gray-100 px-2 py-0.5 rounded-md">
              <Text className="text-xs" style={{ color: colors.textSecondary }}>Pet Friendly</Text>
            </View>
          )}
          {listing.parkingIncluded && (
            <View className="bg-gray-100 px-2 py-0.5 rounded-md">
              <Text className="text-xs" style={{ color: colors.textSecondary }}>Parking</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
