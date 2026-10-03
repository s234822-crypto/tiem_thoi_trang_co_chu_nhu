/**
 * ClothesIcon — Cute, Pastel, Vector SVG Icon Renderer for Fashion Boutique
 * Supports transparent backgrounds, pastel themes, and clear mobile rendering.
 */

import React from 'react';

export type ClothesIconName =
  | 'top' | 'bottom' | 'skirt' | 'dress' | 'shoes' | 'bag' | 'accessory' | 'jackets'
  | 'tshirt' | 'croptop' | 'blouse' | 'shirt' | 'hoodie' | 'sweater' | 'cardigan' | 'blazer' | 'jacket_top'
  | 'jeans' | 'trousers' | 'shorts' | 'wide_leg' | 'cargo' | 'legging'
  | 'aline_skirt' | 'tennis_skirt' | 'midi_skirt' | 'long_skirt' | 'denim_skirt'
  | 'office_dress' | 'party_dress' | 'floral_dress' | 'maxi_dress' | 'babydoll_dress' | 'body_dress'
  | 'sneaker' | 'heels' | 'sandal' | 'boots' | 'loafer' | 'mary_jane'
  | 'tote' | 'mini_bag' | 'shoulder_bag' | 'office_bag' | 'luxury_bag'
  | 'glasses' | 'hat' | 'earrings' | 'necklace' | 'bracelet' | 'belt' | 'hair_clip';

const EMOJI_MAP: Record<string, string> = {
  top: '👚', bottom: '👖', skirt: '👗', dress: '👗', jackets: '🧥',
  shoes: '👠', bag: '👜', accessory: '👑',
  tshirt: '👕', croptop: '👚', blouse: '👚', shirt: '👔', hoodie: '🧥', sweater: '🧶', cardigan: '🧶', blazer: '🧥', jacket_top: '🧥',
  jeans: '👖', trousers: '👖', shorts: '🩳', wide_leg: '👖', cargo: '👖', legging: '👖',
  aline_skirt: '👗', tennis_skirt: '👗', midi_skirt: '👗', long_skirt: '👗', denim_skirt: '👗',
  office_dress: '👗', party_dress: '👗', floral_dress: '👗', maxi_dress: '👗', babydoll_dress: '👗', body_dress: '👗',
  sneaker: '👟', heels: '👠', sandal: '👡', boots: '👢', loafer: '👞', mary_jane: '👠',
  tote: '🛍️', mini_bag: '👛', shoulder_bag: '👜', office_bag: '💼', luxury_bag: '👑',
  glasses: '🕶️', hat: '👒', earrings: '💎', necklace: '📿', bracelet: '💍', belt: '🎗️', hair_clip: '🎀',
};

interface ClothesIconProps {
  name: ClothesIconName | string;
  size?: number;
  color?: string;
  fallbackEmoji?: string;
  className?: string;
}

