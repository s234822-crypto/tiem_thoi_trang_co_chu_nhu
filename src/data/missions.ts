import { DailyMission } from '../types/game';

interface MissionTemplate {
  id: string;
  title: string;
  description: string;
  type: DailyMission['type'];
  target: number;
  rewardType: 'money' | 'exp';
  rewardValue: number;
  icon: string;
  specificStyle?: DailyMission['specificStyle'];
}

export const MISSION_TEMPLATES: MissionTemplate[] = [
  {
    id: 'm-sales-8',
    title: 'Phục Vụ Nhiệt Tình',
    description: 'Bán thành công 8 bộ trang phục cho khách.',
    type: 'successfulSales',
    target: 8,
    rewardType: 'money',
    rewardValue: 60000,
    icon: '🛍️',
  },
  {
    id: 'm-fivestar-4',
    title: 'Gu Thời Trang Chuẩn',
    description: 'Đạt 4 đơn hàng được chấm 5 sao xuất sắc.',
    type: 'fiveStarSales',
    target: 4,
    rewardType: 'exp',
    rewardValue: 80,
    icon: '⭐',
  },
  {
    id: 'm-korean-3',
    title: 'Chuyên Gia Korean Style',
    description: 'Bán 3 outfit mang phong cách Hàn Quốc.',
    type: 'specificStyleSales',
    target: 3,
    specificStyle: 'korean',
    rewardType: 'money',
    rewardValue: 70000,
    icon: '✨',
  },
  {
    id: 'm-revenue-15',
    title: 'Doanh Thu Bùng Nổ',
    description: 'Đạt doanh thu 1.500.000đ trong ngày.',
    type: 'revenue',
    target: 1500000,
    rewardType: 'exp',
    rewardValue: 100,
    icon: '💰',
  },
  {
    id: 'm-fast-service-3',
    title: 'Phục Vụ Thần Tốc',
    description: 'Phục vụ 3 khách trước khi thanh kiên nhẫn dưới 50%.',
    type: 'fastService',
    target: 3,
    rewardType: 'money',
    rewardValue: 55000,
    icon: '⚡',
  },
  {
    id: 'm-no-walkouts',
    title: 'Ngày Bán Hàng Hoàn Hảo',
    description: 'Hoàn thành ngày mà không để bất kỳ khách nào bỏ đi.',
    type: 'noCustomerLeave',
    target: 1,
    rewardType: 'money',
    rewardValue: 100000,
    icon: '🎯',
  },
  {
    id: 'm-combo-3',
    title: 'Combo Stylist Đẳng Cấp',
    description: 'Đạt 3 lần liên tiếp chấm điểm từ 85 trở lên.',
    type: 'saleStreak',
    target: 3,
    rewardType: 'exp',
    rewardValue: 75,
    icon: '🔥',
  },
  {
    id: 'm-vip-customer',
    title: 'Tiếp Đón Khách VIP',
    description: 'Phục vụ làm hài lòng 1 vị khách VIP.',
    type: 'vipCustomer',
    target: 1,
    rewardType: 'money',
    rewardValue: 120000,
    icon: '👑',
  },
];

export function generateDailyMissions(day: number): DailyMission[] {
  // Shuffle and pick 3 unique templates
  const shuffled = [...MISSION_TEMPLATES].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  return selected.map((tpl) => ({
    id: `${tpl.id}-d${day}-${Date.now().toString(36)}`,
    title: tpl.title,
    description: tpl.description,
    type: tpl.type,
    target: tpl.target,
    progress: 0,
    rewardType: tpl.rewardType,
    rewardValue: tpl.rewardValue,
    completed: false,
    claimed: false,
    icon: tpl.icon,
    specificStyle: tpl.specificStyle,
  }));
}
