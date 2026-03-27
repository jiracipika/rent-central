import { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, radius, shadow } from '@/lib/theme';
import type { ReactNode } from 'react';

const STEPS = ['Personal', 'Employment', 'References', 'Review'];

export default function ApplyScreen() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    employer: '', position: '', income: '',
    ref1Name: '', ref1Phone: '', ref2Name: '', ref2Phone: '',
    message: '', term: '12',
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isLastStep = step === STEPS.length - 1;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: 'rgba(0,0,0,0.08)' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
          <Pressable onPress={() => (step > 0 ? setStep(step - 1) : router.back())}>
            <Text style={{ fontSize: 16, color: colors.primary, width: 52 }}>
              {step > 0 ? '← Back' : '✕ Close'}
            </Text>
          </Pressable>
          <Text style={{ flex: 1, fontSize: 17, fontWeight: '600', color: colors.text, textAlign: 'center' }}>
            Apply for Rental
          </Text>
          <View style={{ width: 52 }} />
        </View>

        {/* Progress */}
        <View style={{ flexDirection: 'row', gap: 4, paddingHorizontal: 16, paddingBottom: 10 }}>
          {STEPS.map((s, i) => (
            <View key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              backgroundColor: i <= step ? colors.primary : colors.fill,
            }} />
          ))}
        </View>
        <Text style={{ textAlign: 'center', fontSize: 12, color: colors.textMuted, paddingBottom: 8 }}>
          Step {step + 1} of {STEPS.length} — {STEPS[step]}
        </Text>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {step === 0 && (
          <View style={{ gap: 14 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 4 }}>
              Personal Information
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <FormField label="First Name" value={form.firstName} onChange={(v) => update('firstName', v)} style={{ flex: 1 }} />
              <FormField label="Last Name" value={form.lastName} onChange={(v) => update('lastName', v)} style={{ flex: 1 }} />
            </View>
            <FormField label="Email Address" value={form.email} onChange={(v) => update('email', v)} keyboard="email-address" />
            <FormField label="Phone Number" value={form.phone} onChange={(v) => update('phone', v)} keyboard="phone-pad" />

            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text, marginTop: 8 }}>Preferred Lease Term</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {(['3', '6', '12'] as const).map((t) => (
                <Pressable key={t} onPress={() => update('term', t)} style={{
                  flex: 1, paddingVertical: 12, borderRadius: radius.lg,
                  backgroundColor: form.term === t ? colors.primary : colors.fill,
                  alignItems: 'center',
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: form.term === t ? '#fff' : colors.textSecondary }}>
                    {t} months
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {step === 1 && (
          <View style={{ gap: 14 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 4 }}>
              Employment Details
            </Text>
            <FormField label="Employer / Company" value={form.employer} onChange={(v) => update('employer', v)} />
            <FormField label="Job Title" value={form.position} onChange={(v) => update('position', v)} />
            <FormField label="Annual Income (CAD)" value={form.income} onChange={(v) => update('income', v)} keyboard="numeric" prefix="$" />
            <View style={{ backgroundColor: colors.fillTertiary, borderRadius: radius.lg, padding: 14 }}>
              <Text style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 20 }}>
                Income is shared only with the landlord. Aim for 3× monthly rent in annual income.
              </Text>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={{ gap: 14 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 4 }}>
              References
            </Text>
            <Text style={{ fontSize: 14, color: colors.textMuted }}>
              Provide at least one reference — previous landlord, employer, or personal.
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Reference 1</Text>
            <FormField label="Full Name" value={form.ref1Name} onChange={(v) => update('ref1Name', v)} />
            <FormField label="Phone" value={form.ref1Phone} onChange={(v) => update('ref1Phone', v)} keyboard="phone-pad" />
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 8 }}>Reference 2 (optional)</Text>
            <FormField label="Full Name" value={form.ref2Name} onChange={(v) => update('ref2Name', v)} />
            <FormField label="Phone" value={form.ref2Phone} onChange={(v) => update('ref2Phone', v)} keyboard="phone-pad" />
            <FormField label="Message to Landlord (optional)" value={form.message} onChange={(v) => update('message', v)} multiline />
          </View>
        )}

        {step === 3 && (
          <View style={{ gap: 14 }}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 4 }}>
              Review & Submit
            </Text>
            <SummarySection title="Personal">
              <SummaryRow label="Name" value={`${form.firstName} ${form.lastName}`} />
              <SummaryRow label="Email" value={form.email} />
              <SummaryRow label="Phone" value={form.phone} />
            </SummarySection>
            <SummarySection title="Employment">
              <SummaryRow label="Employer" value={form.employer} />
              <SummaryRow label="Position" value={form.position} />
              <SummaryRow label="Income" value={form.income ? `$${parseInt(form.income).toLocaleString()}/yr` : '—'} />
            </SummarySection>
            <SummarySection title="Lease">
              <SummaryRow label="Term" value={`${form.term} months`} />
            </SummarySection>
            <View style={{ backgroundColor: colors.accentLight, borderRadius: radius.lg, padding: 14 }}>
              <Text style={{ fontSize: 13, color: colors.accent, lineHeight: 20 }}>
                ✓ By submitting you confirm all info is accurate and consent to a soft credit check.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* CTA */}
      <View style={{
        backgroundColor: 'rgba(255,255,255,0.95)', borderTopWidth: 0.5,
        borderTopColor: 'rgba(0,0,0,0.08)', paddingHorizontal: 20, paddingTop: 12,
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
            {isLastStep ? 'Submit Application' : 'Continue →'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function FormField({ label, value, onChange, keyboard, multiline, style, prefix }: {
  label: string; value: string; onChange: (v: string) => void;
  keyboard?: any; multiline?: boolean; style?: any; prefix?: string;
}) {
  return (
    <View style={style}>
      <Text style={{ fontSize: 13, fontWeight: '500', color: colors.textSecondary, marginBottom: 6 }}>{label}</Text>
      <View style={{
        flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center',
        backgroundColor: colors.fill, borderRadius: radius.lg,
      }}>
        {prefix && <Text style={{ paddingLeft: 14, fontSize: 15, color: colors.textMuted }}>{prefix}</Text>}
        <TextInput
          style={{
            flex: 1, paddingHorizontal: 14, paddingVertical: 12,
            fontSize: 15, color: colors.text,
            height: multiline ? 88 : undefined,
            textAlignVertical: multiline ? 'top' : undefined,
          }}
          value={value}
          onChangeText={onChange}
          keyboardType={keyboard ?? 'default'}
          multiline={multiline}
          autoCapitalize={keyboard === 'email-address' ? 'none' : 'words'}
          autoCorrect={false}
        />
      </View>
    </View>
  );
}

function SummarySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ backgroundColor: colors.fillTertiary, borderRadius: radius.lg, padding: 14 }}>
      <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textMuted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
      <Text style={{ fontSize: 14, color: colors.textSecondary }}>{label}</Text>
      <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text }}>{value || '—'}</Text>
    </View>
  );
}
