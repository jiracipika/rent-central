import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Platform, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';
import type { PropertyType } from '@rent-central/core';

const STEPS = ['Details', 'Location', 'Pricing', 'Features'];

const PROPERTY_TYPES: { value: PropertyType; icon: string }[] = [
  { value: 'apartment', icon: '🏠' },
  { value: 'condo', icon: '🏢' },
  { value: 'house', icon: '🏡' },
  { value: 'studio', icon: '🪴' },
  { value: 'basement', icon: '🏗️' },
  { value: 'townhouse', icon: '🏘️' },
];

const CANADIAN_PROVINCES = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland & Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' },
];

const CANADIAN_CITIES: Record<string, string[]> = {
  ON: ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham'],
  BC: ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Kelowna', 'Victoria', 'Abbotsford'],
  AB: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert'],
  QC: ['Montréal', 'Québec City', 'Laval', 'Gatineau', 'Longueuil'],
  MB: ['Winnipeg', 'Brandon', 'Steinbach'],
  SK: ['Saskatoon', 'Regina', 'Prince Albert'],
  NS: ['Halifax', 'Dartmouth', 'Sydney'],
  NB: ['Fredericton', 'Moncton', 'Saint John'],
  NL: ["St. John's", 'Corner Brook', 'Gander'],
  PE: ['Charlottetown', 'Summerside'],
  NT: ['Yellowknife'], NU: ['Iqaluit'], YT: ['Whitehorse'],
};

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textSecondary, marginBottom: 6 }}>
      {label}
      {required && <Text style={{ color: colors.error }}> *</Text>}
    </Text>
  );
}

function InputField({ label, value, onChange, placeholder, keyboard, multiline, prefix, required }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; keyboard?: any; multiline?: boolean; prefix?: string; required?: boolean;
}) {
  return (
    <View>
      <FieldLabel label={label} required={required} />
      <View style={{
        flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center',
        backgroundColor: colors.fill, borderRadius: radius.lg,
      }}>
        {prefix && (
          <Text style={{ paddingLeft: 14, fontSize: 15, color: colors.textMuted }}>{prefix}</Text>
        )}
        <TextInput
          style={{
            flex: 1, paddingHorizontal: 14, paddingVertical: 13,
            fontSize: 15, color: colors.text,
            height: multiline ? 96 : undefined,
            textAlignVertical: multiline ? 'top' : undefined,
          }}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          keyboardType={keyboard ?? 'default'}
          multiline={multiline}
          autoCorrect={false}
        />
      </View>
    </View>
  );
}

