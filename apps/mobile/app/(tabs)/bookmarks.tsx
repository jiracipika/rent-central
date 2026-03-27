import { useState } from 'react';
import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ListingCard } from '@/components/ListingCard';
import { colors, radius } from '@/lib/theme';
import type { Property } from '@rent-central/core';

const SAVED: Property[] = [
  { id: '1', landlordId: 'l1', title: 'Modern Downtown Loft', description: 'Stunning 2BR with skyline views.', type: 'apartment', status: 'active', address: '123 King St W', city: 'Toronto', province: 'ON', postalCode: 'M5H 1A1', lat: 43.6487, lng: -79.3854, bedrooms: 2, bathrooms: 1, squareFootage: 850, pricePerTerm: { 3: 2760, 6: 2640, 12: 2400 }, deposit: 2400, utilitiesIncluded: true, parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Gym', 'Rooftop'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: true },
  { id: '3', landlordId: 'l3', title: 'Yaletown Condo w/ Views', description: 'Bright 1BR in the heart of Yaletown.', type: 'condo', status: 'active', address: '101 Homer St', city: 'Vancouver', province: 'BC', postalCode: 'V6B 2W9', lat: 49.2799, lng: -123.1244, bedrooms: 1, bathrooms: 1, squareFootage: 620, pricePerTerm: { 3: 3450, 6: 3300, 12: 3000 }, deposit: 3000, utilitiesIncluded: true, parkingIncluded: true, petFriendly: false, furnished: true, amenities: ['Pool', 'Gym'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-15'), minimumLeaseTerm: 6, createdAt: new Date(), isNew: false },
  { id: '7', landlordId: 'l7', title: 'Liberty Village Studio', description: 'Stylish studio in trendy Liberty Village.', type: 'studio', status: 'active', address: '55 East Liberty St', city: 'Toronto', province: 'ON', postalCode: 'M6K 3P3', lat: 43.6374, lng: -79.4186, bedrooms: 0, bathrooms: 1, squareFootage: 420, pricePerTerm: { 3: 2185, 6: 2090, 12: 1900 }, deposit: 1900, utilitiesIncluded: true, parkingIncluded: false, petFriendly: false, furnished: true, amenities: ['Gym'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 6, createdAt: new Date(), isNew: true },
];

export default function BookmarksScreen() {
  const [saved, setSaved] = useState<Property[]>(SAVED);

  const removeBookmark = (id: string) =>
    setSaved((prev) => prev.filter((l) => l.id !== id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text, letterSpacing: -0.5 }}>
          Saved
        </Text>
        <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 2 }}>
          {saved.length} {saved.length === 1 ? 'listing' : 'listings'} saved
        </Text>
      </View>

      {saved.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 100 }}>
          <Text style={{ fontSize: 52 }}>🏠</Text>
          <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 16 }}>
            No saved listings yet
          </Text>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 6, textAlign: 'center', paddingHorizontal: 40 }}>
            Tap the heart on any listing to save it here
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)/search')}
            style={{
              marginTop: 24, paddingHorizontal: 24, paddingVertical: 12,
              backgroundColor: colors.primary, borderRadius: radius.full,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>Browse Listings</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 14 }}
          renderItem={({ item }) => (
            <View>
              <Pressable onPress={() => router.push(`/listing/${item.id}`)}>
                <ListingCard listing={item} />
              </Pressable>
              <Pressable
                onPress={() => removeBookmark(item.id)}
                style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 30, height: 30, borderRadius: 15,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 13, color: '#EF4444' }}>♥</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
