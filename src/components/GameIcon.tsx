/**
 * GameIcon — Unified icon component for Tiệm Thời Trang Cô Chủ Như.
 *
 * Usage:
 *   <GameIcon name="shop" size={24} />
 *   <GameIcon name="money" size={20} className="inline-block" />
 *
 * All icons are loaded from /assets/icons/ as inline SVG <img> tags
 * so they scale sharply on all DPR screens.
 */

import React from 'react';

// ─── Icon registry ────────────────────────────────────────────────────────────

export type GameIconName =
  // Navigation
  | 'home' | 'shop' | 'inventory' | 'restock' | 'upgrade' | 'decor'
  // Header / Stats
  | 'money' | 'exp' | 'rating' | 'day' | 'level' | 'mission' | 'achievement'
  // Products
  | 'top' | 'bottom' | 'dress' | 'shoes' | 'bag' | 'accessory' | 'outfit'
  // Customer
  | 'vip' | 'patience'
  // Rewards
  | 'gift' | 'levelup';

type IconCategory = 'navigation' | 'header' | 'products' | 'customer' | 'rewards';

interface IconMeta {
  file: string;
  category: IconCategory;
  label: string;
}

const ICON_MAP: Record<GameIconName, IconMeta> = {
  // ── Navigation ──────────────────────────────────────────────────────────────
  home: { file: 'icon-home.svg', category: 'navigation', label: 'Trang chủ' },
  shop: { file: 'icon-shop.svg', category: 'navigation', label: 'Tiệm' },
  inventory: { file: 'icon-inventory.svg', category: 'navigation', label: 'Kho hàng' },
  restock: { file: 'icon-restock.svg', category: 'navigation', label: 'Nhập hàng' },
  upgrade: { file: 'icon-upgrade.svg', category: 'navigation', label: 'Nâng cấp' },
  decor: { file: 'icon-decor.svg', category: 'navigation', label: 'Trang trí' },

  // ── Header / Stats ──────────────────────────────────────────────────────────
  money: { file: 'icon-money.svg', category: 'header', label: 'Tiền' },
  exp: { file: 'icon-exp.svg', category: 'header', label: 'EXP' },
  rating: { file: 'icon-rating.svg', category: 'header', label: 'Xếp hạng' },
  day: { file: 'icon-day.svg', category: 'header', label: 'Ngày' },
  level: { file: 'icon-level.svg', category: 'header', label: 'Level' },
  mission: { file: 'icon-mission.svg', category: 'header', label: 'Nhiệm vụ' },
  achievement: { file: 'icon-achievement.svg', category: 'header', label: 'Thành tựu' },

  // ── Products ────────────────────────────────────────────────────────────────
  top: { file: 'icon-top.svg', category: 'products', label: 'Áo' },
  bottom: { file: 'icon-bottom.svg', category: 'products', label: 'Quần / Váy' },
  dress: { file: 'icon-dress.svg', category: 'products', label: 'Đầm' },
  shoes: { file: 'icon-shoes.svg', category: 'products', label: 'Giày' },
  bag: { file: 'icon-bag.svg', category: 'products', label: 'Túi xách' },
  accessory: { file: 'icon-accessory.svg', category: 'products', label: 'Phụ kiện' },
  outfit: { file: 'icon-outfit.svg', category: 'products', label: 'Set đồ' },

  // ── Customer ────────────────────────────────────────────────────────────────
  vip: { file: 'icon-vip.svg', category: 'customer', label: 'VIP' },
  patience: { file: 'icon-patience.svg', category: 'customer', label: 'Kiên nhẫn' },

  // ── Rewards ─────────────────────────────────────────────────────────────────
  gift: { file: 'icon-gift.svg', category: 'rewards', label: 'Quà' },
  levelup: { file: 'icon-levelup.svg', category: 'rewards', label: 'Lên cấp' },
};

// Build the public URL for a given icon
function iconUrl(name: GameIconName): string {
  const { file, category } = ICON_MAP[name];
  return `/assets/icons/${category}/${file}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface GameIconProps {
  name: GameIconName;
  /** px size (width = height). Default: 24 */
  size?: number;
  /** Extra Tailwind / CSS classes */
  className?: string;
  /** Override alt text; defaults to the icon label */
  alt?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Visually dim the icon (disabled state) */
  disabled?: boolean;
}

export const GameIcon: React.FC<GameIconProps> = ({
  name,
  size = 24,
  className = '',
  alt,
  onClick,
  disabled = false,
}) => {
  const meta = ICON_MAP[name];
  if (!meta) return null;

  return (
    <img
      src={iconUrl(name)}
      alt={alt ?? meta.label}
      width={size}
      height={size}
      draggable={false}
      onClick={onClick}
      style={{ width: size, height: size, opacity: disabled ? 0.4 : 1 }}
      className={`select-none shrink-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    />
  );
};

// ─── Icon Grid (dev preview / style guide) ───────────────────────────────────

export const GameIconGrid: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const categories: IconCategory[] = ['navigation', 'header', 'products', 'customer', 'rewards'];
  const categoryLabels: Record<IconCategory, string> = {
    navigation: '🗺️ Navigation',
    header: '📊 Header / Stats',
    products: '👗 Products',
    customer: '👤 Customer',
    rewards: '🎁 Rewards',
  };

  return (
    <div className="p-4 bg-[#FFF8F4] rounded-2xl space-y-4">
      <h2 className="text-sm font-black text-[#3E3431] text-center tracking-wider uppercase">
        🌸 Icon System — Tiệm Thời Trang Cô Chủ Như
      </h2>
      {categories.map((cat) => {
        const icons = (Object.entries(ICON_MAP) as [GameIconName, IconMeta][]).filter(
          ([, meta]) => meta.category === cat,
        );
        return (
          <div key={cat}>
            <div className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest mb-2">
              {categoryLabels[cat]}
            </div>
            <div className="flex flex-wrap gap-3">
              {icons.map(([name, meta]) => (
                <div key={name} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl border border-[#F2E1CF] shadow-xs hover:border-[#D87C9B] transition-colors">
                    <GameIcon name={name} size={size} />
                  </div>
                  <span className="text-[9px] text-[#6F554A] font-medium text-center max-w-[56px] leading-tight">
                    {meta.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GameIcon;