export default function CreateListingScreen() {
  const [step, setStep] = useState(0);
  const [showProvinceSheet, setShowProvinceSheet] = useState(false);
  const [showCitySheet, setShowCitySheet] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', type: 'apartment' as PropertyType,
    address: '', province: 'ON', city: 'Toronto', postalCode: '',
    price12: '', price6: '', price3: '', deposit: '',
    bedrooms: '1', bathrooms: '1', sqft: '',
    utilities: false, parking: false, pets: false, furnished: false,
    availableFrom: '',
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const toggleBool = (key: 'utilities' | 'parking' | 'pets' | 'furnished') =>
    setForm((f) => ({ ...f, [key]: !f[key] }));

  const isLastStep = step === STEPS.length - 1;
  const provinceObj = CANADIAN_PROVINCES.find((p) => p.code === form.province);
  const cities = CANADIAN_CITIES[form.province] ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: 'rgba(0,0,0,0.08)' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
          <Pressable
            onPress={() => step > 0 ? setStep(step - 1) : router.back()}
            style={{ width: 60 }}
          >
            <Text style={{ fontSize: 16, color: colors.primary }}>
              {step > 0 ? '← Back' : '✕ Close'}
            </Text>
          </Pressable>
          <Text style={{ flex: 1, fontSize: 17, fontWeight: '600', color: colors.text, textAlign: 'center' }}>
            New Listing
          </Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Progress */}
        <View style={{ flexDirection: 'row', gap: 4, paddingHorizontal: 16, paddingBottom: 10 }}>
          {STEPS.map((s, i) => (
            <View
              key={s}
              style={{
                flex: 1, height: 3, borderRadius: 2,
                backgroundColor: i < step ? colors.success : i === step ? colors.primary : colors.fill,
              }}
            />
          ))}
        </View>
        <Text style={{ textAlign: 'center', fontSize: 12, color: colors.textMuted, paddingBottom: 8 }}>
          Step {step + 1} of {STEPS.length} — {STEPS[step]}
        </Text>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* Step 1: Details */}
        {step === 0 && (
          <View style={{ gap: 16 }}>
            <InputField
              label="Listing Title" value={form.title}
              onChange={(v) => update('title', v)}
              placeholder="e.g. Bright 2BR in Downtown Toronto"
              required
            />
            <InputField
              label="Description" value={form.description}
              onChange={(v) => update('description', v)}
              placeholder="Describe your property, neighbourhood, nearby transit…"
              multiline
            />

            <View>
              <FieldLabel label="Property Type" required />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {PROPERTY_TYPES.map((t) => (
                  <Pressable
                    key={t.value}
                    onPress={() => update('type', t.value)}
                    style={{
                      flexDirection: 'row', alignItems: 'center', gap: 6,
                      paddingHorizontal: 14, paddingVertical: 9,
                      borderRadius: radius.full,
                      borderWidth: 1.5,
                      borderColor: form.type === t.value ? colors.primary : colors.borderLight,
                      backgroundColor: form.type === t.value ? colors.primaryLight : '#fff',
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>{t.icon}</Text>
                    <Text style={{
                      fontSize: 13, fontWeight: '500', textTransform: 'capitalize',
                      color: form.type === t.value ? colors.primary : colors.text,
                    }}>
                      {t.value}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View>
              <FieldLabel label="Bedrooms" />
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {['0', '1', '2', '3', '4+'].map((n) => (
                  <Pressable
                    key={n}
                    onPress={() => update('bedrooms', n)}
                    style={{
                      flex: 1, paddingVertical: 10, borderRadius: radius.md,
                      backgroundColor: form.bedrooms === n ? colors.primary : colors.fill,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{
                      fontSize: 13, fontWeight: '600',
                      color: form.bedrooms === n ? '#fff' : colors.textSecondary,
                    }}>
                      {n === '0' ? 'St' : n}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View>
              <FieldLabel label="Bathrooms" />
              <View style={{ flexDirection: 'row', gap: 6 }}>
                {['1', '1.5', '2', '2.5', '3+'].map((n) => (
                  <Pressable
                    key={n}
                    onPress={() => update('bathrooms', n)}
                    style={{
                      flex: 1, paddingVertical: 10, borderRadius: radius.md,
                      backgroundColor: form.bathrooms === n ? colors.primary : colors.fill,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{
                      fontSize: 12, fontWeight: '600',
                      color: form.bathrooms === n ? '#fff' : colors.textSecondary,
                    }}>
                      {n}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <InputField
              label="Square Footage (optional)" value={form.sqft}
              onChange={(v) => update('sqft', v)}
              placeholder="e.g. 750" keyboard="numeric"
            />
          </View>
        )}

        {/* Step 2: Location */}
        {step === 1 && (
          <View style={{ gap: 16 }}>
            <InputField
              label="Street Address" value={form.address}
              onChange={(v) => update('address', v)}
              placeholder="123 Main St" required
            />

            <View>
              <FieldLabel label="Province" required />
              <Pressable
                onPress={() => setShowProvinceSheet(true)}
                style={{
                  backgroundColor: colors.fill, borderRadius: radius.lg,
                  paddingHorizontal: 14, paddingVertical: 14,
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 15, color: colors.text }}>
                  {provinceObj ? `${provinceObj.name} (${provinceObj.code})` : 'Select province'}
                </Text>
                <Text style={{ fontSize: 16, color: colors.textMuted }}>›</Text>
              </Pressable>
            </View>

            <View>
              <FieldLabel label="City" required />
              <Pressable
                onPress={() => setShowCitySheet(true)}
                style={{
                  backgroundColor: colors.fill, borderRadius: radius.lg,
                  paddingHorizontal: 14, paddingVertical: 14,
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 15, color: form.city ? colors.text : colors.textPlaceholder }}>
                  {form.city || 'Select city'}
                </Text>
                <Text style={{ fontSize: 16, color: colors.textMuted }}>›</Text>
              </Pressable>
            </View>

            <InputField
              label="Postal Code" value={form.postalCode}
              onChange={(v) => update('postalCode', v.toUpperCase())}
              placeholder="M5V 2B3" required
            />

            <View style={{ padding: 14, backgroundColor: colors.infoLight, borderRadius: radius.lg }}>
              <Text style={{ fontSize: 13, color: colors.info, lineHeight: 19 }}>
                📍 We'll use this address to place your listing on the map.
              </Text>
            </View>
          </View>
        )}

        {/* Step 3: Pricing */}
        {step === 2 && (
          <View style={{ gap: 16 }}>
            <View style={{ padding: 14, backgroundColor: colors.primaryLight, borderRadius: radius.lg }}>
              <Text style={{ fontSize: 13, color: colors.primary, lineHeight: 19 }}>
                💡 Offer discounts for longer leases to attract quality tenants. A typical discount is 5–10% for 12-month leases.
              </Text>
            </View>

            <InputField
              label="Monthly Rent — 12-month lease" value={form.price12}
              onChange={(v) => update('price12', v)}
              placeholder="2,400" keyboard="numeric" prefix="$" required
            />
            <InputField
              label="Monthly Rent — 6-month lease (optional)" value={form.price6}
              onChange={(v) => update('price6', v)}
              placeholder="2,640" keyboard="numeric" prefix="$"
            />
            <InputField
              label="Monthly Rent — 3-month lease (optional)" value={form.price3}
              onChange={(v) => update('price3', v)}
              placeholder="2,760" keyboard="numeric" prefix="$"
            />
            <InputField
              label="Security Deposit" value={form.deposit}
              onChange={(v) => update('deposit', v)}
              placeholder="Typically one month's rent" keyboard="numeric" prefix="$" required
            />
            <InputField
              label="Available From" value={form.availableFrom}
              onChange={(v) => update('availableFrom', v)}
              placeholder="YYYY-MM-DD (e.g. 2026-06-01)"
            />
          </View>
        )}

        {/* Step 4: Features */}
        {step === 3 && (
          <View style={{ gap: 2 }}>
            {([
              { key: 'utilities' as const, label: 'Utilities Included', sub: 'Heat, water, electricity', icon: '💡' },
              { key: 'parking' as const, label: 'Parking Included', sub: 'Dedicated parking spot', icon: '🅿️' },
              { key: 'pets' as const, label: 'Pet Friendly', sub: 'Cats and/or dogs allowed', icon: '🐾' },
              { key: 'furnished' as const, label: 'Furnished', sub: 'Comes with furniture', icon: '🛋️' },
            ]).map((f) => (
              <View
                key={f.key}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 14,
                  paddingVertical: 14, paddingHorizontal: 16,
                  backgroundColor: colors.card, ...shadow.sm,
                  marginBottom: 2,
                  borderRadius: radius.lg,
                }}
              >
                <View style={{
                  width: 40, height: 40, borderRadius: radius.md,
                  backgroundColor: form[f.key] ? colors.primaryLight : colors.fillTertiary,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: 18 }}>{f.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: colors.text }}>{f.label}</Text>
                  <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>{f.sub}</Text>
                </View>
                <Switch
                  value={form[f.key]}
                  onValueChange={() => toggleBool(f.key)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#fff"
                />
              </View>
            ))}

            <View style={{ marginTop: 20, padding: 14, backgroundColor: colors.accentLight, borderRadius: radius.lg }}>
              <Text style={{ fontSize: 13, color: colors.accent, lineHeight: 19 }}>
                ✓ Your listing will be reviewed within 24 hours before going live.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Province sheet */}
      {showProvinceSheet && (
        <Pressable
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}
          onPress={() => setShowProvinceSheet(false)}
        >
          <Pressable onPress={() => {}}>
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: radius.xxl, borderTopRightRadius: radius.xxl, paddingBottom: Platform.OS === 'ios' ? 40 : 20 }}>
              <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: colors.separator, alignSelf: 'center', marginTop: 12, marginBottom: 16 }} />
              <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text, textAlign: 'center', marginBottom: 8 }}>Select Province</Text>
              <ScrollView style={{ maxHeight: 340 }} keyboardShouldPersistTaps="handled">
                {CANADIAN_PROVINCES.map((p) => (
                  <Pressable
                    key={p.code}
                    onPress={() => { update('province', p.code); update('city', CANADIAN_CITIES[p.code]?.[0] ?? ''); setShowProvinceSheet(false); }}
                    style={({ pressed }) => ({
                      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                      paddingHorizontal: 20, paddingVertical: 13,
                      backgroundColor: pressed || form.province === p.code ? colors.fillTertiary : 'transparent',
                      borderBottomWidth: 0.5, borderBottomColor: colors.separator,
                    })}
                  >
                    <Text style={{ fontSize: 15, color: colors.text }}>{p.name}</Text>
                    <Text style={{ fontSize: 14, color: form.province === p.code ? colors.primary : colors.textMuted, fontWeight: '500' }}>{p.code}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      )}

      {/* City sheet */}
      {showCitySheet && (
        <Pressable
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}
          onPress={() => setShowCitySheet(false)}
        >
          <Pressable onPress={() => {}}>
            <View style={{ backgroundColor: '#fff', borderTopLeftRadius: radius.xxl, borderTopRightRadius: radius.xxl, paddingBottom: Platform.OS === 'ios' ? 40 : 20 }}>
              <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: colors.separator, alignSelf: 'center', marginTop: 12, marginBottom: 16 }} />
              <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text, textAlign: 'center', marginBottom: 8 }}>Select City</Text>
              <ScrollView style={{ maxHeight: 300 }} keyboardShouldPersistTaps="handled">
                {cities.map((city) => (
                  <Pressable
                    key={city}
                    onPress={() => { update('city', city); setShowCitySheet(false); }}
                    style={({ pressed }) => ({
                      paddingHorizontal: 20, paddingVertical: 13,
                      backgroundColor: pressed || form.city === city ? colors.fillTertiary : 'transparent',
                      borderBottomWidth: 0.5, borderBottomColor: colors.separator,
                    })}
                  >
                    <Text style={{ fontSize: 15, color: form.city === city ? colors.primary : colors.text, fontWeight: form.city === city ? '600' : '400' }}>{city}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      )}

      {/* Sticky CTA */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderTopWidth: 0.5, borderTopColor: 'rgba(0,0,0,0.08)',
        paddingHorizontal: 20, paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 32 : 16,
      }}>
        <Pressable
          style={{
            backgroundColor: isLastStep ? colors.success : colors.primary,
            paddingVertical: 15, borderRadius: radius.xl, alignItems: 'center',
          }}
          onPress={() => isLastStep ? router.back() : setStep(step + 1)}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
            {isLastStep ? 'Publish Listing 🎉' : 'Continue →'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
