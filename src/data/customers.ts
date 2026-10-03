import { Customer, CustomerType, FashionColor, Occasion, SpecialRole, StyleTag } from '../types/game';
import { pickSpecialRole } from './events';
import { STYLE_LABELS, COLOR_LABELS, OCCASION_LABELS } from './products';

export const OWNER_PORTRAIT = '/assets/images/co_chu_nhu_portrait_1791010615970.jpg';
export const SHOP_INTERIOR = '/assets/images/shop_boutique_interior_1791010626470.jpg';

export const CUSTOMER_AVATARS: Record<string, string> = {
  student: '/assets/images/customer_avatar_student_1791010637680.jpg',
  office: '/assets/images/customer_avatar_office_1791010648067.jpg',
  vip: '/assets/images/customer_avatar_vip_1791010658960.jpg',
  genz: '/assets/images/customer_avatar_student_1791010637680.jpg',
  party_goer: '/assets/images/customer_avatar_vip_1791010658960.jpg',
  traveler: '/assets/images/customer_avatar_student_1791010637680.jpg',
  fashionista: '/assets/images/customer_avatar_office_1791010648067.jpg',
  regular: '/assets/images/customer_avatar_student_1791010637680.jpg',
};

interface CustomerProfileTemplate {
  type: CustomerType;
  typeLabel: string;
  namePool: string[];
  ageRange: [number, number];
  preferredStyles: StyleTag[];
  preferredColors: FashionColor[];
  occasions: Occasion[];
  budgetRange: [number, number];
  basePatience: number;
  tipMultiplier: number;
  isVip?: boolean;
  specialTrait: string;
}

