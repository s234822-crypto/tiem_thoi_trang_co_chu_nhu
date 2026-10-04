import { Customer, FashionColor, Outfit, OutfitScoreResult, Product, StyleTag } from '../types/game';

// Related styles for soft matching
const STYLE_AFFINITY: Record<StyleTag, StyleTag[]> = {
  cute:       ['korean', 'feminine', 'casual', 'soft_girl'],
  korean:     ['cute', 'minimal', 'casual', 'y2k', 'preppy'],
  casual:     ['cute', 'korean', 'minimal', 'sporty', 'denim'],
  minimal:    ['korean', 'office', 'elegant', 'casual', 'chic'],
  elegant:    ['office', 'luxury', 'feminine', 'party', 'chic'],
  office:     ['elegant', 'minimal', 'luxury', 'chic'],
  streetwear: ['y2k', 'sporty', 'casual', 'retro', 'denim'],
  y2k:        ['streetwear', 'cute', 'korean', 'retro'],
  vintage:    ['feminine', 'cute', 'elegant', 'retro', 'preppy'],
  sporty:     ['casual', 'streetwear'],
  feminine:   ['cute', 'elegant', 'vintage', 'party', 'soft_girl'],
  party:      ['luxury', 'elegant', 'feminine', 'chic'],
  summer:     ['casual', 'cute', 'feminine', 'sporty'],
  luxury:     ['party', 'elegant', 'office', 'chic'],
  winter:     ['casual', 'preppy', 'korean', 'elegant'],
  preppy:     ['korean', 'vintage', 'casual', 'winter'],
  chic:       ['elegant', 'minimal', 'office', 'luxury'],
  soft_girl:  ['cute', 'feminine', 'korean', 'casual'],
  retro:      ['vintage', 'streetwear', 'y2k', 'denim'],
  denim:      ['casual', 'streetwear', 'retro', 'sporty'],
};

// Neutral colors that go with everything
const NEUTRAL_COLORS: Set<FashionColor> = new Set(['white', 'black', 'beige', 'cream', 'gray', 'navy']);

// Compatible color pairs
const COMPATIBLE_PAIRS: [FashionColor, FashionColor][] = [
  ['pink', 'white'], ['blue', 'white'], ['black', 'white'],
  ['cream', 'brown'], ['beige', 'brown'], ['green', 'beige'],
  ['red', 'black'], ['pink', 'cream'], ['blue', 'cream'],
  ['yellow', 'white'], ['purple', 'white'], ['navy', 'white'],
  ['navy', 'cream'], ['olive', 'beige'], ['olive', 'cream'],
  ['orange', 'white'], ['orange', 'beige'], ['navy', 'beige'],
];

export function getOutfitItems(outfit: Outfit): Product[] {
  const items: Product[] = [];
  if (outfit.dress) items.push(outfit.dress);
  if (outfit.top) items.push(outfit.top);
  if (outfit.bottom) items.push(outfit.bottom);
  if (outfit.skirt) items.push(outfit.skirt);
  if (outfit.jacket) items.push(outfit.jacket);
  if (outfit.shoes) items.push(outfit.shoes);
  if (outfit.bag) items.push(outfit.bag);
  if (outfit.accessory) items.push(outfit.accessory);
  return items;
}

export function getOutfitTotalPrice(outfit: Outfit): number {
  const items = getOutfitItems(outfit);
  return items.reduce((sum, item) => sum + (item.price || 0), 0);
}

export function validateOutfit(outfit: Outfit, customer?: Customer | null): { isValid: boolean; reason: string } {
  const hasDress = Boolean(outfit.dress);
  const hasTop = Boolean(outfit.top);
  const hasBottom = Boolean(outfit.bottom);
  const hasSkirt = Boolean(outfit.skirt);

  // Dress conflict
  if (hasDress && (hasTop || hasBottom || hasSkirt)) {
    return { isValid: false, reason: 'Không thể kết hợp Đầm liền với Áo hoặc Quần/Váy.' };
  }

  // Bottom & Skirt conflict
  if (hasBottom && hasSkirt) {
    return { isValid: false, reason: 'Chỉ chọn Quần hoặc Chân váy, không chọn cả hai.' };
  }

  // Base outfit check
  let validBase = false;
  if (hasDress) {
    validBase = true;
  } else if (hasTop && (hasBottom || hasSkirt)) {
    validBase = true;
  } else if (hasTop && !hasBottom && !hasSkirt) {
    return { isValid: false, reason: 'Cần chọn thêm Quần hoặc Chân váy.' };
  } else if (!hasTop && (hasBottom || hasSkirt)) {
    return { isValid: false, reason: 'Cần chọn thêm Áo cho bộ đồ.' };
  } else {
    return { isValid: false, reason: 'Vui lòng chọn Đầm liền hoặc Áo + Quần/Váy.' };
  }

  if (!validBase) {
    return { isValid: false, reason: 'Vui lòng chọn Đầm liền hoặc Áo + Quần/Váy.' };
  }

  // Strict over-budget lock (players cannot submit outfit exceeding customer budget)
  if (customer && customer.budget > 0) {
    const totalPrice = getOutfitTotalPrice(outfit);
    if (totalPrice > customer.budget) {
      return {
        isValid: false,
        reason: `Vượt ngân sách (${totalPrice.toLocaleString('vi-VN')}đ > ${customer.budget.toLocaleString('vi-VN')}đ). Vui lòng chọn lại!`,
      };
    }
  }

  return { isValid: true, reason: 'Outfit hợp lệ với giá tiền phù hợp!' };
}

