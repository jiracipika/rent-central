import { useState } from 'react';
import { View, Text, FlatList, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';
import { formatCurrency } from '@rent-central/core';

type ApplicationStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'cancelled';

interface ApplicationItem {
  id: string;
  propertyTitle: string;
  address: string;
  city: string;
  province: string;
  price: number;
  type: string;
  status: ApplicationStatus;
  term: 3 | 6 | 12;
  submittedAt: string;
  landlordName: string;
  landlordInitials: string;
  landlordColor: string;
}

const APPLICATIONS: ApplicationItem[] = [
  {
    id: '1', propertyTitle: 'Modern Downtown Loft', address: '123 King St W',
    city: 'Toronto', province: 'ON', price: 2400, type: 'apartment',
    status: 'approved', term: 12, submittedAt: '2026-03-20',
    landlordName: 'Sarah Chen', landlordInitials: 'SC', landlordColor: '#3B82F6',
  },
  {
    id: '2', propertyTitle: 'Cozy Plateau Studio', address: '456 St-Denis',
    city: 'Montréal', province: 'QC', price: 1700, type: 'studio',
    status: 'under_review', term: 6, submittedAt: '2026-03-22',
    landlordName: 'Marc Tremblay', landlordInitials: 'MT', landlordColor: '#8B5CF6',
  },
  {
    id: '3', propertyTitle: 'Bridgeland Basement Suite', address: '222 1 St NE',
    city: 'Calgary', province: 'AB', price: 1300, type: 'basement',
    status: 'pending', term: 3, submittedAt: '2026-03-25',
    landlordName: 'Lena Kowalski', landlordInitials: 'LK', landlordColor: '#10B981',
  },
  {
    id: '4', propertyTitle: 'Annex Victorian Townhouse', address: '88 Harbord St',
    city: 'Toronto', province: 'ON', price: 2800, type: 'townhouse',
    status: 'rejected', term: 12, submittedAt: '2026-03-10',
    landlordName: 'James Park', landlordInitials: 'JP', landlordColor: '#EF4444',
  },
];

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; bg: string; text: string; icon: string }> = {
  pending: { label: 'Pending', bg: '#FFF4E0', text: '#F59E0B', icon: '⏳' },
  under_review: { label: 'Under Review', bg: '#EFF6FF', text: '#3B82F6', icon: '🔍' },
  approved: { label: 'Approved', bg: '#ECFDF5', text: '#10B981', icon: '✅' },
  rejected: { label: 'Rejected', bg: '#FFF1F2', text: '#EF4444', icon: '✗' },
  cancelled: { label: 'Cancelled', bg: '#F3F4F6', text: '#6B7280', icon: '○' },
};

