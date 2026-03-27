import { View, Text, FlatList, Pressable } from 'react-native';
import { colors } from '@/lib/theme';

const MOCK_CONVERSATIONS = [
  { id: '1', name: 'Sarah M.', lastMessage: 'Thanks for the info!', time: '2m', unread: 1 },
  { id: '2', name: 'James K.', lastMessage: 'When can I view?', time: '1h', unread: 0 },
  { id: '3', name: 'Priya R.', lastMessage: 'Application submitted', time: '1d', unread: 0 },
];

export default function MessagesScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          Messages
        </Text>
      </View>
      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable className="flex-row items-center py-3.5 border-b" style={{ borderColor: colors.border }}>
            {/* Avatar */}
            <View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-3">
              <Text className="text-lg font-semibold" style={{ color: colors.textSecondary }}>
                {item.name[0]}
              </Text>
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text className="font-semibold text-[15px]" style={{ color: colors.text }}>
                  {item.name}
                </Text>
                <Text className="text-xs" style={{ color: colors.textMuted }}>
                  {item.time}
                </Text>
              </View>
              <Text className="text-sm mt-0.5" style={{ color: colors.textSecondary }} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
            {item.unread > 0 && (
              <View className="w-5 h-5 rounded-full bg-primary items-center justify-center ml-2">
                <Text className="text-white text-xs font-bold">{item.unread}</Text>
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}
