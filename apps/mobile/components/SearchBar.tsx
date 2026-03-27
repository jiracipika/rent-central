import { View, Text, TextInput } from 'react-native';
import { colors, radius } from '@/lib/theme';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.fill, borderRadius: radius.lg, paddingHorizontal: 16, paddingVertical: 12 }}>
      <Text style={{ marginRight: 8, fontSize: 16, color: colors.textMuted }}>🔍</Text>
      <TextInput
        style={{ flex: 1, fontSize: 15, color: colors.text }}
        placeholder="Search by postal code..."
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChange}
        autoCapitalize="characters"
        autoComplete="postal-code"
      />
    </View>
  );
}