export const CUSTOMER_TEMPLATES: CustomerProfileTemplate[] = [
  {
    type: 'student',
    typeLabel: 'Sinh viên',
    namePool: ['Minh Anh', 'Hà Linh', 'Trà My', 'Phương Vy', 'Bảo Hân', 'Khánh Linh'],
    ageRange: [18, 22],
    preferredStyles: ['casual', 'cute', 'korean', 'sporty'],
    preferredColors: ['pink', 'white', 'cream', 'blue'],
    occasions: ['school', 'coffee', 'picnic'],
    budgetRange: [350000, 600000],
    basePatience: 35,
    tipMultiplier: 1.0,
    specialTrait: 'Thích đồ trẻ trung, năng động, chụp ảnh check-in sống ảo.',
  },
  {
    type: 'office',
    typeLabel: 'Nhân viên văn phòng',
    namePool: ['Chị Mai', 'Thu Thảo', 'Diệu Anh', 'Kim Oanh', 'Ngọc Diệp', 'Thu Hà'],
    ageRange: [24, 32],
    preferredStyles: ['office', 'elegant', 'minimal', 'korean'],
    preferredColors: ['black', 'white', 'beige', 'cream', 'brown'],
    occasions: ['work', 'formal', 'coffee'],
    budgetRange: [600000, 1100000],
    basePatience: 32,
    tipMultiplier: 1.15,
    specialTrait: 'Yêu cầu form dáng chuẩn, lịch sự, chất vải đứng form không nhăn.',
  },
  {
    type: 'genz',
    typeLabel: 'Gen Z sành điệu',
    namePool: ['Gia Hân', 'Cát Tiên', 'Mina Đỗ', 'Zoe Vũ', 'Chloe Nguyễn', 'Bella'],
    ageRange: [19, 23],
    preferredStyles: ['streetwear', 'y2k', 'cute', 'sporty'],
    preferredColors: ['black', 'pink', 'gray', 'purple'],
    occasions: ['shopping', 'coffee', 'party'],
    budgetRange: [450000, 800000],
    basePatience: 30,
    tipMultiplier: 1.1,
    specialTrait: 'Bắt trend TikTok cực nhanh, thích phụ kiện ấn tượng và dáng croptop.',
  },
  {
    type: 'party_goer',
    typeLabel: 'Khách dự tiệc',
    namePool: ['Hương Giang', 'Bích Phương', 'Yến Nhi', 'Thanh Hằng', 'Lan Khuê'],
    ageRange: [23, 30],
    preferredStyles: ['party', 'luxury', 'feminine', 'elegant'],
    preferredColors: ['red', 'black', 'white', 'pink'],
    occasions: ['party', 'formal', 'date'],
    budgetRange: [850000, 1600000],
    basePatience: 38,
    tipMultiplier: 1.3,
    specialTrait: 'Cần sự nổi bật và tỏa sáng dưới ánh đèn sân khấu buổi tối.',
  },
  {
    type: 'traveler',
    typeLabel: 'Khách du lịch',
    namePool: ['Thùy Trang', 'Ánh Tuyết', 'Hải Yến', 'Như Ý', 'Quỳnh Chi'],
    ageRange: [22, 28],
    preferredStyles: ['summer', 'vintage', 'casual', 'cute'],
    preferredColors: ['yellow', 'green', 'white', 'pink'],
    occasions: ['travel', 'picnic', 'coffee'],
    budgetRange: [500000, 950000],
    basePatience: 34,
    tipMultiplier: 1.1,
    specialTrait: 'Thích outfit thoải mái, chụp hình ngoài trời lên màu tươi tắn.',
  },
  {
    type: 'fashionista',
    typeLabel: 'Fashion Lover',
    namePool: ['Jennie Nguyễn', 'Vicky Hoàng', 'Tracy Phạm', 'Rosie Đặng', 'Kelly Trịnh'],
    ageRange: [22, 29],
    preferredStyles: ['y2k', 'korean', 'minimal', 'luxury'],
    preferredColors: ['beige', 'black', 'white', 'brown'],
    occasions: ['coffee', 'shopping', 'date'],
    budgetRange: [750000, 1400000],
    basePatience: 28,
    tipMultiplier: 1.25,
    specialTrait: 'Rất khắt khe về phối màu hài hòa và phụ kiện ton-sur-ton.',
  },
  {
    type: 'regular',
    typeLabel: 'Khách quen thân thiết',
    namePool: ['Bé Na', 'Cúc Họa Mi', 'Bảo Ngọc', 'Thảo My', 'Mỹ Duyên'],
    ageRange: [20, 26],
    preferredStyles: ['cute', 'korean', 'feminine', 'casual'],
    preferredColors: ['pink', 'cream', 'beige', 'white'],
    occasions: ['coffee', 'date', 'shopping'],
    budgetRange: [400000, 850000],
    basePatience: 42,
    tipMultiplier: 1.2,
    specialTrait: 'Tin tưởng mắt thẩm mỹ của Cô Chủ Như, dễ thương và hay để lại tip!',
  },
  {
    type: 'vip',
    typeLabel: 'Khách VIP / Influencer',
    namePool: ['Hot Girl Emma Lê', 'Beauty Blogger Cindy', 'Model Hoàng Yến', 'Idol Linh Ka', 'Tiểu Thư Vivian'],
    ageRange: [21, 27],
    preferredStyles: ['luxury', 'party', 'elegant', 'y2k'],
    preferredColors: ['black', 'red', 'white', 'pink'],
    occasions: ['party', 'formal', 'shopping'],
    budgetRange: [1200000, 2500000],
    basePatience: 40,
    tipMultiplier: 1.8,
    isVip: true,
    specialTrait: 'Khách VIP siêu chịu chi! Nếu phối đẹp 5 sao sẽ tăng danh tiếng cho tiệm!',
  },
];

