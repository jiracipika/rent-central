import { useState } from 'react';
import { View, Text, FlatList, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBadge } from '@/components/StatusBadge';
import { colors, radius, shadow } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';
import type { Property, ListingStatus } from '@rent-central/core';

const MOCK: (Property & { applications: number; views: number })[] = [
  {
    id: '1', landlordId: 'l1', title: 'Bright 2BR Downtown Loft', description: '',
    type: 'apartment', status: 'active', address: '123 King St W', city: 'Toronto',
    province: 'ON', postalCode: 'M5H 1A1', lat: 43.648, lng: -79.385,
    bedrooms: 2, bathrooms: 1, squareFootage: 850,
    pricePerTerm: { 3: 2760, 6: 2640, 12: 2400 }, deposit: 2400,
    utilitiesIncluded: true, parkingIncluded: false, petFriendly: true,
    furnished: false, amenities: ['Gym', 'Rooftop'], photos: [], coverPhoto: '',
    availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: false,
    applications: 5, views: 124,
  },
  {
    id: '2', landlordId: 'l1', title: 'Cozy Queen West Studio', description: '',
    type: 'studio', status: 'active', address: '456 Queen St W', city: 'Toronto',
    province: 'ON', postalCode: 'M5V 2B3', lat: 43.645, lng: -79.415,
    bedrooms: 0, bathrooms: 1, squareFootage: 400,
    pricePerTerm: { 3: 1840, 6: 1760, 12: 1600 }, deposit: 1600,
    utilitiesIncluded: false, parkingIncluded: false, petFriendly: false,
    furnished: true, amenities: ['Laundry'], photos: [], coverPhoto: '',
    availableFrom: new Date('2026-05-01'), minimumLeaseTerm: 6, createdAt: new Date(), isNew: true,
    applications: 2, views: 67,
  },
  {
    id: '3', landlordId: 'l1', title: 'Roncesvalles Family Home', description: '',
    type: 'house', status: 'rented', address: '789 Roncesvalles Ave', city: 'Toronto',
    province: 'ON', postalCode: 'M6R 2L8', lat: 43.647, lng: -79.45,
    bedrooms: 3, bathrooms: 2, squareFootage: 1600,
    pricePerTerm: { 3: 4025, 6: 3850, 12: 3500 }, deposit: 3500,
    utilitiesIncluded: false, parkingIncluded: true, petFriendly: true,
    furnished: false, amenities: ['Garage', 'Yard'], photos: [], coverPhoto: '',
    availableFrom: new Date('2026-08-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: false,
    applications: 11, views: 302,
  },
  {
    id: '4', landlordId: 'l1', title: 'Liberty Village 1BR', description: '',
    type: 'apartment', status: 'paused', address: '12 East Liberty St', city: 'Toronto',
    province: 'ON', postalCode: 'M6K 3E7', lat: 43.638, lng: -79.419,
    bedrooms: 1, bathrooms: 1, squareFootage: 600,
    pricePerTerm: { 3: 2415, 6: 2310, 12: 2100 }, deposit: 2100,
    utilitiesIncluded: true, parkingIncluded: false, petFriendly: false,
    furnished: false, amenities: ['Gym', 'Concierge'], photos: [], coverPhoto: '',
    availableFrom: new Date('2026-07-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: false,
    applications: 0, views: 45,
  },
];

const STATUS_FILTERS: { label: string; value: ListingStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Rented', value: 'rented' },
  { label: 'Draft', value: 'draft' },
];

const TYPE_ICON: Record<string, string> = {
  apartment: '🏠', condo: '🏢', house: '🏡', studio: '🏠', basement: '🏗️', townhouse: '🏘️',
};

export default function LandlordListingsScreen() {
  const [filter, setFilter] = useState<ListingStatus | 'all'>('all');

  const listings = filter === 'all' ? MOCK : MOCK.filter((l) => l.status === filter);

  const totalRevenue = MOCK
    .filter((l) => l.status === 'active' || l.status === 'rented')
    .reduce((sum, l) => sum + l.pricePerTerm[12], 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      {/* Header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
      }}>
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 32, height: 32, borderRadius: 16,
            backgroundColor: colors.fillTertiary,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color: colors.primary }}>‹</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, letterSpacing: -0.4 }}>
            My Listings
          </Text>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>
            {formatCurrency(totalRevenue)}/mo total revenue
          </Text>
        </View>
      </View>

      {/* Filter chips */}
      <View style={{ paddingBottom: 10 }}>
        <FlatList
          data={STATUS_FILTERS}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setFilter(item.value)}
              style={{
                paddingHorizontal: 14, paddingVertical: 7,
                borderRadius: radius.full,
                backgroundColor: filter === item.value ? colors.primary : colors.card,
                ...shadow.sm,
              }}
            >
              <Text style={{
                fontSize: 13, fontWeight: '500',
                color: filter === item.value ? '#fff' : colors.text,
              }}>
                {item.label}
                {item.value !== 'all' && (
                  ' ' + MOCK.filter((l) => l.status === item.value).length
                )}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {listings.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
          <Text style={{ fontSize: 44 }}>🏘️</Text>
          <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text, marginTop: 12 }}>No listings</Text>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
            No {filter === 'all' ? '' : filter + ' '}listings found
          </Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, gap: 12 }}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: colors.card, borderRadius: radius.xl,
                overflow: 'hidden', ...shadow.sm,
                opacity: pressed ? 0.95 : 1,
              })}
            >
              {/* Color bar based on type */}
              <View style={{ height: 4, backgroundColor: item.status === 'rented' ? '#6B7280' : item.status === 'paused' ? '#F59E0B' : colors.primary }} />

              <View style={{ padding: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                  <View style={{
                    width: 44, height: 44, borderRadius: radius.md,
                    backgroundColor: colors.fillTertiary,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 22 }}>{TYPE_ICON[item.type] ?? '🏠'}</Text>
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{
                        fontSize: 15, fontWeight: '600', color: colors.text, flex: 1, marginRight: 8,
                      }} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <StatusBadge status={item.status} />
                    </View>
                    <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
                      {item.address}, {item.city}
                    </Text>
                  </View>
                </View>

                {/* Stats row */}
                <View style={{
                  flexDirection: 'row', marginTop: 14, paddingTop: 12,
                  borderTopWidth: 0.5, borderTopColor: colors.separator, gap: 0,
                }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>
                      {formatCurrency(item.pricePerTerm[12])}
                    </Text>
                    <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>per month</Text>
                  </View>
                  <View style={{ width: 0.5, backgroundColor: colors.separator }} />
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: item.applications > 0 ? colors.primary : colors.text }}>
                      {item.applications}
                    </Text>
                    <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>applications</Text>
                  </View>
                  <View style={{ width: 0.5, backgroundColor: colors.separator }} />
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{item.views}</Text>
                    <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>views</Text>
                  </View>
                </View>

                {/* Action row */}
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                  <Pressable style={{
                    flex: 1, paddingVertical: 8, borderRadius: radius.lg,
                    backgroundColor: colors.fillTertiary, alignItems: 'center',
                  }}>
                    <Text style={{ fontSize: 13, fontWeight: '500', color: colors.text }}>Edit</Text>
                  </Pressable>
                  <Pressable style={{
                    flex: 1, paddingVertical: 8, borderRadius: radius.lg,
                    backgroundColor: colors.fillTertiary, alignItems: 'center',
                  }}>
                    <Text style={{ fontSize: 13, fontWeight: '500', color: colors.text }}>Applications</Text>
                  </Pressable>
                  {item.status === 'active' ? (
                    <Pressable style={{
                      flex: 1, paddingVertical: 8, borderRadius: radius.lg,
                      backgroundColor: colors.warningLight, alignItems: 'center',
                    }}>
                      <Text style={{ fontSize: 13, fontWeight: '500', color: colors.warning }}>Pause</Text>
                    </Pressable>
                  ) : item.status === 'paused' ? (
                    <Pressable style={{
                      flex: 1, paddingVertical: 8, borderRadius: radius.lg,
                      backgroundColor: colors.successLight, alignItems: 'center',
                    }}>
                      <Text style={{ fontSize: 13, fontWeight: '500', color: colors.success }}>Activate</Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>
            </Pressable>
          )}
        />
      )}

      {/* FAB */}
      <Pressable
        onPress={() => router.push('/landlord/create-listing')}
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 32 : 20,
          right: 20,
          width: 56, height: 56, borderRadius: 28,
          backgroundColor: colors.primary,
          alignItems: 'center', justifyContent: 'center',
          ...shadow.lg,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 26, lineHeight: 28, marginTop: -1 }}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}
