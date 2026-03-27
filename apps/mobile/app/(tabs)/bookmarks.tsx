import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ListingCard } from '@/components/ListingCard';
import { colors } from '@/lib/theme';
import type { Property } from '@rent-central/core';

const MOCK: Property[] = [
  {
    id: '1',
    landlordId: 'l1',
    title: 'Bright 2BR Downtown',
    description: 'Gorgeous.',
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
    amenities: ['Gym'],
    photos: [],
    coverPhoto: '',
    availableFrom: new Date('2026-04-01'),
    minimumLeaseTerm: 12,
    createdAt: new Date(),
    isNew: true,
  },
];

export default function BookmarksScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          Saved
        </Text>
      </View>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {MOCK.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Text style={{ color: colors.textMuted }}>No saved listings yet</Text>
          </View>
        ) : (
          MOCK.map((listing) => (
            <Pressable
              key={listing.id}
              onPress={() => router.push(`/listing/${listing.id}`)}
              className="mb-4"
            >
              <ListingCard listing={listing} />
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
