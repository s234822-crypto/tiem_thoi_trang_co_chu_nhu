import { DailyEvent, SpecialRole, StyleTag } from '../types/game';

export const DAILY_EVENTS: DailyEvent[] = [
  {
    id: 'ev-normal',
    title: 'Một Ngày Nắng Đẹp',
    description: 'Thời tiết ấm áp dịu dàng, lượng khách ghé thăm tiệm đều đặn và vui tươi.',
    badge: '☀️ Ngày Yên Bình',
    icon: '☀️',
    customerMultiplier: 1.0,
    patienceMultiplier: 1.0,
    vipChanceBoost: 0,
  },
  {
    id: 'ev-weekend-sale',
    title: 'Cuối Tuần Sôi Động',
    description: 'Dòng người tấp nập đi shopping, lượng khách ghé tiệm tăng +25%!',
    badge: '🎉 Cuối Tuần',
    icon: '🛍️',
    customerMultiplier: 1.25,
    patienceMultiplier: 0.95,
    vipChanceBoost: 0.05,
  },
  {
    id: 'ev-korean-trend',
    title: 'Cơn Sốt Phong Cách Hàn Quốc',
    description: 'Trào lưu K-Fashion bùng nổ, khách hàng cực kỳ yêu thích phong cách Korean!',
    badge: '✨ Trend Seoul',
    icon: '🌸',
    customerMultiplier: 1.1,
    patienceMultiplier: 1.0,
    vipChanceBoost: 0.04,
    featuredStyle: 'korean',
  },
  {
    id: 'ev-rainy-day',
    title: 'Trời Mưa Êm Đềm',
    description: 'Những hạt mưa rơi tí tách, khách ghé tiệm thư thả và kiên nhẫn hơn nhiều (+25% thời gian).',
    badge: '🌧️ Ngày Mưa',
    icon: '🌧️',
    customerMultiplier: 0.9,
    patienceMultiplier: 1.25,
    vipChanceBoost: 0.02,
  },
  {
    id: 'ev-vip-gala',
    title: 'Ngày Hội Quý Cô & VIP',
    description: 'Boutique thu hút nhiều Fashionista và Influencer nổi tiếng ghé thăm chụp ảnh.',
    badge: '👑 Hội Quý Cô',
    icon: '💎',
    customerMultiplier: 1.0,
    patienceMultiplier: 1.05,
    vipChanceBoost: 0.15,
  },
  {
    id: 'ev-fashion-week',
    title: 'Tuần Lễ Thời Trang Thành Phố',
    description: 'Không khí lễ hội thời trang ngập tràn, khách ưu tiên tìm kiếm trang phục Thanh lịch & Dự tiệc.',
    badge: '✨ Fashion Week',
    icon: '👗',
    customerMultiplier: 1.15,
    patienceMultiplier: 1.0,
    vipChanceBoost: 0.08,
    featuredStyle: 'elegant',
  },
];

export function getRandomDailyEvent(day: number): DailyEvent {
  if (day === 1) return DAILY_EVENTS[0]; // First day is always sunny & normal
  const candidates = DAILY_EVENTS.slice(1);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function pickSpecialRole(vipChanceBoost = 0): SpecialRole {
  const rand = Math.random();
  const vipThreshold = 0.08 + vipChanceBoost; // e.g. 8% base
  const influencerThreshold = vipThreshold + 0.07; // 7%
  const reviewerThreshold = influencerThreshold + 0.05; // 5%
  const returningThreshold = reviewerThreshold + 0.06; // 6%
  const pickyThreshold = returningThreshold + 0.04; // 4%

  if (rand < vipThreshold) return 'vip';
  if (rand < influencerThreshold) return 'influencer';
  if (rand < reviewerThreshold) return 'reviewer';
  if (rand < returningThreshold) return 'returning';
  if (rand < pickyThreshold) return 'picky';
  return 'normal';
}