export const ClothesIcon: React.FC<ClothesIconProps> = ({
  name,
  size = 28,
  color,
  fallbackEmoji,
  className = '',
}) => {
  const mainColor = color || '#D87C9B';

  const renderSVGIcon = () => {
    switch (name) {
      // ══════════════════════════════════════════
      // TOPS & JACKETS
      // ══════════════════════════════════════════
      case 'croptop':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M10 10 L14 7 L22 7 L26 10 L30 14 L26 17 L24 15 L24 23 L12 23 L12 15 L10 17 L6 14 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M16 7 Q18 10 20 7" stroke="#3E3431" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="1.5" fill="#FFF" stroke="#3E3431" strokeWidth="1" />
          </svg>
        );

      case 'tshirt':
      case 'top':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M10 10 L14 7 L22 7 L26 10 L31 13 L27 18 L24 15 L24 28 L12 28 L12 15 L9 18 L5 13 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M15 7 Q18 11 21 7" stroke="#3E3431" strokeWidth="1.5" />
          </svg>
        );

      case 'blouse':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M9 11 Q14 7 18 10 Q22 7 27 11 L31 15 L27 19 L24 17 L24 28 L12 28 L12 17 L9 19 L5 15 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M18 10 L18 28" stroke="#3E3431" strokeWidth="1.2" strokeDasharray="2 2" />
            <path d="M15 13 C16 11 20 11 21 13 C20 15 16 15 15 13 Z" fill="#FFF" stroke="#3E3431" strokeWidth="1" />
          </svg>
        );

      case 'shirt':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M11 9 L15 6 L21 6 L25 9 L29 13 L26 17 L23 15 L23 29 L13 29 L13 15 L10 17 L7 13 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M15 6 L18 12 L21 6" fill="#FFF" stroke="#3E3431" strokeWidth="1.2" />
            <circle cx="18" cy="16" r="1" fill="#3E3431" />
            <circle cx="18" cy="21" r="1" fill="#3E3431" />
            <circle cx="18" cy="26" r="1" fill="#3E3431" />
          </svg>
        );

      case 'hoodie':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M13 6 C13 3 23 3 23 6 L27 9 L31 14 L27 19 L24 17 L24 29 L12 29 L12 17 L9 19 L5 14 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M15 22 Q18 21 21 22 L21 27 L15 27 Z" fill="#FFF" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M16 9 L16 14 M20 9 L20 14" stroke="#3E3431" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case 'sweater':
      case 'cardigan':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M10 10 L14 7 L22 7 L26 10 L30 14 L26 18 L23 16 L23 29 L13 29 L13 16 L10 18 L6 14 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M14 7 L18 15 L22 7" stroke="#3E3431" strokeWidth="1.4" />
            <path d="M13 26 L23 26" stroke="#3E3431" strokeWidth="1.5" />
          </svg>
        );

      case 'blazer':
      case 'jackets':
      case 'jacket_top':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M10 9 L14 5 L22 5 L26 9 L30 14 L26 18 L24 16 L24 30 L12 30 L12 16 L10 18 L6 14 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M14 5 L17 14 L12 16 L12 30" fill="#FFF" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M22 5 L19 14 L24 16 L24 30" fill="#FFF" stroke="#3E3431" strokeWidth="1.2" />
            <circle cx="19" cy="22" r="1.2" fill="#3E3431" />
          </svg>
        );

      // ══════════════════════════════════════════
      // BOTTOMS
      // ══════════════════════════════════════════
      case 'jeans':
      case 'trousers':
      case 'cargo':
      case 'bottom':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M10 7 L26 7 L25 15 L23 30 L19 30 L18 17 L17 17 L13 30 L9 30 L7 15 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M10 11 L26 11" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M18 11 L18 17" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M12 14 Q14 16 16 14" stroke="#3E3431" strokeWidth="1" />
            <path d="M20 14 Q22 16 24 14" stroke="#3E3431" strokeWidth="1" />
          </svg>
        );

      case 'shorts':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M9 8 L27 8 L26 14 L25 21 L19 21 L18 15 L17 15 L11 21 L10 21 L9 14 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 12 L27 12" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M18 12 L18 15" stroke="#3E3431" strokeWidth="1.2" />
          </svg>
        );

      case 'wide_leg':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M11 7 L25 7 L27 30 L20 30 L18 17 L16 30 L9 30 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M11 11 L25 11" stroke="#3E3431" strokeWidth="1.2" />
          </svg>
        );

      // ══════════════════════════════════════════
      // SKIRTS
      // ══════════════════════════════════════════
      case 'skirt':
      case 'aline_skirt':
      case 'tennis_skirt':
      case 'denim_skirt':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M13 8 L23 8 L28 25 L8 25 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M13 12 L23 12" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M13 12 L11 25 M18 12 L18 25 M23 12 L25 25" stroke="#3E3431" strokeWidth="1.2" />
          </svg>
        );

      case 'midi_skirt':
      case 'long_skirt':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M13 7 L23 7 L29 29 L7 29 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M13 11 L23 11" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M14 11 Q18 29 22 11" stroke="#3E3431" strokeWidth="1" />
          </svg>
        );

      // ══════════════════════════════════════════
      // DRESSES
      // ══════════════════════════════════════════
      case 'dress':
      case 'office_dress':
      case 'party_dress':
      case 'floral_dress':
      case 'babydoll_dress':
      case 'maxi_dress':
      case 'body_dress':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M13 6 L16 4 L20 4 L23 6 L25 12 L21 14 L28 30 L8 30 L15 14 L11 12 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M16 4 Q18 8 20 4" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M15 14 L21 14" stroke="#3E3431" strokeWidth="1.4" />
            <circle cx="18" cy="18" r="1.5" fill="#FFF" stroke="#3E3431" strokeWidth="1" />
          </svg>
        );

      // ══════════════════════════════════════════
      // SHOES
      // ══════════════════════════════════════════
      case 'sneaker':
      case 'shoes':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M6 22 L11 13 C14 13 17 15 22 15 L29 17 C31 18 31 22 29 24 L6 24 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M6 24 L29 24 L29 27 L6 27 Z" fill="#FFF" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M15 14 L18 18 M18 14 L21 18" stroke="#3E3431" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case 'heels':
      case 'mary_jane':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M6 20 C10 20 16 19 22 15 L28 17 L30 22 C26 24 16 24 6 24 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M7 24 L7 29 L9 29 L10 24" fill="#3E3431" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M18 16 Q20 14 22 15" stroke="#3E3431" strokeWidth="1.2" />
          </svg>
        );

      case 'boots':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M12 8 L20 8 L20 18 L27 20 C29 21 29 24 27 26 L8 26 L8 12 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8 26 L27 26 L27 29 L8 29 Z" fill="#3E3431" stroke="#3E3431" strokeWidth="1.2" />
            <path d="M14 12 L18 12 M14 15 L18 15 M14 18 L18 18" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case 'sandal':
      case 'loafer':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M6 22 L12 16 L20 16 L29 19 C31 20 31 23 29 25 L6 25 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M6 25 L29 25 L29 27 L6 27 Z" fill="#FFF" stroke="#3E3431" strokeWidth="1.2" />
          </svg>
        );

      // ══════════════════════════════════════════
      // BAGS
      // ══════════════════════════════════════════
      case 'bag':
      case 'tote':
      case 'shoulder_bag':
      case 'office_bag':
      case 'luxury_bag':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M13 13 C13 7 23 7 23 13" stroke="#3E3431" strokeWidth="2" strokeLinecap="round" fill="none" />
            <rect x="7" y="13" width="22" height="17" rx="3" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" />
            <path d="M18 13 L18 30" stroke="#3E3431" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="18" cy="20" r="2" fill="#D9A441" stroke="#3E3431" strokeWidth="1" />
          </svg>
        );

      case 'mini_bag':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M18 6 L8 16 M18 6 L28 16" stroke="#3E3431" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
            <rect x="9" y="16" width="18" height="14" rx="3" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" />
            <path d="M9 20 L18 25 L27 20" fill="none" stroke="#3E3431" strokeWidth="1.2" />
            <circle cx="18" cy="25" r="1.5" fill="#D9A441" />
          </svg>
        );

      // ══════════════════════════════════════════
      // ACCESSORIES
      // ══════════════════════════════════════════
      case 'glasses':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <circle cx="11" cy="18" r="6" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" />
            <circle cx="25" cy="18" r="6" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" />
            <path d="M17 18 L19 18" stroke="#3E3431" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 16 L5 13 M31 16 L31 13" stroke="#3E3431" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );

      case 'hat':
      case 'accessory':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <ellipse cx="18" cy="24" rx="14" ry="4" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" />
            <path d="M11 23 C11 13 25 13 25 23 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" />
            <path d="M11 21 C15 23 21 23 25 21" stroke="#FFF" strokeWidth="2" />
          </svg>
        );

      case 'earrings':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <circle cx="12" cy="10" r="2" fill="#D9A441" stroke="#3E3431" strokeWidth="1" />
            <path d="M12 12 L12 17" stroke="#3E3431" strokeWidth="1.2" />
            <polygon points="12,17 15,22 12,27 9,22" fill={mainColor} stroke="#3E3431" strokeWidth="1.5" />

            <circle cx="24" cy="10" r="2" fill="#D9A441" stroke="#3E3431" strokeWidth="1" />
            <path d="M24 12 L24 17" stroke="#3E3431" strokeWidth="1.2" />
            <polygon points="24,17 27,22 24,27 21,22" fill={mainColor} stroke="#3E3431" strokeWidth="1.5" />
          </svg>
        );

      case 'necklace':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M8 8 C8 24 28 24 28 8" stroke="#D9A441" strokeWidth="2" strokeDasharray="3 2" fill="none" />
            <path d="M18 20 L15 25 L18 28 L21 25 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.5" />
          </svg>
        );

      case 'hair_clip':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <path d="M8 18 C12 12 16 12 18 18 C20 12 24 12 28 18 C24 24 20 24 18 18 C16 24 12 24 8 18 Z" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" />
            <circle cx="18" cy="18" r="2.5" fill="#FFF" stroke="#3E3431" strokeWidth="1" />
          </svg>
        );

      case 'belt':
        return (
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-2xs">
            <rect x="4" y="15" width="28" height="6" rx="2" fill={mainColor} stroke="#3E3431" strokeWidth="1.8" />
            <rect x="15" y="13" width="6" height="10" rx="1.5" fill="#D9A441" stroke="#3E3431" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="1" fill="#3E3431" />
          </svg>
        );

      default:
        return null;
    }
  };

  const svgElement = renderSVGIcon();

  if (svgElement) {
    return (
      <span
        className={`inline-flex items-center justify-center select-none shrink-0 transition-transform ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {svgElement}
      </span>
    );
  }

  // Fallback to emoji if no matching SVG icon found
  const emoji = fallbackEmoji || EMOJI_MAP[name] || '👚';
  return (
    <span
      className={`inline-flex items-center justify-center leading-none select-none ${className}`}
      style={{
        fontSize: `${Math.round(size * 0.72)}px`,
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
