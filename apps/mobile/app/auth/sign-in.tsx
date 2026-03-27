import { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) return;
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
          {/* Back button */}
          <Pressable
            onPress={() => router.canGoBack() ? router.back() : null}
            style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4, alignSelf: 'flex-start' }}
          >
            <Text style={{ fontSize: 16, color: colors.primary }}>‹ Back</Text>
          </Pressable>

          <View style={{ flex: 1, paddingHorizontal: 28, paddingTop: 24 }}>
            {/* Logo / brand mark */}
            <View style={{ alignItems: 'center', marginBottom: 36 }}>
              <View style={{
                width: 72, height: 72, borderRadius: 20,
                backgroundColor: colors.primary,
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 16, ...shadow.md,
              }}>
                <Text style={{ fontSize: 32 }}>🏠</Text>
              </View>
              <Text style={{ fontSize: 28, fontWeight: '700', color: colors.text, letterSpacing: -0.5 }}>
                Welcome back
              </Text>
              <Text style={{ fontSize: 15, color: colors.textMuted, marginTop: 6, textAlign: 'center' }}>
                Sign in to your Rent Central account
              </Text>
            </View>

            {/* Fields */}
            <View style={{ gap: 14 }}>
              <View>
                <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textSecondary, marginBottom: 6 }}>
                  Email
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.fill, borderRadius: radius.lg,
                    paddingHorizontal: 16, paddingVertical: 14,
                    fontSize: 15, color: colors.text,
                  }}
                  placeholder="you@email.com"
                  placeholderTextColor={colors.textPlaceholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
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
                      paddingHorizontal: 16, paddingVertical: 14,
                      paddingRight: 52, fontSize: 15, color: colors.text,
                    }}
                    placeholder="Your password"
                    placeholderTextColor={colors.textPlaceholder}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: 14, top: 0, bottom: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 13, color: colors.textMuted, fontWeight: '500' }}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Forgot password */}
            <Pressable style={{ alignSelf: 'flex-end', marginTop: 10 }}>
              <Text style={{ fontSize: 13, color: colors.primary, fontWeight: '500' }}>
                Forgot password?
              </Text>
            </Pressable>

            {/* Sign in button */}
            <Pressable
              style={({ pressed }) => ({
                marginTop: 28, backgroundColor: loading ? colors.primaryLight : colors.primary,
                paddingVertical: 15, borderRadius: radius.xl,
                alignItems: 'center', ...shadow.sm,
                opacity: pressed ? 0.9 : 1,
              })}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
                {loading ? 'Signing in…' : 'Sign In'}
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={{
              flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 24,
            }}>
              <View style={{ flex: 1, height: 0.5, backgroundColor: colors.separator }} />
              <Text style={{ fontSize: 13, color: colors.textMuted }}>or</Text>
              <View style={{ flex: 1, height: 0.5, backgroundColor: colors.separator }} />
            </View>

            {/* Social auth placeholder */}
            <Pressable style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
              borderWidth: 1, borderColor: colors.border, borderRadius: radius.xl,
              paddingVertical: 13,
            }}>
              <Text style={{ fontSize: 16 }}>🇨🇦</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', color: colors.text }}>
                Continue with Google
              </Text>
            </Pressable>

            {/* Sign up link */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 28, gap: 4 }}>
              <Text style={{ fontSize: 14, color: colors.textMuted }}>Don't have an account?</Text>
              <Pressable onPress={() => router.push('/auth/sign-up')}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
