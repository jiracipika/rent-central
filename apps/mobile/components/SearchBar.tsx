import { View, TextInput } from 'react-native';
import { colors } from '@/lib/theme';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
      <Text className="mr-2 text-base" style={{ color: colors.textMuted }}>🔍</Text>
      <TextInput
        className="flex-1 text-base"
        style={{ color: colors.text }}
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
