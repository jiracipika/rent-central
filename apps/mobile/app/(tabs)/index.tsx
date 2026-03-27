import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ListingCard } from '@/components/ListingCard';
import { colors, shadow, radius } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';
import type { Property } from '@rent-central/core';

const FEATURED: Property[] = [
  {
    id: '1', landlordId: 'l1', title: 'Modern Downtown Loft',
    description: 'Stunning 2BR with floor-to-ceiling windows and skyline views.',
    type: 'apartment', status: 'active', address: '123 King St W', city: 'Toronto',
    province: 'ON', postalCode: 'M5H 1A1', lat: 43.6487, lng: -79.3854,
    bedrooms: 2, bathrooms: 1, squareFootage: 850,
    pricePerTerm: { 3: 2760, 6: 2640, 12: 2400 }, deposit: 2400,
    utilitiesIncluded: true, parkingIncluded: false, petFriendly: true,
    furnished: false, amenities: ['Gym', 'Rooftop', 'Concierge'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'),
    minimumLeaseTerm: 12, createdAt: new Date(), isNew: true,
  },
  {
    id: '2', landlordId: 'l2', title: 'Cozy Plateau Studio',
    description: 'Charming studio in vibrant Le Plateau. Utilities included.',
    type: 'studio', status: 'active', address: '456 St-Denis', city: 'Montréal',
    province: 'QC', postalCode: 'H2J 2W5', lat: 45.5225, lng: -73.5848,
    bedrooms: 0, bathrooms: 1, squareFootage: 480,
    pricePerTerm: { 3: 1955, 6: 1870, 12: 1700 }, deposit: 1700,
    utilitiesIncluded: true, parkingIncluded: false, petFriendly: false,
    furnished: true, amenities: ['Laundry'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-05-01'),
    minimumLeaseTerm: 6, createdAt: new Date(), isNew: true,
  },
  {
    id: '3', landlordId: 'l3', title: 'Yaletown Condo w/ Views',
    description: 'Bright 1BR in the heart of Yaletown. Pool access included.',
    type: 'condo', status: 'active', address: '101 Homer St', city: 'Vancouver',
    province: 'BC', postalCode: 'V6B 2W9', lat: 49.2799, lng: -123.1244,
    bedrooms: 1, bathrooms: 1, squareFootage: 620,
    pricePerTerm: { 3: 3450, 6: 3300, 12: 3000 }, deposit: 3000,
    utilitiesIncluded: true, parkingIncluded: true, petFriendly: false,
    furnished: true, amenities: ['Pool', 'Gym', 'Parking'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-04-15'),
    minimumLeaseTerm: 6, createdAt: new Date(), isNew: false,
  },
  {
    id: '4', landlordId: 'l4', title: 'Spacious Family Home',
    description: '3-bed house with large yard and double garage in quiet neighbourhood.',
    type: 'house', status: 'active', address: '789 Oak Ave', city: 'Calgary',
    province: 'AB', postalCode: 'T2E 1A1', lat: 51.0534, lng: -114.0626,
    bedrooms: 3, bathrooms: 2, squareFootage: 1800,
    pricePerTerm: { 3: 3680, 6: 3520, 12: 3200 }, deposit: 3200,
    utilitiesIncluded: false, parkingIncluded: true, petFriendly: true,
    furnished: false, amenities: ['Garage', 'Yard', 'Laundry'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-06-01'),
    minimumLeaseTerm: 12, createdAt: new Date(), isNew: false,
  },
];

const NEARBY: Property[] = [
  {
    id: '5', landlordId: 'l5', title: 'Bridgeland Basement Suite',
    description: 'Affordable and cozy with private entrance.',
    type: 'basement', status: 'active', address: '222 1 St NE', city: 'Calgary',
    province: 'AB', postalCode: 'T2E 1A1', lat: 51.0534, lng: -114.0626,
    bedrooms: 1, bathrooms: 1, squareFootage: 550,
    pricePerTerm: { 3: 1495, 6: 1430, 12: 1300 }, deposit: 1300,
    utilitiesIncluded: true, parkingIncluded: false, petFriendly: true,
    furnished: false, amenities: ['Laundry'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'),
    minimumLeaseTerm: 3, createdAt: new Date(), isNew: true,
  },
  {
    id: '6', landlordId: 'l6', title: 'Annex Victorian Townhouse',
    description: 'Beautiful 2-storey with exposed brick and private patio.',
    type: 'townhouse', status: 'active', address: '88 Harbord St', city: 'Toronto',
    province: 'ON', postalCode: 'M5S 1G6', lat: 43.6614, lng: -79.4037,
    bedrooms: 2, bathrooms: 2, squareFootage: 1100,
    pricePerTerm: { 3: 3220, 6: 3080, 12: 2800 }, deposit: 2800,
    utilitiesIncluded: false, parkingIncluded: false, petFriendly: true,
    furnished: false, amenities: ['Patio', 'Laundry'],
    photos: [], coverPhoto: '', availableFrom: new Date('2026-05-01'),
    minimumLeaseTerm: 12, createdAt: new Date(), isNew: false,
  },
];

const CITIES = [
  { name: 'Toronto', emoji: '🏙️' },
  { name: 'Vancouver', emoji: '🌊' },
  { name: 'Montréal', emoji: '🍁' },
  { name: 'Calgary', emoji: '🏔️' },
  { name: 'Ottawa', emoji: '🍂' },
  { name: 'Halifax', emoji: '⛵' },
];

function PropertyGradient({ type }: { type: string }) {
  const gradients: Record<string, string> = {
    apartment: '#3B82F6', condo: '#8B5CF6', house: '#10B981',
    studio: '#F59E0B', basement: '#6B7280', townhouse: '#EF4444',
  };
  const color = gradients[type] ?? '#3B82F6';
  return (
    <View style={{ flex: 1, backgroundColor: color + '20', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 40, opacity: 0.6 }}>
        {type === 'house' ? '🏡' : type === 'condo' ? '🏢' : type === 'studio' ? '🏠' : type === 'basement' ? '🏗️' : type === 'townhouse' ? '🏘️' : '🏠'}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text, letterSpacing: -0.5 }}>
            Rent Central
          </Text>
          <Text style={{ fontSize: 15, color: colors.textMuted, marginTop: 2 }}>
            Find your perfect home in Canada
          </Text>
        </View>

        {/* Search bar */}
        <Pressable
          style={{ marginHorizontal: 20, marginBottom: 20 }}
          onPress={() => router.push('/(tabs)/search')}
        >
          <View style={{
            flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
            borderRadius: radius.xl, paddingHorizontal: 14, paddingVertical: 12,
            ...shadow.sm,
          }}>
            <Text style={{ fontSize: 16, marginRight: 8, color: colors.textMuted }}>🔍</Text>
            <Text style={{ flex: 1, fontSize: 15, color: colors.textPlaceholder }}>
              City, postal code, address…
            </Text>
          </View>
        </Pressable>

        {/* City pills */}
        <View style={{ marginBottom: 24 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          >
            {CITIES.map((city) => (
              <Pressable
                key={city.name}
                onPress={() => router.push('/(tabs)/search')}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 5,
                  backgroundColor: colors.card, borderRadius: radius.full,
                  paddingHorizontal: 14, paddingVertical: 8,
                  ...shadow.sm,
                }}
              >
                <Text style={{ fontSize: 14 }}>{city.emoji}</Text>
                <Text style={{ fontSize: 13, fontWeight: '500', color: colors.text }}>{city.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Featured section */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            paddingHorizontal: 20, marginBottom: 14,
          }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, letterSpacing: -0.3 }}>
              Featured
            </Text>
            <Pressable onPress={() => router.push('/(tabs)/search')}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>See all</Text>
            </Pressable>
          </View>
          <FlatList
            data={FEATURED}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/listing/${item.id}`)}
                style={{
                  width: 280, backgroundColor: colors.card, borderRadius: radius.xl,
                  overflow: 'hidden', ...shadow.md,
                }}
              >
                <View style={{ height: 160 }}>
                  <PropertyGradient type={item.type} />
                  {item.isNew && (
                    <View style={{
                      position: 'absolute', top: 12, left: 12,
                      backgroundColor: colors.success,
                      borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4,
                    }}>
                      <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>New</Text>
                    </View>
                  )}
                  <Pressable style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 14 }}>♡</Text>
                  </Pressable>
                </View>
                <View style={{ padding: 14 }}>
                  <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>
                    {formatCurrency(item.pricePerTerm[12])}
                    <Text style={{ fontSize: 12, fontWeight: '400', color: colors.textMuted }}>/mo</Text>
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 2 }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
                    {item.address}, {item.city}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 10 }}>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>
                      🛏 {item.bedrooms === 0 ? 'Studio' : `${item.bedrooms} bd`}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>
                      🚿 {item.bathrooms} ba
                    </Text>
                    {item.squareFootage && (
                      <Text style={{ fontSize: 12, color: colors.textMuted }}>
                        📐 {item.squareFootage} sqft
                      </Text>
                    )}
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* Nearby section */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 14,
          }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, letterSpacing: -0.3 }}>
              Near You
            </Text>
            <Pressable onPress={() => router.push('/(tabs)/search')}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>See all</Text>
            </Pressable>
          </View>
          {NEARBY.map((listing) => (
            <Pressable
              key={listing.id}
              onPress={() => router.push(`/listing/${listing.id}`)}
              style={{ marginBottom: 14 }}
            >
              <ListingCard listing={listing} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
