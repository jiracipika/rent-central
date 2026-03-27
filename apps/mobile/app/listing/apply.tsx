import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';

export default function ApplyScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    moveInDate: '',
    term: '12',
    message: '',
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      Alert.alert('Missing info', 'Please fill in your name and email.');
      return;
    }
    Alert.alert('Application Sent', 'We\'ll let you know when the landlord responds.');
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-[#FAFAFA]" showsVerticalScrollIndicator={false}>
      <View className="px-5 pt-6 pb-3">
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: colors.primary }}>← Back</Text>
        </Pressable>
        <Text className="text-2xl font-bold mt-3" style={{ color: colors.text }}>
          Apply
        </Text>
      </View>

      <View className="px-5 pb-8">
        {[
          { key: 'name', label: 'Full Name', placeholder: 'John Doe', kb: 'default' as const },
          { key: 'email', label: 'Email', placeholder: 'john@example.com', kb: 'email-address' as const },
          { key: 'phone', label: 'Phone', placeholder: '(416) 555-1234', kb: 'phone-pad' as const },
          { key: 'moveInDate', label: 'Desired Move-in Date', placeholder: 'YYYY-MM-DD', kb: 'default' as const },
        ].map((f) => (
          <View key={f.key} className="mb-4">
            <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>
              {f.label}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 text-base"
              style={{ color: colors.text, borderColor: colors.border, borderWidth: 1 }}
              placeholder={f.placeholder}
              placeholderTextColor={colors.textMuted}
              keyboardType={f.kb}
              value={form[f.key as keyof typeof form]}
              onChangeText={(v) => update(f.key, v)}
            />
          </View>
        ))}

        {/* Term selector */}
        <View className="mb-4">
          <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>
            Lease Term
          </Text>
          <View className="flex-row gap-2">
            {[
              { label: '3 months', value: '3' },
              { label: '6 months', value: '6' },
              { label: '12 months', value: '12' },
            ].map((t) => (
              <Pressable
                key={t.value}
                className="flex-1 py-3 rounded-xl items-center border"
                style={{
                  backgroundColor: form.term === t.value ? colors.primary + '10' : 'white',
                  borderColor: form.term === t.value ? colors.primary : colors.border,
                }}
                onPress={() => update('term', t.value)}
              >
                <Text
                  className="font-medium text-sm"
                  style={{ color: form.term === t.value ? colors.primary : colors.textSecondary }}
                >
                  {t.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Message */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>
            Message to Landlord (optional)
          </Text>
          <TextInput
            className="bg-white rounded-xl px-4 py-3 text-base min-h-[100px]"
            style={{ color: colors.text, borderColor: colors.border, borderWidth: 1, textAlignVertical: 'top' }}
            placeholder="Tell the landlord about yourself..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
            value={form.message}
            onChangeText={(v) => update('message', v)}
          />
        </View>

        <Pressable
          className="py-3.5 rounded-2xl items-center"
          style={{ backgroundColor: colors.primary }}
          onPress={handleSubmit}
        >
          <Text className="text-white font-semibold text-base">Submit Application</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