const TABS: { label: string; value: ApplicationStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In Review', value: 'under_review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const TYPE_ICON: Record<string, string> = {
  apartment: '🏠', condo: '🏢', house: '🏡', studio: '🪴', basement: '🏗️', townhouse: '🏘️',
};

export default function ApplicationsScreen() {
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');

  const filtered = activeTab === 'all'
    ? APPLICATIONS
    : APPLICATIONS.filter((a) => a.status === activeTab);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      {/* Header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
      }}>
        <Pressable
          onPress={() => router.back()}
          style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.fillTertiary, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 16, color: colors.primary }}>‹</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, letterSpacing: -0.4 }}>
            My Applications
          </Text>
          <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>
            {APPLICATIONS.length} total · {APPLICATIONS.filter((a) => a.status === 'approved').length} approved
          </Text>
        </View>
      </View>

      {/* Tab filters */}
      <View style={{ marginBottom: 12 }}>
        <FlatList
          data={TABS}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          renderItem={({ item }) => {
            const count = item.value === 'all'
              ? APPLICATIONS.length
              : APPLICATIONS.filter((a) => a.status === item.value).length;
            return (
              <Pressable
                onPress={() => setActiveTab(item.value)}
                style={{
                  paddingHorizontal: 14, paddingVertical: 7,
                  borderRadius: radius.full,
                  backgroundColor: activeTab === item.value ? colors.primary : colors.card,
                  flexDirection: 'row', alignItems: 'center', gap: 5,
                  ...shadow.sm,
                }}
              >
                <Text style={{ fontSize: 13, fontWeight: '500', color: activeTab === item.value ? '#fff' : colors.text }}>
                  {item.label}
                </Text>
                {count > 0 && (
                  <View style={{
                    minWidth: 18, height: 18, borderRadius: 9,
                    backgroundColor: activeTab === item.value ? 'rgba(255,255,255,0.25)' : colors.fill,
                    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4,
                  }}>
                    <Text style={{ fontSize: 10, fontWeight: '700', color: activeTab === item.value ? '#fff' : colors.textSecondary }}>
                      {count}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          }}
        />
      </View>

      {/* List */}
      {filtered.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
          <Text style={{ fontSize: 44 }}>📄</Text>
          <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text, marginTop: 12 }}>No applications</Text>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
            Applications you submit will appear here
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)/search')}
            style={{ marginTop: 20, paddingHorizontal: 24, paddingVertical: 12, backgroundColor: colors.primary, borderRadius: radius.full }}
          >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>Browse Listings</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 12 }}
          renderItem={({ item }) => {
            const sc = STATUS_CONFIG[item.status];
            return (
              <Pressable
                onPress={() => router.push(`/applications/${item.id}` as any)}
                style={({ pressed }) => ({
                  backgroundColor: colors.card, borderRadius: radius.xl,
                  overflow: 'hidden', ...shadow.sm,
                  opacity: pressed ? 0.95 : 1,
                })}
              >
                {/* Status colour bar */}
                <View style={{ height: 3, backgroundColor: sc.text }} />

                <View style={{ padding: 16 }}>
                  {/* Top row */}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                    <View style={{
                      width: 44, height: 44, borderRadius: radius.md,
                      backgroundColor: colors.fillTertiary,
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Text style={{ fontSize: 22 }}>{TYPE_ICON[item.type] ?? '🏠'}</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }} numberOfLines={1}>
                        {item.propertyTitle}
                      </Text>
                      <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
                        {item.address}, {item.city}, {item.province}
                      </Text>
                    </View>
                    <View style={{
                      paddingHorizontal: 10, paddingVertical: 4,
                      borderRadius: radius.full,
                      backgroundColor: sc.bg,
                    }}>
                      <Text style={{ fontSize: 11, fontWeight: '600', color: sc.text }}>
                        {sc.icon} {sc.label}
                      </Text>
                    </View>
                  </View>

                  {/* Details row */}
                  <View style={{
                    flexDirection: 'row', marginTop: 14, paddingTop: 12,
                    borderTopWidth: 0.5, borderTopColor: colors.separator,
                    alignItems: 'center',
                  }}>
                    {/* Landlord */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
                      <View style={{
                        width: 28, height: 28, borderRadius: 14,
                        backgroundColor: item.landlordColor + '20',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: item.landlordColor }}>
                          {item.landlordInitials}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 13, color: colors.textSecondary }}>
                        {item.landlordName}
                      </Text>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: colors.primary }}>
                        {formatCurrency(item.price)}/mo
                      </Text>
                      <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>
                        {item.term}-month · {item.submittedAt}
                      </Text>
                    </View>
                  </View>

                  {/* Action for approved */}
                  {item.status === 'approved' && (
                    <Pressable
                      onPress={() => router.push(`/contracts/${item.id}` as any)}
                      style={{
                        marginTop: 12, paddingVertical: 10, borderRadius: radius.lg,
                        backgroundColor: colors.successLight,
                        alignItems: 'center', flexDirection: 'row',
                        justifyContent: 'center', gap: 6,
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>📋</Text>
                      <Text style={{ fontSize: 13, fontWeight: '600', color: colors.success }}>
                        View & Sign Contract
                      </Text>
                    </Pressable>
                  )}
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
