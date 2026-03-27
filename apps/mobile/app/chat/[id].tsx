import { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';

const CONVERSATIONS: Record<string, { name: string; initials: string; color: string; property: string; messages: { id: string; text: string; fromMe: boolean; time: string }[] }> = {
  '1': {
    name: 'Sarah Chen',
    initials: 'SC',
    color: '#3B82F6',
    property: 'Modern Downtown Loft',
    messages: [
      { id: '1', text: "Hi! I just submitted my application for the Modern Downtown Loft. Looking forward to hearing back!", fromMe: true, time: '10:30 AM' },
      { id: '2', text: "Thanks for your application! I'll review it shortly. The unit is quite popular so there are a few others in the running.", fromMe: false, time: '10:45 AM' },
      { id: '3', text: "That's great to hear! I have stable income and excellent references if that helps. Happy to provide any additional info.", fromMe: true, time: '10:52 AM' },
      { id: '4', text: "Yes, I did notice your references look good! Would you be available for a viewing this Saturday around 2pm?", fromMe: false, time: '11:15 AM' },
      { id: '5', text: "Saturday at 2pm works perfectly for me! I'll be there. Thanks for the opportunity.", fromMe: true, time: '11:20 AM' },
    ],
  },
  '2': {
    name: 'Marc Tremblay',
    initials: 'MT',
    color: '#8B5CF6',
    property: 'Cozy Plateau Studio',
    messages: [
      { id: '1', text: 'Is the apartment still available for May 1st?', fromMe: false, time: 'Yesterday' },
      { id: '2', text: 'Yes it is! Would you like to schedule a viewing?', fromMe: true, time: 'Yesterday' },
    ],
  },
};

const DEFAULT_CONVO = CONVERSATIONS['1'];

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const convo = CONVERSATIONS[id ?? '1'] ?? DEFAULT_CONVO;
  const [messages, setMessages] = useState(convo.messages);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: String(Date.now()), text: input.trim(), fromMe: true, time: 'Now' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.groupedBackground }} edges={['top']}>
      {/* Header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: 16, paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderBottomWidth: 0.5, borderBottomColor: colors.separator,
      }}>
        <Pressable onPress={() => router.back()} style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: colors.primary }}>‹</Text>
        </Pressable>
        <View style={{
          width: 38, height: 38, borderRadius: 19,
          backgroundColor: convo.color + '20',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: convo.color }}>{convo.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{convo.name}</Text>
          <Text style={{ fontSize: 12, color: colors.textMuted }}>{convo.property}</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16, gap: 8 }}
        renderItem={({ item }) => (
          <View style={{
            flexDirection: 'row',
            justifyContent: item.fromMe ? 'flex-end' : 'flex-start',
          }}>
            <View style={{
              maxWidth: '75%',
              backgroundColor: item.fromMe ? colors.primary : colors.card,
              borderRadius: radius.xl,
              borderTopRightRadius: item.fromMe ? 4 : radius.xl,
              borderTopLeftRadius: item.fromMe ? radius.xl : 4,
              paddingHorizontal: 16, paddingVertical: 10,
              ...(!item.fromMe ? shadow.sm : {}),
            }}>
              <Text style={{
                fontSize: 15, lineHeight: 22,
                color: item.fromMe ? '#FFFFFF' : colors.text,
              }}>
                {item.text}
              </Text>
              <Text style={{
                fontSize: 11, color: item.fromMe ? 'rgba(255,255,255,0.6)' : colors.textMuted,
                marginTop: 4, alignSelf: item.fromMe ? 'flex-end' : 'flex-start',
              }}>
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Input bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={{
          flexDirection: 'row', alignItems: 'center', gap: 10,
          paddingHorizontal: 16, paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderTopWidth: 0.5, borderTopColor: colors.separator,
        }}>
          <View style={{
            flex: 1, backgroundColor: colors.fill,
            borderRadius: radius.xl, paddingHorizontal: 16, paddingVertical: 10,
          }}>
            <TextInput
              style={{ fontSize: 15, color: colors.text }}
              placeholder="Type a message…"
              placeholderTextColor={colors.textPlaceholder}
              value={input}
              onChangeText={setInput}
              multiline
              maxLength={500}
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />
          </View>
          <Pressable
            onPress={sendMessage}
            disabled={!input.trim()}
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: input.trim() ? colors.primary : colors.fill,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: input.trim() ? '#fff' : colors.textMuted }}>↑</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
