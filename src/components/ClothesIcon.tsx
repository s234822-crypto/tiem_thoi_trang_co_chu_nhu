/**
 * ClothesIcon — Restored to original clean Emoji icons representation.
 */

import React from 'react';

export type ClothesIconName =
  | 'top' | 'bottom' | 'skirt' | 'dress' | 'shoes' | 'bag' | 'accessory'
  | 'tshirt' | 'croptop' | 'blouse' | 'shirt' | 'hoodie' | 'sweater' | 'cardigan' | 'blazer'
  | 'jeans' | 'trousers' | 'shorts' | 'wide_leg' | 'cargo' | 'legging'
  | 'aline_skirt' | 'tennis_skirt' | 'midi_skirt' | 'long_skirt'
  | 'office_dress' | 'party_dress' | 'floral_dress' | 'maxi_dress' | 'babydoll_dress'
  | 'sneaker' | 'heels' | 'sandal' | 'boots' | 'loafer' | 'mary_jane'
  | 'tote' | 'mini_bag' | 'shoulder_bag' | 'office_bag' | 'luxury_bag'
  | 'glasses' | 'hat' | 'earrings' | 'necklace' | 'bracelet' | 'belt' | 'hair_clip';

const EMOJI_MAP: Record<string, string> = {
  // Primary slots
  top: '👚',
  bottom: '👖',
  skirt: '👗',
  dress: '👗',
  shoes: '👠',
  bag: '👜',
  accessory: '👒',

  // Tops
  tshirt: '👕',
  croptop: '👚',
  blouse: '👚',
  shirt: '👔',
  hoodie: '🧥',
  sweater: '🧶',
  cardigan: '🧶',
  blazer: '🧥',

  // Bottoms
  jeans: '👖',
  trousers: '👖',
  shorts: '🩳',
  wide_leg: '👖',
  cargo: '👖',
  legging: '👖',

  // Skirts
  aline_skirt: '👗',
  tennis_skirt: '👗',
  midi_skirt: '👗',
  long_skirt: '👗',

  // Dresses
  office_dress: '👗',
  party_dress: '👗',
  floral_dress: '👗',
  maxi_dress: '👗',
  babydoll_dress: '👗',

  // Shoes
  sneaker: '👟',
  heels: '👠',
  sandal: '👡',
  boots: '👢',
  loafer: '👞',
  mary_jane: '👠',

  // Bags
  tote: '🛍️',
  mini_bag: '👛',
  shoulder_bag: '👜',
  office_bag: '💼',
  luxury_bag: '👜',

  // Accessories
  glasses: '🕶️',
  hat: '👒',
  earrings: '💎',
  necklace: '📿',
  bracelet: '💍',
  belt: '🎗️',
  hair_clip: '🎀',
};

interface ClothesIconProps {
  name: ClothesIconName | string;
  size?: number;
  color?: string; // Kept for interface compatibility
  className?: string;
}

export const ClothesIcon: React.FC<ClothesIconProps> = ({
  name,
  size = 28,
  className = '',
}) => {
  const emoji = EMOJI_MAP[name] || '👚';

  return (
    <span
      className={`inline-flex items-center justify-center leading-none select-none ${className}`}
      style={{
        fontSize: `${Math.round(size * 0.75)}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      role="img"
      aria-label={name}
    >
      {emoji}
    </span>
  );
};

export default ClothesIcon;