export function calculateOutfitScore(customer: Customer, outfit: Outfit): OutfitScoreResult {
  const items = getOutfitItems(outfit);
  const validation = validateOutfit(outfit, customer);

  if (!validation.isValid || items.length === 0) {
    return {
      totalScore: 0,
      styleScore: 0,
      occasionScore: 0,
      colorScore: 0,
      budgetScore: 0,
      completenessScore: 0,
      stars: 1,
      reactionDialogue: validation.reason || 'Bộ đồ này chưa hoàn chỉnh, mình không thể thử được.',
      isSuccess: false,
      tipAmount: 0,
      expEarned: 0,
      totalRevenue: 0,
    };
  }

  // 1. Style Match (Max 35 points)
  let stylePoints = 0;
  const targetStyle = customer.preferredStyle;
  const relatedStyles = STYLE_AFFINITY[targetStyle] || [];

  items.forEach((item) => {
    if (item.styleTags.includes(targetStyle)) {
      stylePoints += 1.0;
    } else if (item.styleTags.some((st) => relatedStyles.includes(st))) {
      stylePoints += 0.55;
    } else {
      stylePoints += 0.15;
    }
  });

  const styleRatio = items.length > 0 ? stylePoints / items.length : 0;
  const styleScore = Math.min(35, Math.max(0, Math.round(styleRatio * 35)));

  // 2. Occasion Match (Max 20 points)
  let occasionPoints = 0;
  items.forEach((item) => {
    if (item.occasions.includes(customer.occasion)) {
      occasionPoints += 1.0;
    } else {
      occasionPoints += 0.25;
    }
  });
  const occasionRatio = items.length > 0 ? occasionPoints / items.length : 0;
  const occasionScore = Math.min(20, Math.max(0, Math.round(occasionRatio * 20)));

  // 3. Color Match (Max 15 points)
  let colorPoints = 0;
  const prefColor = customer.preferredColor;

  // Check if outfit has customer preferred color
  const hasPreferredColor = items.some((item) => item.colors.includes(prefColor));
  if (hasPreferredColor) colorPoints += 7;

  // Check color harmony across all chosen items
  const allColors = Array.from(new Set(items.flatMap((i) => i.colors)));
  let isHarmonious = true;

  // Check pairs
  for (let i = 0; i < allColors.length; i++) {
    for (let j = i + 1; j < allColors.length; j++) {
      const c1 = allColors[i];
      const c2 = allColors[j];
      const isNeutral = NEUTRAL_COLORS.has(c1) || NEUTRAL_COLORS.has(c2);
      const isPair = COMPATIBLE_PAIRS.some(
        ([p1, p2]) => (p1 === c1 && p2 === c2) || (p1 === c2 && p2 === c1)
      );
      if (!isNeutral && !isPair && c1 !== c2) {
        isHarmonious = false;
        break;
      }
    }
  }

  if (isHarmonious) {
    colorPoints += 8;
  } else {
    colorPoints += 4;
  }
  const colorScore = Math.min(15, Math.max(0, colorPoints));

  // 4. Budget Fit (Max 20 points)
  const totalPrice = getOutfitTotalPrice(outfit);
  const budget = customer.budget;
  let budgetScore = 20;

  if (totalPrice <= budget) {
    if (totalPrice >= budget * 0.60) {
      budgetScore = 20; // 60% - 100% budget -> 20/20
    } else {
      budgetScore = 15; // < 60% budget -> 15/20
    }
  } else {
    const excessRatio = (totalPrice - budget) / budget;
    if (excessRatio <= 0.10) {
      budgetScore = 8; // Over <= 10% -> 8/20
    } else {
      budgetScore = Math.max(0, Math.round(5 - (excessRatio - 0.10) * 10)); // Over > 10% -> 0-5/20
    }
  }

  // 5. Completeness (Max 10 points)
  let completenessScore = 6; // Base valid dress or top + bottom/skirt
  if (outfit.shoes) completenessScore += 2;
  if (outfit.bag || outfit.accessory) completenessScore += 2;
  completenessScore = Math.min(10, completenessScore);

  // Total Score Calculation
  const totalScore = Math.min(
    100,
    Math.max(0, styleScore + occasionScore + colorScore + budgetScore + completenessScore)
  );

  // Star Rating & Customer Reaction
  let stars: 1 | 2 | 3 | 4 | 5 = 1;
  let reactionDialogue = '';

  if (totalScore >= 90) {
    stars = 5;
    reactionDialogue = '“Trời ơi! Bộ này đúng gu mình luôn, mặc lên tôn dáng xinh xỉu! Cảm ơn cô chủ Như nhiều nha! ⭐⭐⭐⭐⭐”';
  } else if (totalScore >= 75) {
    stars = 4;
    reactionDialogue = '“Đẹp quá, mình rất thích bộ này! Phối màu và kiểu dáng rất hợp ý mình luôn. ⭐⭐⭐⭐”';
  } else if (totalScore >= 60) {
    stars = 3;
    reactionDialogue = '“Bộ này cũng ổn đó, mình sẽ lấy! Lần sau shop lại tư vấn cho mình tiếp nhé. ⭐⭐⭐”';
  } else if (totalScore >= 40) {
    stars = 2;
    reactionDialogue = '“Hmm... mình chưa ưng lắm, có vẻ không đúng phong cách mình mong muốn hôm nay. ⭐⭐”';
  } else {
    stars = 1;
    reactionDialogue = '“Bộ này không hợp với mình rồi, giá hoặc kiểu dáng chưa phù hợp lắm. Hẹn shop dịp khác nha! ⭐”';
  }

  // Sales Decision (>= 60 is success)
  const isSuccess = totalScore >= 60;

  // Tip calculation
  let tipPercent = 0;
  if (stars === 5) tipPercent = 0.08;
  else if (stars === 4) tipPercent = 0.04;
  else if (stars === 3) tipPercent = 0.01;

  let tipAmount = 0;
  if (isSuccess) {
    const rawTip = Math.round(totalPrice * tipPercent * (customer.tipMultiplier || 1.0));
    tipAmount = Math.round(rawTip / 5000) * 5000;
  }

  // EXP reward
  let expEarned = 0;
  if (isSuccess) {
    if (stars === 5) expEarned = 20;
    else if (stars === 4) expEarned = 15;
    else if (stars === 3) expEarned = 10;

    if (customer.isVip) {
      expEarned += 15; // VIP customer bonus EXP
    }
  }

  const totalRevenue = isSuccess ? totalPrice + tipAmount : 0;

  return {
    totalScore,
    styleScore,
    occasionScore,
    colorScore,
    budgetScore,
    completenessScore,
    stars,
    reactionDialogue,
    isSuccess,
    tipAmount,
    expEarned,
    totalRevenue,
  };
}

