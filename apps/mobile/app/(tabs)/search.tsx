import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ListingCard } from '@/components/ListingCard';
import { colors, radius, shadow } from '@/lib/theme';
import type { Property, PropertyType } from '@rent-central/core';

const ALL_LISTINGS: Property[] = [
  { id: '1', landlordId: 'l1', title: 'Modern Downtown Loft', description: 'Stunning 2BR with skyline views.', type: 'apartment', status: 'active', address: '123 King St W', city: 'Toronto', province: 'ON', postalCode: 'M5H 1A1', lat: 43.6487, lng: -79.3854, bedrooms: 2, bathrooms: 1, squareFootage: 850, pricePerTerm: { 3: 2760, 6: 2640, 12: 2400 }, deposit: 2400, utilitiesIncluded: true, parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Gym', 'Rooftop'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: true },
  { id: '2', landlordId: 'l2', title: 'Cozy Plateau Studio', description: 'Charming studio in vibrant Le Plateau.', type: 'studio', status: 'active', address: '456 St-Denis', city: 'Montréal', province: 'QC', postalCode: 'H2J 2W5', lat: 45.5225, lng: -73.5848, bedrooms: 0, bathrooms: 1, squareFootage: 480, pricePerTerm: { 3: 1955, 6: 1870, 12: 1700 }, deposit: 1700, utilitiesIncluded: true, parkingIncluded: false, petFriendly: false, furnished: true, amenities: ['Laundry'], photos: [], coverPhoto: '', availableFrom: new Date('2026-05-01'), minimumLeaseTerm: 6, createdAt: new Date(), isNew: true },
  { id: '3', landlordId: 'l3', title: 'Yaletown Condo w/ Views', description: 'Bright 1BR in the heart of Yaletown.', type: 'condo', status: 'active', address: '101 Homer St', city: 'Vancouver', province: 'BC', postalCode: 'V6B 2W9', lat: 49.2799, lng: -123.1244, bedrooms: 1, bathrooms: 1, squareFootage: 620, pricePerTerm: { 3: 3450, 6: 3300, 12: 3000 }, deposit: 3000, utilitiesIncluded: true, parkingIncluded: true, petFriendly: false, furnished: true, amenities: ['Pool', 'Gym'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-15'), minimumLeaseTerm: 6, createdAt: new Date(), isNew: false },
  { id: '4', landlordId: 'l4', title: 'Spacious Family Home', description: '3-bed house with large yard.', type: 'house', status: 'active', address: '789 Oak Ave', city: 'Calgary', province: 'AB', postalCode: 'T2E 1A1', lat: 51.0534, lng: -114.0626, bedrooms: 3, bathrooms: 2, squareFootage: 1800, pricePerTerm: { 3: 3680, 6: 3520, 12: 3200 }, deposit: 3200, utilitiesIncluded: false, parkingIncluded: true, petFriendly: true, furnished: false, amenities: ['Garage', 'Yard'], photos: [], coverPhoto: '', availableFrom: new Date('2026-06-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: false },
  { id: '5', landlordId: 'l5', title: 'Bridgeland Basement Suite', description: 'Affordable with private entrance.', type: 'basement', status: 'active', address: '222 1 St NE', city: 'Calgary', province: 'AB', postalCode: 'T2E 1A1', lat: 51.0534, lng: -114.0626, bedrooms: 1, bathrooms: 1, squareFootage: 550, pricePerTerm: { 3: 1495, 6: 1430, 12: 1300 }, deposit: 1300, utilitiesIncluded: true, parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Laundry'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 3, createdAt: new Date(), isNew: true },
  { id: '6', landlordId: 'l6', title: 'Annex Victorian Townhouse', description: 'Beautiful 2-storey with exposed brick.', type: 'townhouse', status: 'active', address: '88 Harbord St', city: 'Toronto', province: 'ON', postalCode: 'M5S 1G6', lat: 43.6614, lng: -79.4037, bedrooms: 2, bathrooms: 2, squareFootage: 1100, pricePerTerm: { 3: 3220, 6: 3080, 12: 2800 }, deposit: 2800, utilitiesIncluded: false, parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Patio'], photos: [], coverPhoto: '', availableFrom: new Date('2026-05-01'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: false },
  { id: '7', landlordId: 'l7', title: 'Liberty Village Studio', description: 'Stylish studio in trendy Liberty Village.', type: 'studio', status: 'active', address: '55 East Liberty St', city: 'Toronto', province: 'ON', postalCode: 'M6K 3P3', lat: 43.6374, lng: -79.4186, bedrooms: 0, bathrooms: 1, squareFootage: 420, pricePerTerm: { 3: 2185, 6: 2090, 12: 1900 }, deposit: 1900, utilitiesIncluded: true, parkingIncluded: false, petFriendly: false, furnished: true, amenities: ['Gym', 'Concierge'], photos: [], coverPhoto: '', availableFrom: new Date('2026-04-01'), minimumLeaseTerm: 6, createdAt: new Date(), isNew: true },
  { id: '8', landlordId: 'l8', title: 'Plateau Duplex Upper', description: 'Bright upper duplex with terrace access.', type: 'apartment', status: 'active', address: '444 Mont-Royal E', city: 'Montréal', province: 'QC', postalCode: 'H2J 1W9', lat: 45.5283, lng: -73.5782, bedrooms: 3, bathrooms: 2, squareFootage: 1400, pricePerTerm: { 3: 2530, 6: 2420, 12: 2200 }, deposit: 2200, utilitiesIncluded: false, parkingIncluded: false, petFriendly: true, furnished: false, amenities: ['Terrace', 'Laundry'], photos: [], coverPhoto: '', availableFrom: new Date('2026-05-15'), minimumLeaseTerm: 12, createdAt: new Date(), isNew: false },
];

const TYPE_FILTERS: { label: string; value: PropertyType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Condo', value: 'condo' },
  { label: 'House', value: 'house' },
  { label: 'Studio', value: 'studio' },
  { label: 'Basement', value: 'basement' },
  { label: 'Townhouse', value: 'townhouse' },
];

const BED_FILTERS = ['Any', '0', '1', '2', '3+'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<PropertyType | 'all'>('all');
  const [bedFilter, setBedFilter] = useState('Any');
  const [petFriendly, setPetFriendly] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let list = ALL_LISTINGS.filter((l) => {
      if (query) {
        const q = query.toLowerCase();
        if (!l.title.toLowerCase().includes(q) && !l.city.toLowerCase().includes(q) && !l.address.toLowerCase().includes(q)) return false;
      }
      if (typeFilter !== 'all' && l.type !== typeFilter) return false;
      if (bedFilter !== 'Any') {
        const n = bedFilter === '3+' ? 3 : parseInt(bedFilter);
        if (bedFilter === '3+' ? l.bedrooms < n : l.bedrooms !== n) return false;
      }
      if (petFriendly && !l.petFriendly) return false;
      return true;
    });
    if (sortBy === 'price_asc') list = list.sort((a, b) => a.pricePerTerm[12] - b.pricePerTerm[12]);
    if (sortBy === 'price_desc') list = list.sort((a, b) => b.pricePerTerm[12] - a.pricePerTerm[12]);
    return list;
  }, [query, typeFilter, bedFilter, petFriendly, sortBy]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      {/* Search input */}
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text, letterSpacing: -0.5, marginBottom: 12 }}>
          Search
        </Text>
        <View style={{
          flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
          borderRadius: radius.xl, paddingHorizontal: 14, paddingVertical: 10,
          ...shadow.sm,
        }}>
          <Text style={{ fontSize: 16, marginRight: 8, color: colors.textMuted }}>🔍</Text>
          <TextInput
            style={{ flex: 1, fontSize: 15, color: colors.text }}
            placeholder="City, postal code, address…"
            placeholderTextColor={colors.textPlaceholder}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      {/* Type filter chips */}
      <View style={{ marginBottom: 8 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
        >
          {TYPE_FILTERS.map((f) => (
            <Pressable
              key={f.value}
              onPress={() => setTypeFilter(f.value)}
              style={{
                paddingHorizontal: 14, paddingVertical: 7,
                borderRadius: radius.full,
                backgroundColor: typeFilter === f.value ? colors.primary : colors.card,
                ...shadow.sm,
              }}
            >
              <Text style={{
                fontSize: 13, fontWeight: '500',
                color: typeFilter === f.value ? '#fff' : colors.text,
              }}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Filter row */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20,
        paddingVertical: 10, gap: 8,
      }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {BED_FILTERS.map((b) => (
              <Pressable
                key={b}
                onPress={() => setBedFilter(b)}
                style={{
                  paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.full,
                  backgroundColor: bedFilter === b ? colors.primaryLight : colors.fill,
                  borderWidth: bedFilter === b ? 1 : 0,
                  borderColor: colors.primary,
                }}
              >
                <Text style={{
                  fontSize: 12, fontWeight: '500',
                  color: bedFilter === b ? colors.primary : colors.textSecondary,
                }}>
                  {b === 'Any' ? 'Any beds' : b === '0' ? 'Studio' : `${b} bd`}
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => setPetFriendly(!petFriendly)}
              style={{
                paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.full,
                backgroundColor: petFriendly ? colors.primaryLight : colors.fill,
                borderWidth: petFriendly ? 1 : 0,
                borderColor: colors.primary,
              }}
            >
              <Text style={{
                fontSize: 12, fontWeight: '500',
                color: petFriendly ? colors.primary : colors.textSecondary,
              }}>
                🐾 Pet OK
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        <Pressable
          onPress={() => setSortBy(sortBy === 'newest' ? 'price_asc' : sortBy === 'price_asc' ? 'price_desc' : 'newest')}
          style={{
            paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.md,
            backgroundColor: colors.fill, flexDirection: 'row', alignItems: 'center', gap: 4,
          }}
        >
          <Text style={{ fontSize: 12 }}>↕</Text>
          <Text style={{ fontSize: 12, fontWeight: '500', color: colors.textSecondary }}>
            {sortBy === 'newest' ? 'Newest' : sortBy === 'price_asc' ? 'Price ↑' : 'Price ↓'}
          </Text>
        </Pressable>
      </View>

      {/* Results count */}
      <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
        <Text style={{ fontSize: 13, color: colors.textMuted }}>
          {results.length} {results.length === 1 ? 'property' : 'properties'} found
        </Text>
      </View>

      {/* Results */}
      {results.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
          <Text style={{ fontSize: 44 }}>🔍</Text>
          <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text, marginTop: 12 }}>No results</Text>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>Try adjusting your filters</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 14 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/listing/${item.id}`)}>
              <ListingCard listing={item} />
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
