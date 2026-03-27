import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ListingCard } from '@/components/ListingCard';
import { colors } from '@/lib/theme';
import type { Property } from '@rent-central/core';

const MOCK_LISTINGS: Property[] = [
  {
    id: '1',
    landlordId: 'l1',
    title: 'Bright 2BR Downtown',
    description: 'Gorgeous 2 bedroom with skyline views.',
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
    pricePerTerm: { 3: 2400, 6: 2300, 12: 2200 },
    deposit: 2200,
    utilitiesIncluded: true,
    parkingIncluded: false,
    petFriendly: true,
    furnished: false,
    amenities: ['Gym', 'Rooftop'],
    photos: [],
    coverPhoto: '',
    availableFrom: new Date('2026-04-01'),
    minimumLeaseTerm: 12,
    createdAt: new Date(),
    isNew: true,
  },
  {
    id: '2',
    landlordId: 'l2',
    title: 'Cozy Basement Suite',
    description: 'Private entrance, utilities included.',
    type: 'basement',
    status: 'active',
    address: '456 Bloor St',
    city: 'Toronto',
    province: 'ON',
    postalCode: 'M4W 1L2',
    lat: 43.6700,
    lng: -79.3900,
    bedrooms: 1,
    bathrooms: 1,
    pricePerTerm: { 3: 1500, 6: 1400, 12: 1300 },
    deposit: 1300,
    utilitiesIncluded: true,
    parkingIncluded: true,
    petFriendly: false,
    furnished: true,
    amenities: ['Laundry'],
    photos: [],
    coverPhoto: '',
    availableFrom: new Date('2026-04-15'),
    minimumLeaseTerm: 6,
    createdAt: new Date(),
    isNew: false,
  },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA]">
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          Rent Central
        </Text>
        <Text className="text-sm mt-0.5" style={{ color: colors.textSecondary }}>
          Find your next home
        </Text>
      </View>

      {/* Featured */}
      <View className="px-5 mb-3">
        <Text className="text-lg font-semibold" style={{ color: colors.text }}>
          Featured
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {MOCK_LISTINGS.map((listing) => (
          <Pressable
            key={listing.id}
            onPress={() => router.push(`/listing/${listing.id}`)}
            className="mb-4"
          >
            <ListingCard listing={listing} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
