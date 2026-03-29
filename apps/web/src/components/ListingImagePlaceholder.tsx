/**
 * Generates a deterministic HSL color from a string seed.
 * Used for listing image placeholders with unique gradients.
 */
export function listingGradient(id: string): { from: string; to: string } {
  // Deterministic hash from id
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  const hue1 = ((hash & 0xffff) % 360);
  const hue2 = (hue1 + 40 + (hash >> 8 & 0x3f)) % 360;
  return {
    from: `hsl(${hue1}, 45%, 82%)`,
    to: `hsl(${hue2}, 50%, 75%)`,
  };
}

/**
 * Gradient + overlay for listing image placeholders.
 * Renders as a full-size absolute div.
 */
export function ListingImagePlaceholder({ id, style }: { id: string; style?: React.CSSProperties }) {
  const g = listingGradient(id);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`,
        ...style,
      }}
    />
  );
}
