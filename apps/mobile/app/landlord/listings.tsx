import { View, Text, FlatList, Pressable } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { StatusBadge } from '@/components/StatusBadge';
import { formatCurrency } from '@rent-central/core';
import type { Property } from '@rent-central/core';

const MOCK: (Property & { applications: number })[] = [
  { id: '1', landlordId: 'l1', title: 'Bright 2BR Downtown', description: '', type: 'apartment', status: 'active', address: '123 King St W', city: 'Toronto', province: 'ON', postalCode: 'M5H', lat: 0, lng: 0, bedrooms: 2, bathrooms: 1, pricePerTerm: { 3: 2400, 6: 2300, 12: 2200 }, deposit: 2200, utilitiesIncluded: true, parkingIncluded: false, petFriendly: true, furnished: false, amenities: [], photos: [], coverPhoto: '', availableFrom: new Date(), minimumLeaseTerm: 12, createdAt: new Date(), isNew: false, applications: 5 },
  { id: '2', landlordId: 'l1', title: 'Cozy Studio', description: '', type: 'studio', status: 'active', address: '456 Queen St W', city: 'Toronto', province: 'ON', postalCode: 'M5V', lat: 0, lng: 0, bedrooms: 0, bathrooms: 1, pricePerTerm: { 3: 1500, 6: 1400, 12: 1300 }, deposit: 1300, utilitiesIncluded: false, parkingIncluded: true, petFriendly: false, furnished: true, amenities: [], photos: [], coverPhoto: '', availableFrom: new Date(), minimumLeaseTerm: 6, createdAt: new Date(), isNew: true, applications: 2 },
];

export default function LandlordListingsScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="px-5 pt-6 pb-3 flex-row items-center">
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: colors.primary }}>← Back</Text>
        </Pressable>
        <Text className="text-2xl font-bold ml-4" style={{ color: colors.text }}>My Listings</Text>
      </View>

      <FlatList
        data={MOCK}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-4 mb-3" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}>
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="font-semibold text-base" style={{ color: colors.text }}>{item.title}</Text>
                <Text className="text-sm mt-0.5" style={{ color: colors.textSecondary }}>{item.address}</Text>
              </View>
              <StatusBadge status={item.status} />
            </View>
            <View className="flex-row mt-3 gap-4">
              <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
                {formatCurrency(item.pricePerTerm[12])}/mo
              </Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>
                {item.applications} applications
              </Text>
            </View>
          </View>
        )}
      />

      <View className="absolute bottom-8 right-5">
        <Pressable
          className="w-14 h-14 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }}
          onPress={() => router.push('/landlord/create-listing')}
        >
          <Text className="text-white text-2xl">+</Text>
        </Pressable>
      </View>
    </View>
  );
}
