import { View, Text } from 'react-native';
import { colors } from '@/lib/theme';
import type { ListingStatus } from '@rent-central/core';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  active: { label: 'Active', bg: '#10B981', text: '#FFFFFF' },
  paused: { label: 'Paused', bg: '#F59E0B', text: '#FFFFFF' },
  rented: { label: 'Rented', bg: '#6B7280', text: '#FFFFFF' },
  draft: { label: 'Draft', bg: '#E5E7EB', text: '#6B7280' },
};

interface StatusBadgeProps {
  status: ListingStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.draft;

  return (
    <View
      className="px-2.5 py-1 rounded-full"
      style={{ backgroundColor: config.bg }}
    >
      <Text className="text-xs font-semibold" style={{ color: config.text }}>
        {config.label}
      </Text>
    </View>
  );
}
