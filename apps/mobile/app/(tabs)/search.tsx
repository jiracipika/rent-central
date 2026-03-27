import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { SearchBar } from '@/components/SearchBar';
import { ListingCard } from '@/components/ListingCard';
import { colors } from '@/lib/theme';
import type { Property } from '@rent-central/core';

const MOCK: Property[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 10),
  landlordId: 'l1',
  title: `Property ${i + 1}`,
  description: 'Nice place.',
  type: 'apartment' as const,
  status: 'active' as const,
  address: `${100 + i} Main St`,
  city: 'Toronto',
  province: 'ON',
  postalCode: 'M5V 1A1',
  lat: 43.63,
  lng: -79.4,
  bedrooms: i % 3 + 1,
  bathrooms: 1,
  pricePerTerm: { 3: 1800 + i * 200, 6: 1700 + i * 200, 12: 1600 + i * 200 },
  deposit: 1600,
  utilitiesIncluded: false,
  parkingIncluded: i % 2 === 0,
  petFriendly: i % 2 !== 0,
  furnished: false,
  amenities: [],
  photos: [],
  coverPhoto: '',
  availableFrom: new Date('2026-04-01'),
  minimumLeaseTerm: 12 as const,
  createdAt: new Date(),
  isNew: i < 2,
}));

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          Search
        </Text>
      </View>
      <View className="px-5 mb-4">
        <SearchBar value={query} onChange={setQuery} />
      </View>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {MOCK.map((listing) => (
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
