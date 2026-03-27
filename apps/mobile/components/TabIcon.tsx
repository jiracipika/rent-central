import { Text } from 'react-native';
import { colors } from '@/lib/theme';

interface TabIconProps {
  name: 'home' | 'search' | 'bookmark' | 'message' | 'user';
  color: string;
  focused: boolean;
}

const ICONS: Record<string, string> = {
  home: '🏠',
  search: '🔍',
  bookmark: '❤️',
  message: '💬',
  user: '👤',
};

export function TabIcon({ name, color }: TabIconProps) {
  return (
    <Text className="text-xl" style={{ color }}>
      {ICONS[name] || '●'}
    </Text>
  );
}
