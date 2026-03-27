import { useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';
import type { Property } from '@rent-central/core';

const MOCK_LISTINGS: Record<string, Property> = {
  '1': { id: '1', landlordId: 'l1', title: 'Modern Downtown Loft', description: 'Stunning 2-bedroom apartment with floor-to-ceiling windows showcasing the Toronto skyline. Features modern finishes throughout, in-unit laundry, and access to premium building amenities. Steps from TTC subway, top restaurants, and entertainment districts.\n\nAvailable for 6 or 12-month lease. No smoking. References required.', type: 'apartment', status: 'active', address: '123 King St W', city: 'Toronto', province: 'ON', postalCode: 'M5H 1A1', lat: 43.6487, lng: -79.3854, bedrooms: 2, bathrooms: 1, squareFootage: 850, pricePerTerm: { 3: 2760, 6: 2640, 12: 2400 }, deposit: 2400, utilitiesIncluded: true, parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Gym', 'Rooftop Terrace', 'In-unit Laundry', 'Concierge', 'Bike Storage'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: true },
  '2': { id: '2', landlordId: 'l2', title: 'Cozy Plateau Studio', description: 'Charming studio in the heart of vibrant Le Plateau-Mont-Royal. Fully furnished with vintage touches and modern appliances. All utilities included — just move in and enjoy the neighbourhood.\n\nClose to Parc La Fontaine, great cafés, and restaurants. Cat-friendly building.', type: 'studio', status: 'active', address: '456 St-Denis', city: 'Montréal', province: 'QC', postalCode: 'H2J 2W5', lat: 45.5225, lng: -73.5848, bedrooms: 0, bathrooms: 1, squareFootage: 480, pricePerTerm: { 3: 1955, 6: 1870, 12: 1700 }, deposit: 1700, utilitiesIncluded: true, parkingIncluded: false, petFriendly: false, furnished: true, amenities: ['Laundry in Building', 'Balcony'], photos: [], coverPhoto: '', availableFrom: new Date('2026-05-01'), minimumLeaseTerm: 6, createdAt: new Date(), isNew: true },
  '5': { id: '5', landlordId: 'l5', title: 'Bridgeland Basement Suite', description: 'Affordable and cozy basement suite with private entrance and fenced backyard access. Ideal for a professional or couple. Heat and water included.\n\nWalking distance to restaurants, shops, and Bow River pathways.', type: 'basement', status: 'active', address: '222 1 St NE', city: 'Calgary', province: 'AB', postalCode: 'T2E 1A1', lat: 51.0534, lng: -114.0626, bedrooms: 1, bathrooms: 1, squareFootage: 550, pricePerTerm: { 3: 1495, 6: 1430, 12: 1300 }, deposit: 1300, utilitiesIncluded: true, parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Shared Laundry', 'Yard Access'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 3, createdAt: new Date(), isNew: true },
  '6': { id: '6', landlordId: 'l6', title: 'Annex Victorian Townhouse', description: 'Beautifully preserved Victorian townhouse in the heart of The Annex. Features exposed brick, hardwood floors, and a private patio. Two full floors of living space.\n\nClose to Spadina Station and U of T campus. Perfect for professionals.', type: 'townhouse', status: 'active', address: '88 Harbord St', city: 'Toronto', province: 'ON', postalCode: 'M5S 1G6', lat: 43.6614, lng: -79.4037, bedrooms: 2, bathrooms: 2, squareFootage: 1100, pricePerTerm: { 3: 3220, 6: 3080, 12: 2800 }, deposit: 2800, utilitiesIncluded: false, parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Private Patio', 'In-unit Laundry', 'Hardwood Floors'], photos: [], coverPhoto: '', availableFrom: new Date('2026-05-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: false },
};

const TYPE_BG: Record<string, string> = {
  apartment: '#EFF6FF', condo: '#F5F3FF', house: '#ECFDF5',
  studio: '#FFFBEB', basement: '#F3F4F6', townhouse: '#FFF1F2',
};
const TYPE_EMOJI: Record<string, string> = {
  apartment: '🏠', condo: '🏢', house: '🏡',
  studio: '🏠', basement: '🏗️', townhouse: '🏘️',
};

const LANDLORDS: Record<string, { name: string; initials: string; responseRate: string; joined: string }> = {
  l1: { name: 'Sarah Chen', initials: 'SC', responseRate: '95%', joined: '2023' },
  l2: { name: 'Marc Tremblay', initials: 'MT', responseRate: '88%', joined: '2024' },
  l5: { name: 'Lena Kowalski', initials: 'LK', responseRate: '100%', joined: '2022' },
  l6: { name: 'James Park', initials: 'JP', responseRate: '92%', joined: '2023' },
};

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedTerm, setSelectedTerm] = useState<3 | 6 | 12>(12);
  const [saved, setSaved] = useState(false);

  const listing = MOCK_LISTINGS[id ?? '1'] ?? MOCK_LISTINGS['1'];
  const landlord = LANDLORDS[listing.landlordId] ?? LANDLORDS['l1'];
  const price = listing.pricePerTerm[selectedTerm];

  const features = [
    ...(listing.utilitiesIncluded ? ['Utilities Included'] : []),
    ...(listing.parkingIncluded ? ['Parking'] : []),
    ...(listing.petFriendly ? ['Pet Friendly'] : []),
    ...(listing.furnished ? ['Furnished'] : []),
    ...listing.amenities,
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* Hero image */}
        <View style={{
          height: 300, backgroundColor: TYPE_BG[listing.type] ?? '#F3F4F6',
          alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <Text style={{ fontSize: 64, opacity: 0.6 }}>
            {TYPE_EMOJI[listing.type] ?? '🏠'}
          </Text>

          {/* Back button */}
          <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: Platform.OS === 'ios' ? 0 : 8 }}>
              <Pressable
                onPress={() => router.back()}
                style={{
                  width: 36, height: 36, borderRadius: 18,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  alignItems: 'center', justifyContent: 'center',
                  ...shadow.sm,
                }}
              >
                <Text style={{ fontSize: 18, marginLeft: -1 }}>‹</Text>
              </Pressable>
              <Pressable
                onPress={() => setSaved(!saved)}
                style={{
                  width: 36, height: 36, borderRadius: 18,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  alignItems: 'center', justifyContent: 'center',
                  ...shadow.sm,
                }}
              >
                <Text style={{ fontSize: 16, color: saved ? '#EF4444' : '#9CA3AF' }}>
                  {saved ? '♥' : '♡'}
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>

          {listing.isNew && (
            <View style={{
              position: 'absolute', bottom: 16, left: 16,
              backgroundColor: colors.success,
              borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4,
            }}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>New Listing</Text>
            </View>
          )}
        </View>

        <View style={{ padding: 20 }}>
          {/* Title & address */}
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text, letterSpacing: -0.4 }}>
            {listing.title}
          </Text>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
            📍 {listing.address}, {listing.city}, {listing.province}
          </Text>

          {/* Term selector */}
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
            {([3, 6, 12] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setSelectedTerm(t)}
                style={{
                  flex: 1, paddingVertical: 10, borderRadius: radius.lg,
                  backgroundColor: selectedTerm === t ? colors.primary : colors.fill,
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontSize: 13, fontWeight: '600',
                  color: selectedTerm === t ? '#fff' : colors.textSecondary,
                }}>
                  {t} mo
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={{ fontSize: 28, fontWeight: '800', color: colors.primary, marginTop: 12 }}>
            {formatCurrency(price)}
            <Text style={{ fontSize: 16, fontWeight: '400', color: colors.textMuted }}>/mo</Text>
          </Text>
          <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
            + {formatCurrency(listing.deposit)} deposit
          </Text>

          {/* Quick stats */}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
            {[
              { label: 'Beds', value: listing.bedrooms === 0 ? 'Studio' : String(listing.bedrooms) },
              { label: 'Baths', value: String(listing.bathrooms) },
              { label: 'Sqft', value: listing.squareFootage ? String(listing.squareFootage) : '—' },
              { label: 'Type', value: listing.type.charAt(0).toUpperCase() + listing.type.slice(1) },
            ].map((stat) => (
              <View key={stat.label} style={{
                flex: 1, backgroundColor: colors.fillTertiary, borderRadius: radius.lg,
                paddingVertical: 12, alignItems: 'center',
              }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{stat.value}</Text>
                <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 24, marginBottom: 8 }}>
            About this place
          </Text>
          <Text style={{ fontSize: 15, lineHeight: 24, color: colors.textSecondary }}>
            {listing.description}
          </Text>

          {/* Features */}
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 24, marginBottom: 12 }}>
            Features & Amenities
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {features.map((f) => (
              <View key={f} style={{
                backgroundColor: colors.primaryLight, borderRadius: radius.full,
                paddingHorizontal: 12, paddingVertical: 6,
              }}>
                <Text style={{ fontSize: 13, fontWeight: '500', color: colors.primary }}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Available date */}
          <View style={{
            flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20,
            padding: 14, backgroundColor: colors.accentLight, borderRadius: radius.lg,
          }}>
            <Text style={{ fontSize: 18 }}>📅</Text>
            <View>
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.accent }}>
                Available from
              </Text>
              <Text style={{ fontSize: 14, color: colors.text, marginTop: 2 }}>
                {listing.availableFrom.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </View>
          </View>

          {/* Landlord card */}
          <View style={{
            flexDirection: 'row', alignItems: 'center', gap: 12,
            marginTop: 24, padding: 16, backgroundColor: colors.fillTertiary,
            borderRadius: radius.xl,
          }}>
            <View style={{
              width: 48, height: 48, borderRadius: 24,
              backgroundColor: colors.primary + '20',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.primary }}>{landlord.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{landlord.name}</Text>
              <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
                {landlord.responseRate} response rate · Landlord since {landlord.joined}
              </Text>
            </View>
            <Text style={{ fontSize: 22, color: colors.textMuted }}>›</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.08)',
        paddingHorizontal: 20, paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 32 : 16,
      }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Pressable
            style={{
              flex: 1, paddingVertical: 14, borderRadius: radius.xl,
              backgroundColor: colors.primary, alignItems: 'center',
            }}
            onPress={() => router.push('/listing/apply')}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Apply Now</Text>
          </Pressable>
          <Pressable
            style={{
              paddingHorizontal: 16, paddingVertical: 14, borderRadius: radius.xl,
              borderWidth: 1.5, borderColor: colors.primary, alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.primary }}>💬</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
