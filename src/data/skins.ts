import { OwnerSkin } from '../types/game';

export const OWNER_PORTRAIT_DEFAULT = '/src/assets/images/co_chu_nhu_portrait_1791010615970.jpg';
export const SKIN_PINK_BOUTIQUE_IMG = '/src/assets/images/skin_pink_boutique_1791012316549.jpg';
export const SKIN_KOREAN_STYLIST_IMG = '/src/assets/images/skin_korean_stylist_1791012331716.jpg';
export const SKIN_LUXURY_OWNER_IMG = '/src/assets/images/skin_luxury_owner_1791012344195.jpg';
export const SKIN_SUMMER_OUTFIT_IMG = '/src/assets/images/skin_summer_outfit_1791012355778.jpg';

export const INITIAL_SKINS: OwnerSkin[] = [
  {
    id: 'skin-basic',
    name: 'Chủ Tiệm Basic',
    description: 'Bộ trang phục pastel quen thuộc cùng chiếc tạp dề đáng yêu ngày đầu mở tiệm.',
    avatar: OWNER_PORTRAIT_DEFAULT,
    unlockCondition: 'Mặc định khi bắt đầu game',
    isUnlocked: true,
    isEquipped: true,
    themeColor: '#D87C9B',
    badgeEmoji: '🌸',
  },
  {
    id: 'skin-pink-boutique',
    name: 'Pink Boutique',
    description: 'Váy tiểu thư ren hồng pastel ngọt ngào kèm nơ ren bồng bềnh chuẩn công chúa.',
    avatar: SKIN_PINK_BOUTIQUE_IMG,
    unlockCondition: 'Hoàn thành bộ sưu tập Pink Dream',
    isUnlocked: false,
    isEquipped: false,
    themeColor: '#F48FB1',
    badgeEmoji: '🎀',
  },
  {
    id: 'skin-korean-stylist',
    name: 'Korean Stylist',
    description: 'Phong cách Ulzzang Seoul sành điệu với áo blazer oversize và mũ beret trendy.',
    avatar: SKIN_KOREAN_STYLIST_IMG,
    unlockCondition: 'Bán thành công 50 đơn hàng phong cách Korean',
    isUnlocked: false,
    isEquipped: false,
    themeColor: '#D7CCC8',
    badgeEmoji: '✨',
  },
  {
    id: 'skin-office-chic',
    name: 'Office Chic',
    description: 'Set âu phục công sở thanh lịch sắc sảo, toát lên phong thái nữ giám đốc thành đạt.',
    avatar: '/src/assets/images/customer_avatar_office_1791010620864.jpg',
    unlockCondition: 'Đạt cấp độ nhân vật Level 8',
    isUnlocked: false,
    isEquipped: false,
    themeColor: '#BCAAA4',
    badgeEmoji: '💼',
  },
  {
    id: 'skin-street-fashion',
    name: 'Street Fashion',
    description: 'Áo khoác da cá tính, kính râm retro và boots hầm hố cực chất chơi phá cách.',
    avatar: '/src/assets/images/customer_avatar_student_1791010620138.jpg',
    unlockCondition: 'Bán thành công 50 đơn hàng phong cách Streetwear / Y2K',
    isUnlocked: false,
    isEquipped: false,
    themeColor: '#455A64',
    badgeEmoji: '🕶️',
  },
  {
    id: 'skin-luxury-owner',
    name: 'Luxury Director',
    description: 'Bộ đầm dạ hội tweed đính ngọc trai lộng lẫy cùng vương miện mạ vàng kiêu kỳ quý phái.',
    avatar: SKIN_LUXURY_OWNER_IMG,
    unlockCondition: 'Nâng cấp tiệm đạt Quy mô Cấp 4 (Luxury Boutique)',
    isUnlocked: false,
    isEquipped: false,
    themeColor: '#D9A441',
    badgeEmoji: '👑',
  },
  {
    id: 'skin-summer-outfit',
    name: 'Summer Sunshine',
    description: 'Đầm hoa mùa hè bay bổng kết hợp mũ cói vintage đón những làn gió biển tươi mát rạng rỡ.',
    avatar: SKIN_SUMMER_OUTFIT_IMG,
    unlockCondition: 'Hoàn thành bộ sưu tập Summer Vacation',
    isUnlocked: false,
    isEquipped: false,
    themeColor: '#FFD54F',
    badgeEmoji: '🌻',
  },
];
