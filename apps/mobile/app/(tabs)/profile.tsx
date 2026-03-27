import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';

const USER = {
  firstName: 'Riley',
  lastName: 'Singh',
  email: 'riley.singh@email.com',
  role: 'Renter',
  emailVerified: true,
  phoneVerified: false,
  idVerified: false,
  initials: 'RS',
  color: '#007AFF',
  memberSince: '2025',
};

const STATS = [
  { label: 'Applications', value: '3', icon: '📝' },
  { label: 'Saved', value: '7', icon: '❤️' },
  { label: 'Active Lease', value: '1', icon: '🔑' },
];

type MenuItem = {
  label: string;
  icon: string;
  screen?: string;
  badge?: string;
  destructive?: boolean;
};

const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
  {
    title: 'My Rentals',
    items: [
      { label: 'My Applications', icon: '📄', screen: '/applications' },
      { label: 'Contracts', icon: '📋', screen: '/contracts' },
      { label: 'Payments', icon: '💳', screen: '/payments' },
      { label: 'Saved Listings', icon: '❤️', screen: '/(tabs)/bookmarks' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile Settings', icon: '⚙️', screen: '/profile/settings' },
      { label: 'Notifications', icon: '🔔', screen: '/notifications', badge: '2' },
      { label: 'Landlord Dashboard', icon: '🏠', screen: '/landlord/dashboard' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help & Support', icon: '❓' },
      { label: 'About Rent Central', icon: 'ℹ️' },
    ],
  },
];

function VerificationBadge({ verified, label }: { verified: boolean; label: string }) {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', gap: 4,
      backgroundColor: verified ? colors.successLight : colors.fillTertiary,
      borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4,
    }}>
      <Text style={{ fontSize: 11 }}>{verified ? '✓' : '○'}</Text>
      <Text style={{
        fontSize: 11, fontWeight: '500',
        color: verified ? colors.success : colors.textMuted,
      }}>
        {label}
      </Text>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text, letterSpacing: -0.5 }}>
            Profile
          </Text>
        </View>

        {/* Avatar card */}
        <View style={{
          marginHorizontal: 20, marginTop: 12, marginBottom: 16,
          backgroundColor: colors.card, borderRadius: radius.xl,
          padding: 20, ...shadow.sm,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View style={{
              width: 68, height: 68, borderRadius: 34,
              backgroundColor: USER.color + '18',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: USER.color }}>
                {USER.initials}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, letterSpacing: -0.3 }}>
                {USER.firstName} {USER.lastName}
              </Text>
              <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>
                {USER.email}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
                <View style={{
                  backgroundColor: colors.primaryLight, borderRadius: radius.full,
                  paddingHorizontal: 8, paddingVertical: 3,
                }}>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: colors.primary }}>
                    {USER.role}
                  </Text>
                </View>
                <Text style={{ fontSize: 11, color: colors.textMuted }}>
                  Since {USER.memberSince}
                </Text>
              </View>
            </View>
          </View>

          {/* Verification status */}
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <VerificationBadge verified={USER.emailVerified} label="Email" />
            <VerificationBadge verified={USER.phoneVerified} label="Phone" />
            <VerificationBadge verified={USER.idVerified} label="ID" />
          </View>
        </View>

        {/* Stats */}
        <View style={{
          flexDirection: 'row', marginHorizontal: 20, marginBottom: 20, gap: 10,
        }}>
          {STATS.map((stat) => (
            <View key={stat.label} style={{
              flex: 1, backgroundColor: colors.card, borderRadius: radius.lg,
              paddingVertical: 14, alignItems: 'center', ...shadow.sm,
            }}>
              <Text style={{ fontSize: 20, marginBottom: 4 }}>{stat.icon}</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>{stat.value}</Text>
              <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu sections */}
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={{ marginHorizontal: 20, marginBottom: 16 }}>
            <Text style={{
              fontSize: 12, fontWeight: '600', color: colors.textMuted,
              textTransform: 'uppercase', letterSpacing: 0.8,
              marginBottom: 8, marginLeft: 4,
            }}>
              {section.title}
            </Text>
            <View style={{
              backgroundColor: colors.card, borderRadius: radius.xl,
              overflow: 'hidden', ...shadow.sm,
            }}>
              {section.items.map((item, i) => (
                <Pressable
                  key={item.label}
                  style={({ pressed }) => ({
                    flexDirection: 'row', alignItems: 'center', gap: 12,
                    paddingHorizontal: 16, paddingVertical: 13,
                    backgroundColor: pressed ? colors.fillTertiary : 'transparent',
                    borderBottomWidth: i < section.items.length - 1 ? 0.5 : 0,
                    borderBottomColor: colors.separator,
                  })}
                  onPress={() => {
                    if (item.screen) router.push(item.screen as any);
                  }}
                >
                  <View style={{
                    width: 32, height: 32, borderRadius: radius.sm,
                    backgroundColor: colors.fillTertiary,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                  </View>
                  <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>
                    {item.label}
                  </Text>
                  {item.badge && (
                    <View style={{
                      minWidth: 20, height: 20, borderRadius: 10,
                      backgroundColor: colors.error,
                      alignItems: 'center', justifyContent: 'center',
                      paddingHorizontal: 6, marginRight: 4,
                    }}>
                      <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>
                        {item.badge}
                      </Text>
                    </View>
                  )}
                  <Text style={{ fontSize: 18, color: colors.textMuted }}>›</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Sign out */}
        <Pressable
          style={({ pressed }) => ({
            marginHorizontal: 20, marginTop: 4,
            paddingVertical: 14, borderRadius: radius.xl,
            backgroundColor: pressed ? colors.errorLight : colors.errorLight,
            alignItems: 'center',
          })}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.error }}>
            Sign Out
          </Text>
        </Pressable>

        <Text style={{
          textAlign: 'center', fontSize: 12, color: colors.textMuted,
          marginTop: 20,
        }}>
          Rent Central v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