export interface OutfitMatchHint {
  type: 'style' | 'budget' | 'color';
  status: 'match' | 'warning' | 'neutral';
  message: string;
}

export function getOutfitMatchHints(customer: Customer | null, outfit: Outfit): OutfitMatchHint[] {
  if (!customer) return [];
  const items = getOutfitItems(outfit);
  const totalPrice = getOutfitTotalPrice(outfit);

  if (items.length === 0) {
    return [
      { type: 'style', status: 'neutral', message: 'Chưa chọn trang phục' },
      { type: 'budget', status: 'neutral', message: 'Trong ngân sách' },
      { type: 'color', status: 'neutral', message: 'Chưa chọn màu' },
    ];
  }

  // 1. Style Check
  const hasDirectStyle = items.some((item) => item.styleTags.includes(customer.preferredStyle));
  const relatedStyles = STYLE_AFFINITY[customer.preferredStyle] || [];
  const hasRelatedStyle = items.some((item) =>
    item.styleTags.some((tag) => relatedStyles.includes(tag))
  );

  let styleHint: OutfitMatchHint;
  if (hasDirectStyle) {
    styleHint = { type: 'style', status: 'match', message: '✓ Hợp phong cách' };
  } else if (hasRelatedStyle) {
    styleHint = { type: 'style', status: 'neutral', message: '~ Phong cách tương đồng' };
  } else {
    styleHint = { type: 'style', status: 'warning', message: '⚠ Chưa đúng phong cách' };
  }

  // 2. Budget Check
  let budgetHint: OutfitMatchHint;
  if (totalPrice <= customer.budget) {
    if (totalPrice >= customer.budget * 0.6) {
      budgetHint = { type: 'budget', status: 'match', message: '✓ Hợp ngân sách' };
    } else {
      budgetHint = { type: 'budget', status: 'neutral', message: '~ Dưới 60% ngân sách' };
    }
  } else {
    const over = totalPrice - customer.budget;
    budgetHint = { type: 'budget', status: 'warning', message: `⚠ Vượt ngân sách (+${over.toLocaleString('vi-VN')}đ)` };
  }

  // 3. Color Check
  const hasDirectColor = items.some((item) => item.colors.includes(customer.preferredColor));
  const hasNeutralColor = items.every((item) =>
    item.colors.some((c) => NEUTRAL_COLORS.has(c))
  );

  let colorHint: OutfitMatchHint;
  if (hasDirectColor) {
    colorHint = { type: 'color', status: 'match', message: '✓ Tone màu phù hợp' };
  } else if (hasNeutralColor) {
    colorHint = { type: 'color', status: 'neutral', message: '~ Màu trung tính hài hòa' };
  } else {
    colorHint = { type: 'color', status: 'warning', message: '⚠ Màu chưa phù hợp' };
  }

  return [styleHint, budgetHint, colorHint];
}

