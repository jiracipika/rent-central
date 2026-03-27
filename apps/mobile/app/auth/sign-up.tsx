import { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';

export default function SignUpScreen() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-8">
        <Text className="text-3xl font-bold text-center" style={{ color: colors.text }}>
          Create account
        </Text>
        <Text className="text-center mt-2" style={{ color: colors.textSecondary }}>
          Join Rent Central
        </Text>

        <View className="mt-8">
          <View className="flex-row gap-3 mb-3">
            <TextInput
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3.5 text-base"
              placeholder="First Name"
              placeholderTextColor={colors.textMuted}
              value={form.firstName}
              onChangeText={(v) => update('firstName', v)}
            />
            <TextInput
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3.5 text-base"
              placeholder="Last Name"
              placeholderTextColor={colors.textMuted}
              value={form.lastName}
              onChangeText={(v) => update('lastName', v)}
            />
          </View>
          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-3.5 text-base mb-3"
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) => update('email', v)}
          />
          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-3.5 text-base"
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={form.password}
            onChangeText={(v) => update('password', v)}
          />
        </View>

        <Pressable className="mt-6 py-3.5 rounded-2xl items-center" style={{ backgroundColor: colors.primary }}>
          <Text className="text-white font-semibold text-base">Sign Up</Text>
        </Pressable>

        <Pressable className="mt-4 items-center" onPress={() => router.back()}>
          <Text className="text-sm" style={{ color: colors.primary }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
