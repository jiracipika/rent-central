import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-[#FAFAFA]" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="px-5 pt-6 pb-4">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          Profile
        </Text>
      </View>

      {/* Avatar + Name */}
      <View className="items-center mb-6">
        <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center mb-3">
          <Text className="text-2xl font-bold" style={{ color: colors.textSecondary }}>R</Text>
        </View>
        <Text className="text-lg font-semibold" style={{ color: colors.text }}>RS</Text>
        <Text className="text-sm" style={{ color: colors.textSecondary }}>Renter</Text>
      </View>

      {/* Menu */}
      <View className="mx-5 bg-white rounded-2xl overflow-hidden" style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}>
        {[
          { label: 'My Applications', icon: '📄' },
          { label: 'Saved Listings', icon: '❤️' },
          { label: 'Payment Methods', icon: '💳' },
          { label: 'Settings', icon: '⚙️' },
          { label: 'Landlord Dashboard', icon: '🏠' },
        ].map((item) => (
          <Pressable
            key={item.label}
            className="flex-row items-center px-4 py-3.5 border-b"
            style={{ borderColor: colors.border }}
            onPress={() => {
              if (item.label === 'Landlord Dashboard') {
                router.push('/landlord/dashboard');
              }
            }}
          >
            <Text className="text-lg mr-3">{item.icon}</Text>
            <Text className="flex-1 text-[15px]" style={{ color: colors.text }}>
              {item.label}
            </Text>
            <Text style={{ color: colors.textMuted }}>›</Text>
          </Pressable>
        ))}
      </View>

      {/* Sign Out */}
      <Pressable className="mx-5 mt-4 mb-8 py-3 rounded-2xl items-center" style={{ backgroundColor: colors.error + '10' }}>
        <Text className="font-semibold" style={{ color: colors.error }}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}
