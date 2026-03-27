import { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';
import type { UserRole } from '@rent-central/core';

const ROLES: { value: UserRole; label: string; description: string; icon: string }[] = [
  { value: 'renter', label: 'Renter', description: 'Looking for a place to rent', icon: '🏠' },
  { value: 'landlord', label: 'Landlord', description: 'Listing properties to rent out', icon: '🔑' },
];

export default function SignUpScreen() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', role: 'renter' as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSignUp = () => {
    if (!form.firstName || !form.email || !form.password) return;
    setLoading(true);
    // TODO: Supabase auth
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 800);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        >
          {/* Back */}
          <Pressable
            onPress={() => router.back()}
            style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4, alignSelf: 'flex-start' }}
          >
            <Text style={{ fontSize: 16, color: colors.primary }}>‹ Back</Text>
          </Pressable>

          <View style={{ paddingHorizontal: 28, paddingTop: 20 }}>
            {/* Header */}
            <View style={{ marginBottom: 28 }}>
              <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text, letterSpacing: -0.5 }}>
                Create account
              </Text>
              <Text style={{ fontSize: 15, color: colors.textMuted, marginTop: 6 }}>
                Join thousands of Canadians on Rent Central
              </Text>
            </View>

            {/* Role selector */}
            <View style={{ marginBottom: 22 }}>
              <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textSecondary, marginBottom: 10 }}>
                I am a…
              </Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {ROLES.map((role) => (
                  <Pressable
                    key={role.value}
                    onPress={() => setForm((f) => ({ ...f, role: role.value }))}
                    style={{
                      flex: 1, borderRadius: radius.xl,
                      borderWidth: 1.5,
                      borderColor: form.role === role.value ? colors.primary : colors.borderLight,
                      backgroundColor: form.role === role.value ? colors.primaryLight : colors.card,
                      padding: 14, alignItems: 'center', gap: 6,
                    }}
                  >
                    <Text style={{ fontSize: 24 }}>{role.icon}</Text>
                    <Text style={{
                      fontSize: 14, fontWeight: '600',
                      color: form.role === role.value ? colors.primary : colors.text,
                    }}>
                      {role.label}
                    </Text>
                    <Text style={{
                      fontSize: 11, color: colors.textMuted, textAlign: 'center', lineHeight: 15,
                    }}>
                      {role.description}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Fields */}
            <View style={{ gap: 14 }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textSecondary, marginBottom: 6 }}>
                    First Name
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: colors.fill, borderRadius: radius.lg,
                      paddingHorizontal: 14, paddingVertical: 13,
                      fontSize: 15, color: colors.text,
                    }}
                    placeholder="Riley"
                    placeholderTextColor={colors.textPlaceholder}
                    value={form.firstName}
                    onChangeText={(v) => update('firstName', v)}
                    autoCapitalize="words"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textSecondary, marginBottom: 6 }}>
                    Last Name
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: colors.fill, borderRadius: radius.lg,
                      paddingHorizontal: 14, paddingVertical: 13,
                      fontSize: 15, color: colors.text,
                    }}
                    placeholder="Singh"
                    placeholderTextColor={colors.textPlaceholder}
                    value={form.lastName}
                    onChangeText={(v) => update('lastName', v)}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View>
                <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textSecondary, marginBottom: 6 }}>
                  Email
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.fill, borderRadius: radius.lg,
                    paddingHorizontal: 14, paddingVertical: 13,
                    fontSize: 15, color: colors.text,
                  }}
                  placeholder="you@email.com"
                  placeholderTextColor={colors.textPlaceholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={form.email}
                  onChangeText={(v) => update('email', v)}
                />
              </View>

              <View>
                <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textSecondary, marginBottom: 6 }}>
                  Password
                </Text>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={{
                      backgroundColor: colors.fill, borderRadius: radius.lg,
                      paddingHorizontal: 14, paddingVertical: 13,
                      paddingRight: 52, fontSize: 15, color: colors.text,
                    }}
                    placeholder="At least 8 characters"
                    placeholderTextColor={colors.textPlaceholder}
                    secureTextEntry={!showPassword}
                    value={form.password}
                    onChangeText={(v) => update('password', v)}
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 13, color: colors.textMuted, fontWeight: '500' }}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Terms */}
            <View style={{
              marginTop: 18, padding: 14, backgroundColor: colors.fillTertiary,
              borderRadius: radius.lg,
            }}>
              <Text style={{ fontSize: 12, color: colors.textMuted, lineHeight: 18, textAlign: 'center' }}>
                By creating an account you agree to our{' '}
                <Text style={{ color: colors.primary, fontWeight: '500' }}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={{ color: colors.primary, fontWeight: '500' }}>Privacy Policy</Text>.
              </Text>
            </View>

            {/* Create account button */}
            <Pressable
              style={({ pressed }) => ({
                marginTop: 20, backgroundColor: loading ? colors.primaryLight : colors.primary,
                paddingVertical: 15, borderRadius: radius.xl,
                alignItems: 'center', ...shadow.sm,
                opacity: pressed ? 0.9 : 1,
              })}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
                {loading ? 'Creating account…' : 'Create Account'}
              </Text>
            </Pressable>

            {/* Sign in link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 4 }}>
              <Text style={{ fontSize: 14, color: colors.textMuted }}>Already have an account?</Text>
              <Pressable onPress={() => router.push('/auth/sign-in')}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