export function generateCustomerDialogue(
  customerName: string,
  type: CustomerType,
  specialRole: SpecialRole,
  style: StyleTag,
  occasion: Occasion,
  color: FashionColor,
  budget: number
): string {
  const budgetFormatted = (budget / 1000).toLocaleString('vi-VN') + 'k';

  const styleDescriptions: Record<StyleTag, string> = {
    casual:     'năng động, thoải mái dễ mặc',
    cute:       'ngọt ngào, kẹo ngọt dễ thương xíu',
    korean:     'chuẩn style ulzzang Hàn Quốc trendy',
    minimal:    'tối giản, tinh tế nhẹ nhàng',
    elegant:    'thanh lịch, chỉn chu quý phái',
    office:     'lịch sự đi làm nhưng không bị già',
    streetwear: 'chất lừ, cool ngầu cá tính',
    y2k:        'Y2K chất chơi bắt mắt',
    vintage:    'cổ điển, hoài niệm lãng mạn',
    sporty:     'khỏe khoắn, sporty năng động',
    feminine:   'tiểu thư, dịu dàng nữ tính',
    party:      'lộng lẫy để thu hút spotlight',
    summer:     'mát mẻ, bay bổng rực rỡ',
    luxury:     'sang xịn mịn chuẩn quý cô sành điệu',
    winter:     'ấm áp, layering tinh tế mùa đông',
    preppy:     'preppy học đường phong cách Ivy League',
    chic:       'chic hiện đại, đơn giản mà cuốn hút',
    soft_girl:  'soft girl nhẹ nhàng dịu dàng đáng yêu',
    retro:      'retro hoài cổ đầy cá tính',
    denim:      'denim phong trào trẻ trung năng động',
  };

  const occasionPhrases: Record<Occasion, string> = {
    school:   'lên giảng đường đi học',
    work:     'đến công sở làm việc',
    coffee:   'đi cà phê tán gẫu check-in với bạn',
    date:     'đi hẹn hò lãng mạn cùng crush',
    shopping: 'lượn phố shopping cuối tuần',
    party:    'dự buổi tiệc tối sang trọng',
    travel:   'đi du lịch nghỉ dưỡng dài ngày',
    formal:   'dự sự kiện quan trọng',
    picnic:   'đi dã ngoại ngoài trời ngắm hoa',
    sport:    'tham gia hoạt động thể thao',
    street:   'dạo phố chill trên phố thị',
    vacation: 'đi nghỉ mát kỳ nghỉ dài',
  };

  const colorPhrases: Record<FashionColor, string> = {
    pink:   'tone hồng pastel ngọt ngào',
    white:  'tone trắng tinh khôi thanh thuần',
    black:  'tone đen huyền bí quyến rũ',
    beige:  'tone be nhã nhặn ấm áp',
    cream:  'tone kem dịu mắt nhẹ nhàng',
    brown:  'tone nâu ấm vintage',
    blue:   'tone xanh denim tươi mát',
    navy:   'tone xanh navy cổ điển sang trọng',
    green:  'tone xanh bơ dịu êm',
    olive:  'tone xanh olive trầm phong trào',
    yellow: 'tone vàng tươi tắn rạng rỡ',
    purple: 'tone tím lavender mơ màng',
    red:    'tone đỏ quyến rũ kiêu kỳ',
    gray:   'tone xám ghi thời thượng cá tính',
    orange: 'tone cam nắng hè sôi động',
  };

  // Special Role dialogues
  if (specialRole === 'influencer') {
    return `“Hôm nay mình đang quay video OOTD cho kênh TikTok, Như phối giúp mình một set ${styleDescriptions[style]} tone ${colorPhrases[color]} thật nổi bật để hút triệu view nha! Ngân sách ${budgetFormatted}!”`;
  }

  if (specialRole === 'reviewer') {
    return `“Chào cô chủ Như! Mình là Fashion Reviewer ghé tiệm để thẩm định phong cách. Mình cần set đồ ${styleDescriptions[style]} để ${occasionPhrases[occasion]}, ngân sách ${budgetFormatted}. Đẹp mình sẽ chấm 5 sao ngay!”`;
  }

  if (specialRole === 'picky') {
    return `“Mình là người có gu ăn mặc rất khó tính và khắt khe. Mình cần một outfit chuẩn ${styleDescriptions[style]} phối ${colorPhrases[color]}. Nếu không đạt từ 75 điểm trở lên mình sẽ không nhận đâu nhé! Ngân sách ${budgetFormatted}.”`;
  }

  if (specialRole === 'returning') {
    return `“Như ơi lại là khách quen ruột của tiệm ghé nè! Cuối tuần mình có kèo ${occasionPhrases[occasion]}, Như chọn cho mình set ${styleDescriptions[style]} tone ${colorPhrases[color]} xinh xỉu tầm ${budgetFormatted} nhen!”`;
  }

  if (specialRole === 'vip' || type === 'vip') {
    return `“Chào Như boutique! Tối nay mình cần một outfit thật ${styleDescriptions[style]} để ${occasionPhrases[occasion]}. Ưu tiên phối ${colorPhrases[color]} sang chảnh nhé. Ngân sách thoải mái tầm ${budgetFormatted}, miễn là xuất sắc!”`;
  }

  const templates = [
    `“Chào cô chủ Như! Mình đang tìm một set đồ ${styleDescriptions[style]} để ${occasionPhrases[occasion]}. Mình thích nhất ${colorPhrases[color]}, ngân sách khoảng ${budgetFormatted} nha!”`,
    `“Shop ơi tư vấn giúp mình với! Mình cần outfit để ${occasionPhrases[occasion]}, gu mình là ${styleDescriptions[style]} thiên về ${colorPhrases[color]}. Tầm ${budgetFormatted} trở lại nhé!”`,
    `“Hello Như! Hôm nay mình muốn đổi gió phong cách ${styleDescriptions[style]} một chút để ${occasionPhrases[occasion]}. Chọn giùm mình đồ ${colorPhrases[color]} với, ví mình có tầm ${budgetFormatted} nè.”`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

export function getUnlockedStyles(playerLevel: number): StyleTag[] {
  const styles: StyleTag[] = ['casual', 'cute', 'vintage'];
  if (playerLevel >= 3) styles.push('korean', 'minimal');
  if (playerLevel >= 5) styles.push('office', 'elegant');
  if (playerLevel >= 7) styles.push('streetwear', 'y2k', 'sporty');
  if (playerLevel >= 10) styles.push('party', 'feminine');
  if (playerLevel >= 12) styles.push('summer');
  if (playerLevel >= 15) styles.push('luxury');
  return styles;
}

export function formatCustomerRequestTags(customer: Customer): {
  styleTag: string;
  colorTag: string;
  occasionTag: string;
  budgetTag: string;
  combinedString: string;
} {
  const styleTag = STYLE_LABELS[customer.preferredStyle] || customer.preferredStyle;
  const colorTag = COLOR_LABELS[customer.preferredColor]?.name || customer.preferredColor;
  const occasionTag = OCCASION_LABELS[customer.occasion] || customer.occasion;
  const budgetTag = `≤${Math.round(customer.budget / 1000).toLocaleString('vi-VN')}K`;
  return {
    styleTag,
    colorTag,
    occasionTag,
    budgetTag,
    combinedString: `${styleTag} • ${colorTag} • ${occasionTag} • ${budgetTag}`,
  };
}

export function generateRandomCustomer(
  playerLevel = 1,
  currentDay = 1,
  forceVip = false,
  vipChanceBoost = 0,
  featuredStyle?: StyleTag
): Customer {
  // Day 1-2: No picky customers, focus on friendly intro
  let specialRole: SpecialRole = forceVip ? 'vip' : pickSpecialRole(vipChanceBoost);
  if (currentDay <= 2 && specialRole === 'picky') {
    specialRole = 'normal';
  }

  const availableTemplates = specialRole === 'vip'
    ? CUSTOMER_TEMPLATES.filter((t) => t.isVip)
    : CUSTOMER_TEMPLATES;

  const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  const name = template.namePool[Math.floor(Math.random() * template.namePool.length)];
  const age = Math.floor(Math.random() * (template.ageRange[1] - template.ageRange[0] + 1)) + template.ageRange[0];

  // Strictly only pick unlocked styles
  const unlockedStyles = getUnlockedStyles(playerLevel);
  let preferredStyle: StyleTag;

  // Day 1-2: prefer casual/cute simple starter styles
  if (currentDay <= 2) {
    const starterStyles: StyleTag[] = ['casual', 'cute'];
    preferredStyle = starterStyles[Math.floor(Math.random() * starterStyles.length)];
  } else if (featuredStyle && unlockedStyles.includes(featuredStyle) && Math.random() < 0.65) {
    preferredStyle = featuredStyle;
  } else {
    const candidateStyles = template.preferredStyles.filter((st) => unlockedStyles.includes(st));
    preferredStyle = candidateStyles.length > 0
      ? candidateStyles[Math.floor(Math.random() * candidateStyles.length)]
      : unlockedStyles[Math.floor(Math.random() * unlockedStyles.length)];
  }

  const preferredColor = template.preferredColors[Math.floor(Math.random() * template.preferredColors.length)];
  const occasion = template.occasions[Math.floor(Math.random() * template.occasions.length)];

  // Budget scaling with progressive difficulty
  let rawBudget = Math.floor(Math.random() * (template.budgetRange[1] - template.budgetRange[0]) + template.budgetRange[0]);
  if (currentDay <= 2) {
    // Day 1-2: Generous budget to make first sales very easy
    rawBudget = Math.round(rawBudget * 1.25);
  } else if (currentDay >= 6 && currentDay <= 10) {
    // Day 6-10: Tighter budget testing player optimization
    rawBudget = Math.round(rawBudget * 0.95);
  }

  if (specialRole === 'vip') rawBudget = Math.round(rawBudget * 1.3);
  if (specialRole === 'picky') rawBudget = Math.round(rawBudget * 1.2);
  const budget = Math.max(350000, Math.round(rawBudget / 50000) * 50000);

  // Requirement 9: Calibrated Patience
  // - Khách thường: 35–45s
  // - Khách khó: 25–30s
  // - VIP: 20–25s
  let basePatience = Math.floor(Math.random() * 11) + 35; // 35-45s default

  let tipMultiplier = template.tipMultiplier;
  let typeLabel = template.typeLabel;
  let minScoreRequired = 60;
  let specialTrait = template.specialTrait;

  if (specialRole === 'vip') {
    typeLabel = '✨ Khách VIP';
    tipMultiplier = 2.0;
    basePatience = Math.floor(Math.random() * 6) + 20; // 20-25s
    specialTrait = 'Khách VIP chịu chi! Nếu phối đẹp từ 5 sao sẽ tăng danh tiếng cho tiệm.';
  } else if (specialRole === 'influencer') {
    typeLabel = '📱 Influencer';
    tipMultiplier = 1.35;
    basePatience = Math.floor(Math.random() * 6) + 20; // 20-25s
    specialTrait = 'Nếu đạt điểm >= 90, tiệm sẽ viral và 3 khách tiếp theo tip thêm +20%!';
  } else if (specialRole === 'reviewer') {
    typeLabel = '⭐ Reviewer';
    tipMultiplier = 1.2;
    basePatience = Math.floor(Math.random() * 6) + 22; // 22-27s
    specialTrait = 'Bài đánh giá của Reviewer sẽ tác động rất mạnh đến số sao của tiệm!';
  } else if (specialRole === 'returning') {
    typeLabel = '❤️ Khách Quen';
    tipMultiplier = 1.25;
    basePatience = Math.floor(Math.random() * 6) + 40; // 40-45s
    specialTrait = 'Khách ruột cực kỳ kiên nhẫn và luôn tin tưởng thẩm mỹ của cô chủ.';
  } else if (specialRole === 'picky') {
    typeLabel = '💎 Sành Điệu';
    tipMultiplier = 1.6;
    basePatience = Math.floor(Math.random() * 6) + 25; // 25-30s
    minScoreRequired = 75; // Requires higher score to buy!
    specialTrait = 'Khách rất khó tính, phải đạt từ 75 điểm trở lên mới chịu mua.';
  }

  // Day 1-2 generous patience bonus (+10s) to learn without pressure
  if (currentDay <= 2) {
    basePatience += 10;
  }

  const dialogue = generateCustomerDialogue(name, template.type, specialRole, preferredStyle, occasion, preferredColor, budget);
  const avatar = CUSTOMER_AVATARS[template.type] || CUSTOMER_AVATARS.student;

  return {
    id: `cust-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name,
    type: template.type,
    typeLabel,
    avatar,
    age,
    budget,
    preferredStyle,
    preferredColor,
    occasion,
    maxPatience: basePatience,
    currentPatience: basePatience,
    dialogue,
    tipMultiplier,
    isVip: specialRole === 'vip' || !!template.isVip,
    specialTrait,
    specialRole,
    minScoreRequired,
  };
}
