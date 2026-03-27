import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import type { PropertyType } from '@rent-central/core';

const STEPS = ['Details', 'Location', 'Pricing', 'Features'];

const PROPERTY_TYPES: PropertyType[] = ['apartment', 'house', 'condo', 'basement', 'townhouse', 'studio'];

export default function CreateListingScreen() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'apartment' as PropertyType,
    address: '',
    city: '',
    postalCode: '',
    price12: '',
    deposit: '',
    bedrooms: '',
    bathrooms: '',
    utilities: false,
    parking: false,
    pets: false,
    furnished: false,
  });

  const toggle = (key: 'utilities' | 'parking' | 'pets' | 'furnished') =>
    setForm((f) => ({ ...f, [key]: !f[key] }));

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      {/* Header */}
      <View className="px-5 pt-6 pb-3 flex-row items-center">
        <Pressable onPress={() => (step === 0 ? router.back() : setStep(step - 1))}>
          <Text style={{ color: colors.primary }}>← Back</Text>
        </Pressable>
        <Text className="text-lg font-semibold ml-4" style={{ color: colors.text }}>
          Create Listing
        </Text>
      </View>

      {/* Step indicator */}
      <View className="px-5 mb-6">
        <View className="flex-row gap-2">
          {STEPS.map((s, i) => (
            <View key={s} className="flex-1 h-1 rounded-full" style={{ backgroundColor: i <= step ? colors.primary : colors.border }} />
          ))}
        </View>
        <Text className="text-xs mt-2 text-center" style={{ color: colors.textMuted }}>
          Step {step + 1} of {STEPS.length}
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 pb-32" showsVerticalScrollIndicator={false}>
        {step === 0 && (
          <View>
            <Text className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Property Details</Text>
            <View className="mb-4">
              <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>Title</Text>
              <TextInput className="bg-white rounded-xl px-4 py-3 text-base border" style={{ borderColor: colors.border, color: colors.text }} placeholder="e.g. Bright 2BR Downtown" placeholderTextColor={colors.textMuted} value={form.title} onChangeText={(v) => update('title', v)} />
            </View>
            <View className="mb-4">
              <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>Description</Text>
              <TextInput className="bg-white rounded-xl px-4 py-3 text-base border min-h-[100px]" style={{ borderColor: colors.border, color: colors.text, textAlignVertical: 'top' }} placeholder="Describe your property..." placeholderTextColor={colors.textMuted} multiline numberOfLines={4} value={form.description} onChangeText={(v) => update('description', v)} />
            </View>
            <View className="mb-4">
              <Text className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>Property Type</Text>
              <View className="flex-row flex-wrap gap-2">
                {PROPERTY_TYPES.map((t) => (
                  <Pressable key={t} className="px-4 py-2 rounded-full border" style={{ backgroundColor: form.type === t ? colors.primary + '10' : 'white', borderColor: form.type === t ? colors.primary : colors.border }} onPress={() => update('type', t)}>
                    <Text className="text-sm font-medium capitalize" style={{ color: form.type === t ? colors.primary : colors.textSecondary }}>{t}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Location</Text>
            <View className="mb-4">
              <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>Address</Text>
              <TextInput className="bg-white rounded-xl px-4 py-3 text-base border" style={{ borderColor: colors.border, color: colors.text }} placeholder="123 Main St" placeholderTextColor={colors.textMuted} value={form.address} onChangeText={(v) => update('address', v)} />
            </View>
            <View className="mb-4">
              <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>City</Text>
              <TextInput className="bg-white rounded-xl px-4 py-3 text-base border" style={{ borderColor: colors.border, color: colors.text }} placeholder="Toronto" placeholderTextColor={colors.textMuted} value={form.city} onChangeText={(v) => update('city', v)} />
            </View>
            <View className="mb-4">
              <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>Postal Code</Text>
              <TextInput className="bg-white rounded-xl px-4 py-3 text-base border" style={{ borderColor: colors.border, color: colors.text }} placeholder="M5V 1A1" placeholderTextColor={colors.textMuted} value={form.postalCode} onChangeText={(v) => update('postalCode', v)} autoCapitalize="characters" />
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Pricing</Text>
            <View className="mb-4">
              <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>Monthly Rent (12-month lease)</Text>
              <TextInput className="bg-white rounded-xl px-4 py-3 text-base border" style={{ borderColor: colors.border, color: colors.text }} placeholder="2,200" placeholderTextColor={colors.textMuted} keyboardType="numeric" value={form.price12} onChangeText={(v) => update('price12', v)} />
            </View>
            <View className="mb-4">
              <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>Deposit</Text>
              <TextInput className="bg-white rounded-xl px-4 py-3 text-base border" style={{ borderColor: colors.border, color: colors.text }} placeholder="2,200" placeholderTextColor={colors.textMuted} keyboardType="numeric" value={form.deposit} onChangeText={(v) => update('deposit', v)} />
            </View>
            <View className="flex-row gap-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>Bedrooms</Text>
                <TextInput className="bg-white rounded-xl px-4 py-3 text-base border" style={{ borderColor: colors.border, color: colors.text }} placeholder="2" placeholderTextColor={colors.textMuted} keyboardType="numeric" value={form.bedrooms} onChangeText={(v) => update('bedrooms', v)} />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium mb-1.5" style={{ color: colors.textSecondary }}>Bathrooms</Text>
                <TextInput className="bg-white rounded-xl px-4 py-3 text-base border" style={{ borderColor: colors.border, color: colors.text }} placeholder="1" placeholderTextColor={colors.textMuted} keyboardType="numeric" value={form.bathrooms} onChangeText={(v) => update('bathrooms', v)} />
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Features</Text>
            {[
              { key: 'utilities' as const, label: 'Utilities Included', emoji: '💡' },
              { key: 'parking' as const, label: 'Parking Included', emoji: '🅿️' },
              { key: 'pets' as const, label: 'Pet Friendly', emoji: '🐾' },
              { key: 'furnished' as const, label: 'Furnished', emoji: '🛋️' },
            ].map((f) => (
              <Pressable key={f.key} className="flex-row items-center justify-between py-3.5 border-b" style={{ borderColor: colors.border }} onPress={() => toggle(f.key)}>
                <View className="flex-row items-center">
                  <Text className="text-lg mr-3">{f.emoji}</Text>
                  <Text className="text-base" style={{ color: colors.text }}>{f.label}</Text>
                </View>
                <View className="w-11 h-6 rounded-full items-center justify-end px-0.5" style={{ backgroundColor: form[f.key] ? colors.primary : colors.border }}>
                  <View className="w-5 h-5 rounded-full bg-white" />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-[#FAFAFA]/90">
        {step < STEPS.length - 1 ? (
          <Pressable className="py-3.5 rounded-2xl items-center" style={{ backgroundColor: colors.primary }} onPress={() => setStep(step + 1)}>
            <Text className="text-white font-semibold text-base">Continue</Text>
          </Pressable>
        ) : (
          <Pressable className="py-3.5 rounded-2xl items-center" style={{ backgroundColor: colors.primary }} onPress={() => { /* TODO: submit */ }}>
            <Text className="text-white font-semibold text-base">Publish Listing</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
