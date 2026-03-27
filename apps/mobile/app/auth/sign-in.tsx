import { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-8">
        <Text className="text-3xl font-bold text-center" style={{ color: colors.text }}>
          Welcome back
        </Text>
        <Text className="text-center mt-2" style={{ color: colors.textSecondary }}>
          Sign in to continue
        </Text>

        <View className="mt-10">
          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-3.5 text-base mb-3"
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="bg-gray-100 rounded-xl px-4 py-3.5 text-base"
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Pressable className="mt-6 py-3.5 rounded-2xl items-center" style={{ backgroundColor: colors.primary }}>
          <Text className="text-white font-semibold text-base">Sign In</Text>
        </Pressable>

        <Pressable className="mt-4 items-center" onPress={() => router.push('/auth/sign-up')}>
          <Text className="text-sm" style={{ color: colors.primary }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
