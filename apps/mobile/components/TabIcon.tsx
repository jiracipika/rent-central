import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TabIconProps {
  name: 'home' | 'search' | 'bookmark' | 'message' | 'user';
  color: string;
  focused: boolean;
}

const ICON_OUTLINE: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home-outline',
  search: 'search-outline',
  bookmark: 'heart-outline',
  message: 'chatbubble-outline',
  user: 'person-outline',
};

const ICON_FILLED: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: 'home',
  search: 'search',
  bookmark: 'heart',
  message: 'chatbubble',
  user: 'person',
};

export function TabIcon({ name, color, focused }: TabIconProps) {
  const iconName = focused ? ICON_FILLED[name] : ICON_OUTLINE[name];

  return (
    <View style={{ width: 28, height: 28, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons
        name={iconName}
        size={focused ? 26 : 24}
        color={color}
      />
    </View>
  );
}
