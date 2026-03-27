import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';

const CONVERSATIONS = [
  { id: '1', name: 'Sarah Chen', initials: 'SC', property: 'Modern Downtown Loft', lastMessage: 'Thanks for your application! I\'ll review it shortly.', time: '2m ago', unread: 2, online: true, color: '#3B82F6' },
  { id: '2', name: 'Marc Tremblay', initials: 'MT', property: 'Cozy Plateau Studio', lastMessage: 'Is the apartment still available for May 1st?', time: '1h ago', unread: 0, online: false, color: '#8B5CF6' },
  { id: '3', name: 'Emily Park', initials: 'EP', property: 'Yaletown Condo', lastMessage: 'When can you schedule a viewing? I\'m flexible on weekends.', time: '3h ago', unread: 0, online: true, color: '#10B981' },
  { id: '4', name: 'Lena Kowalski', initials: 'LK', property: 'Bridgeland Basement', lastMessage: 'Application approved! Please review the lease agreement.', time: '1d ago', unread: 1, online: false, color: '#F59E0B' },
  { id: '5', name: 'James Park', initials: 'JP', property: 'Annex Victorian', lastMessage: 'Happy to answer any questions about the property.', time: '2d ago', unread: 0, online: false, color: '#EF4444' },
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text, letterSpacing: -0.5 }}>
            Messages
          </Text>
          <View style={{
            backgroundColor: colors.primary, borderRadius: radius.full,
            paddingHorizontal: 10, paddingVertical: 3,
          }}>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
              {CONVERSATIONS.reduce((sum, c) => sum + c.unread, 0)} new
            </Text>
          </View>
        </View>

        {/* Search */}
        <View style={{
          flexDirection: 'row', alignItems: 'center', backgroundColor: colors.fill,
          borderRadius: radius.lg, paddingHorizontal: 12, paddingVertical: 9, marginTop: 12,
        }}>
          <Text style={{ fontSize: 14, color: colors.textMuted, marginRight: 8 }}>🔍</Text>
          <TextInput
            style={{ flex: 1, fontSize: 14, color: colors.text }}
            placeholder="Search messages…"
            placeholderTextColor={colors.textPlaceholder}
          />
        </View>
      </View>

      <FlatList
        data={CONVERSATIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => ({
              flexDirection: 'row', alignItems: 'center',
              paddingHorizontal: 20, paddingVertical: 14,
              backgroundColor: pressed ? colors.fillTertiary : 'transparent',
              borderBottomWidth: 0.5, borderBottomColor: colors.separator,
            })}
            onPress={() => router.push(`/chat/${item.id}`)}
          >
            {/* Avatar */}
            <View style={{ marginRight: 14, position: 'relative' }}>
              <View style={{
                width: 52, height: 52, borderRadius: 26,
                backgroundColor: item.color + '20',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: item.color }}>
                  {item.initials}
                </Text>
              </View>
              {item.online && (
                <View style={{
                  position: 'absolute', bottom: 1, right: 1,
                  width: 12, height: 12, borderRadius: 6,
                  backgroundColor: colors.success,
                  borderWidth: 2, borderColor: colors.groupedBackground,
                }} />
              )}
            </View>

            {/* Content */}
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{
                  fontSize: 15, fontWeight: item.unread > 0 ? '700' : '600',
                  color: colors.text, flex: 1, marginRight: 8,
                }} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 12, color: colors.textMuted, flexShrink: 0 }}>
                  {item.time}
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: colors.primary, marginTop: 1 }} numberOfLines={1}>
                {item.property}
              </Text>
              <Text style={{
                fontSize: 14, color: item.unread > 0 ? colors.text : colors.textMuted,
                fontWeight: item.unread > 0 ? '500' : '400',
                marginTop: 3,
              }} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>

            {/* Unread badge */}
            {item.unread > 0 && (
              <View style={{
                marginLeft: 10, minWidth: 20, height: 20, borderRadius: 10,
                backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
                paddingHorizontal: 6,
              }}>
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>{item.unread}</Text>
              </View>
            )}
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
            <Text style={{ fontSize: 48 }}>💬</Text>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 14 }}>No messages yet</Text>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 6 }}>
              Messages from landlords will appear here
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
