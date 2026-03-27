import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';
import type { Property } from '@rent-central/core';

const MOCK: Property = {
  id: '1',
  landlordId: 'l1',
  title: 'Bright 2BR Downtown',
  description: 'Gorgeous 2 bedroom apartment with skyline views in the heart of downtown Toronto. Features modern finishes, in-unit laundry, and access to building amenities including a gym and rooftop terrace. Close to transit, restaurants, and entertainment.',
  type: 'apartment',
  status: 'active',
  address: '123 King St W',
  city: 'Toronto',
  province: 'ON',
  postalCode: 'M5H 1C1',
  lat: 43.6487,
  lng: -79.3854,
  bedrooms: 2,
  bathrooms: 1,
  squareFootage: 850,
  pricePerTerm: { 3: 2400, 6: 2300, 12: 2200 },
  deposit: 2200,
  utilitiesIncluded: true,
  parkingIncluded: false,
  petFriendly: true,
  furnished: false,
  amenities: ['Gym', 'Rooftop Terrace', 'In-unit Laundry', 'Concierge'],
  photos: [],
  coverPhoto: '',
  availableFrom: new Date('2026-04-01'),
  minimumLeaseTerm: 12,
  createdAt: new Date(),
  isNew: true,
};

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Image placeholder */}
      <View className="w-full h-72 bg-gray-200 items-center justify-center">
        <Text className="text-4xl">🏠</Text>
      </View>

      <View className="px-5 pt-5 pb-8">
        {/* Title + Price */}
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          {MOCK.title}
        </Text>
        <Text className="text-base mt-1" style={{ color: colors.textSecondary }}>
          {MOCK.address}, {MOCK.city}
        </Text>
        <Text className="text-2xl font-bold mt-3" style={{ color: colors.primary }}>
          {formatCurrency(MOCK.pricePerTerm[12])}/mo
        </Text>

        {/* Quick Stats */}
        <View className="flex-row mt-5 gap-4">
          {[
            { label: 'Beds', value: String(MOCK.bedrooms) },
            { label: 'Baths', value: String(MOCK.bathrooms) },
            { label: 'Sqft', value: MOCK.squareFootage ? String(MOCK.squareFootage) : '—' },
            { label: 'Type', value: MOCK.type.charAt(0).toUpperCase() + MOCK.type.slice(1) },
          ].map((stat) => (
            <View key={stat.label} className="flex-1 bg-gray-50 rounded-xl py-3 items-center">
              <Text className="font-semibold text-base" style={{ color: colors.text }}>
                {stat.value}
              </Text>
              <Text className="text-xs mt-0.5" style={{ color: colors.textMuted }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <Text className="text-lg font-semibold mt-6 mb-2" style={{ color: colors.text }}>
          About this place
        </Text>
        <Text className="text-[15px] leading-6" style={{ color: colors.textSecondary }}>
          {MOCK.description}
        </Text>

        {/* Features */}
        <View className="flex-row flex-wrap mt-5 gap-2">
          {[
            ...(MOCK.utilitiesIncluded ? ['Utilities Included'] : []),
            ...(MOCK.parkingIncluded ? ['Parking'] : []),
            ...(MOCK.petFriendly ? ['Pet Friendly'] : []),
            ...(MOCK.furnished ? ['Furnished'] : []),
            ...MOCK.amenities,
          ].map((f) => (
            <View key={f} className="bg-blue-50 px-3 py-1.5 rounded-full">
              <Text className="text-sm font-medium" style={{ color: colors.primary }}>
                {f}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View className="mt-8 gap-3">
          <Pressable
            className="py-3.5 rounded-2xl items-center"
            style={{ backgroundColor: colors.primary }}
            onPress={() => router.push('/listing/apply')}
          >
            <Text className="text-white font-semibold text-base">Apply Now</Text>
          </Pressable>
          <Pressable
            className="py-3.5 rounded-2xl items-center border"
            style={{ borderColor: colors.primary }}
          >
            <Text className="font-semibold text-base" style={{ color: colors.primary }}>
              Message Landlord
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
