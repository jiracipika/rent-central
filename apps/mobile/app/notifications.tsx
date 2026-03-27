import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '@/lib/theme';

const NOTIFICATIONS = [
  { id: '1', icon: '📝', title: 'New Application Received', message: 'Jordan Lee applied for your Modern Downtown Loft listing.', time: '2h ago', unread: true, color: '#3B82F6' },
  { id: '2', icon: '💬', title: 'New Message', message: 'Sarah Chen sent you a message about Luxury Yaletown Condo.', time: '5h ago', unread: true, color: '#8B5CF6' },
  { id: '3', icon: '✅', title: 'Application Approved', message: 'Your application for Bridgeland Basement Suite was approved!', time: '1d ago', unread: false, color: '#10B981' },
  { id: '4', icon: '📄', title: 'Contract Ready', message: 'Lease agreement for Bridgeland Basement Suite is ready for your signature.', time: '2d ago', unread: false, color: '#F59E0B' },
  { id: '5', icon: '💳', title: 'Payment Successful', message: 'Your deposit of $1,300 for Bridgeland Basement Suite has been processed.', time: '3d ago', unread: false, color: '#10B981' },
  { id: '6', icon: '🔔', title: 'Payment Due Soon', message: 'Rent payment of $1,300 is due in 3 days.', time: '4d ago', unread: false, color: '#EF4444' },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text, letterSpacing: -0.5 }}>
            Notifications
          </Text>
          <Pressable>
            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Mark all read</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            style={{
              flexDirection: 'row', alignItems: 'flex-start', gap: 14,
              paddingHorizontal: 20, paddingVertical: 16,
              backgroundColor: item.unread ? colors.groupedSecondary : 'transparent',
              borderBottomWidth: 0.5, borderBottomColor: colors.separator,
            }}
          >
            <View style={{
              width: 40, height: 40, borderRadius: 20,
              backgroundColor: item.color + '15',
              alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Text style={{ fontSize: 16 }}>{item.icon}</Text>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{
                  fontSize: 15, fontWeight: item.unread ? '700' : '600',
                  color: colors.text, flex: 1,
                }} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.unread && (
                  <View style={{
                    width: 8, height: 8, borderRadius: 4,
                    backgroundColor: colors.primary,
                  }} />
                )}
              </View>
              <Text style={{
                fontSize: 14, color: colors.textSecondary, marginTop: 3,
                lineHeight: 20,
              }} numberOfLines={2}>
                {item.message}
              </Text>
              <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
                {item.time}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
