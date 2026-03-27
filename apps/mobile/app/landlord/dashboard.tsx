import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';

const STATS = [
  { label: 'Active Listings', value: '4', icon: '🏠' },
  { label: 'Applications', value: '12', icon: '📝' },
  { label: 'Occupied', value: '2', icon: '🔑' },
  { label: 'Revenue/mo', value: formatCurrency(4400), icon: '💰' },
];

const ACTIONS = [
  { label: 'Create Listing', icon: '➕', screen: '/landlord/create-listing' },
  { label: 'View My Listings', icon: '🏘️', screen: '/landlord/listings' },
  { label: 'View Applications', icon: '📋', screen: '/landlord/listings' },
];

export default function LandlordDashboardScreen() {
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
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, letterSpacing: -0.4 }}>
          Dashboard
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Stats Grid */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {STATS.map((s) => (
              <View
                key={s.label}
                style={{
                  width: '47%', backgroundColor: colors.card,
                  borderRadius: radius.xl, padding: 16,
                  ...shadow.sm,
                }}
              >
                <Text style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</Text>
                <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text }}>{s.value}</Text>
                <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, letterSpacing: -0.3, marginBottom: 12 }}>
            Quick Actions
          </Text>
          <View style={{
            backgroundColor: colors.card, borderRadius: radius.xl,
            overflow: 'hidden', ...shadow.sm,
          }}>
            {ACTIONS.map((action, i) => (
              <Pressable
                key={action.label}
                style={({ pressed }) => ({
                  flexDirection: 'row', alignItems: 'center', gap: 12,
                  paddingHorizontal: 16, paddingVertical: 14,
                  backgroundColor: pressed ? colors.fillTertiary : 'transparent',
                  borderBottomWidth: i < ACTIONS.length - 1 ? 0.5 : 0,
                  borderBottomColor: colors.separator,
                })}
                onPress={() => router.push(action.screen as any)}
              >
                <Text style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{action.icon}</Text>
                <Text style={{ flex: 1, fontSize: 15, fontWeight: '500', color: colors.text }}>
                  {action.label}
                </Text>
                <Text style={{ fontSize: 18, color: colors.textMuted }}>›</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
