import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';

const STATS = [
  { label: 'Active Listings', value: '4' },
  { label: 'Applications', value: '12' },
  { label: 'Occupied', value: '2' },
  { label: 'Revenue/mo', value: formatCurrency(4400) },
];

export default function LandlordDashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-[#FAFAFA]" showsVerticalScrollIndicator={false}>
      <View className="px-5 pt-6 pb-3 flex-row items-center">
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: colors.primary }}>← Back</Text>
        </Pressable>
        <Text className="text-2xl font-bold ml-4" style={{ color: colors.text }}>
          Dashboard
        </Text>
      </View>

      {/* Stats Grid */}
      <View className="px-5 mt-4 flex-row flex-wrap gap-3">
        {STATS.map((s) => (
          <View key={s.label} className="bg-white rounded-2xl px-4 py-4 flex-1 min-w-[45%]" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}>
            <Text className="text-xs" style={{ color: colors.textMuted }}>{s.label}</Text>
            <Text className="text-xl font-bold mt-1" style={{ color: colors.text }}>{s.value}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View className="px-5 mt-6">
        <Text className="text-lg font-semibold mb-3" style={{ color: colors.text }}>Quick Actions</Text>
        <View className="bg-white rounded-2xl overflow-hidden" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}>
          {[
            { label: 'Create Listing', screen: '/landlord/create-listing' },
            { label: 'View My Listings', screen: '/landlord/listings' },
            { label: 'View Applications', screen: '/landlord/listings' },
          ].map((action, i, arr) => (
            <View key={action.label}>
              <View
                className="px-4 py-3.5 flex-row justify-between items-center"
                style={{ borderBottomColor: colors.border, borderBottomWidth: i < arr.length - 1 ? 1 : 0 }}
                onTouchEnd={() => router.push(action.screen as any)}
              >
                <Text className="text-[15px]" style={{ color: colors.text }}>{action.label}</Text>
                <Text style={{ color: colors.textMuted }}>›</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="h-20" />
    </ScrollView>
  );
}
