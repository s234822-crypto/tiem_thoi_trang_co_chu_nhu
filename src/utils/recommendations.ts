import { Customer, Product, StyleTag, Occasion, FashionColor, Outfit } from '../types/game';

export interface RecommendedProduct {
  product: Product;
  matchScore: number;
  matchReason: string;
}

export interface ItemBadgeInfo {
  isRecommended: boolean;
  isStyleMatch: boolean;
  isBudgetMatch: boolean;
  badgeLabel?: string;
  badgeEmoji?: string;
}

export interface RecommendedCombo {
  id: string;
  title: string;
  outfit: Outfit;
  items: Product[];
  totalPrice: number;
  customerBudget: number;
  rating: 'RẤT PHÙ HỢP' | 'PHÙ HỢP' | 'TẠM ỔN';
  ratingColor: string;
  matchTags: string[];
}

/**
 * Returns 3-6 top recommended products for a customer.
 * Considers:
 * - Customer preferred style
 * - Customer occasion
 * - Customer preferred color
 * - Budget compatibility
 * - Stock availability (> 0)
 * - Player level unlock
 */
export function getRecommendedProducts(
  customer: Customer | null,
  products: Product[],
  playerLevel: number
): Product[] {
  if (!customer) return [];

  // Filter products that are unlocked and have stock
  const candidateProducts = products.filter(
    (p) => p.unlockLevel <= playerLevel && p.stock > 0
  );

  if (candidateProducts.length === 0) {
    // Fallback: at least show unlocked products
    return products.filter((p) => p.unlockLevel <= playerLevel).slice(0, 6);
  }

  const scored: RecommendedProduct[] = candidateProducts.map((product) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. Style match (Highest weight: up to 35 points)
    if (product.styleTags.includes(customer.preferredStyle)) {
      score += 35;
      reasons.push('Hợp gu');
    }

    // 2. Color match (Up to 25 points)
    if (product.colors.includes(customer.preferredColor)) {
      score += 25;
      reasons.push('Đúng tone màu');
    } else if (
      product.colors.some((c) => ['white', 'black', 'beige', 'cream', 'gray'].includes(c))
    ) {
      score += 10;
      reasons.push('Màu trung tính');
    }

    // 3. Occasion match (Up to 20 points)
    if (product.occasions.includes(customer.occasion)) {
      score += 20;
      reasons.push('Hợp dịp mặc');
    }

    // 4. Budget fit (Up to 15 points)
    if (product.category === 'dresses') {
      if (product.price <= customer.budget * 0.9) {
        score += 15;
        reasons.push('Hợp ngân sách');
      }
    } else {
      if (product.price <= customer.budget * 0.55) {
        score += 15;
        reasons.push('Hợp ngân sách');
      }
    }

    // 5. Stock health check (slight bonus for items with plenty of stock)
    if (product.stock >= 3) {
      score += 5;
    }

    return {
      product,
      matchScore: score,
      matchReason: reasons.slice(0, 2).join(' · ') || 'Gợi ý phối đồ',
    };
  });

  // Sort descending by matchScore
  scored.sort((a, b) => b.matchScore - a.matchScore);

  // Pick diverse categories so we don't suggest 6 shirts only!
  const picked: Product[] = [];
  const categoryCounts: Record<string, number> = {};

  for (const item of scored) {
    const cat = item.product.category;
    const count = categoryCounts[cat] || 0;

    // Max 2 items per category to ensure diversity
    if (count < 2) {
      picked.push(item.product);
      categoryCounts[cat] = count + 1;
    }

    if (picked.length >= 6) break;
  }

  // If we couldn't get 3 diverse items, fill with remaining highest scored
  if (picked.length < 3) {
    for (const item of scored) {
      if (!picked.some((p) => p.id === item.product.id)) {
        picked.push(item.product);
      }
      if (picked.length >= 6) break;
    }
  }

  return picked.slice(0, 6);
}

/**
 * Returns badge info for rendering badges like "✨ Gợi ý", "💗 Hợp gu", "💰 Hợp ngân sách" on product cards.
 */
export function getItemBadgeInfo(
  product: Product,
  customer: Customer | null,
  recommendedList: Product[]
): ItemBadgeInfo {
  if (!customer) return { isRecommended: false, isStyleMatch: false, isBudgetMatch: false };

  const isRecommended = recommendedList.some((p) => p.id === product.id);
  const isStyleMatch = product.styleTags.includes(customer.preferredStyle);
  const isBudgetMatch = product.price <= customer.budget * 0.5;

  let badgeLabel: string | undefined;
  let badgeEmoji: string | undefined;

  if (isRecommended && isStyleMatch && isBudgetMatch) {
    badgeLabel = 'Gợi ý';
    badgeEmoji = '✨';
  } else if (isStyleMatch) {
    badgeLabel = 'Hợp gu';
    badgeEmoji = '💗';
  } else if (isBudgetMatch) {
    badgeLabel = 'Hợp ngân sách';
    badgeEmoji = '💰';
  } else if (isRecommended) {
    badgeLabel = 'Gợi ý';
    badgeEmoji = '✨';
  }

  return {
    isRecommended,
    isStyleMatch,
    isBudgetMatch,
    badgeLabel,
    badgeEmoji,
  };
}

/**
 * Generates 1-3 recommended combo outfits for a customer.
 * Player can manually click to select a combo into Outfit Builder.
 */
export function generateRecommendedCombos(
  customer: Customer | null,
  products: Product[],
  playerLevel: number
): RecommendedCombo[] {
  if (!customer) return [];

  const inStock = products.filter((p) => p.unlockLevel <= playerLevel && p.stock > 0);
  if (inStock.length === 0) return [];

  const combos: RecommendedCombo[] = [];

  const rank = (p: Product) => {
    let s = 0;
    if (p.styleTags.includes(customer.preferredStyle)) s += 40;
    if (p.colors.includes(customer.preferredColor)) s += 30;
    if (p.occasions.includes(customer.occasion)) s += 20;
    return s;
  };

  const dresses = inStock.filter((p) => p.category === 'dresses').sort((a, b) => rank(b) - rank(a));
  const tops = inStock.filter((p) => p.category === 'tops').sort((a, b) => rank(b) - rank(a));
  const bottoms = inStock.filter((p) => p.category === 'bottoms').sort((a, b) => rank(b) - rank(a));
  const skirts = inStock.filter((p) => p.category === 'skirts').sort((a, b) => rank(b) - rank(a));
  const shoes = inStock.filter((p) => p.category === 'shoes').sort((a, b) => rank(b) - rank(a));
  const bags = inStock.filter((p) => p.category === 'bags').sort((a, b) => rank(b) - rank(a));

  // Combo 1: Best Separates
  if (tops.length > 0 && (bottoms.length > 0 || skirts.length > 0)) {
    const top = tops[0];
    const bottom = skirts.length > 0 && rank(skirts[0]) >= rank(bottoms[0] || skirts[0]) ? skirts[0] : (bottoms[0] || skirts[0]);
    const shoe = shoes.find((s) => top.price + bottom.price + s.price <= customer.budget);
    const bag = bags.find((b) => top.price + bottom.price + (shoe?.price || 0) + b.price <= customer.budget);

    const outfit: Outfit = {
      top,
      ...(bottom.category === 'skirts' ? { skirt: bottom } : { bottom }),
      ...(shoe ? { shoes: shoe } : {}),
      ...(bag ? { bag } : {}),
    };

    const items = [top, bottom, ...(shoe ? [shoe] : []), ...(bag ? [bag] : [])];
    const totalPrice = items.reduce((sum, i) => sum + i.price, 0);

    if (totalPrice <= customer.budget) {
      combos.push({
        id: 'combo-1',
        title: `Combo 1 — Phong Cách Hợp Gu`,
        outfit,
        items,
        totalPrice,
        customerBudget: customer.budget,
        rating: totalPrice >= customer.budget * 0.6 ? 'RẤT PHÙ HỢP' : 'PHÙ HỢP',
        ratingColor: '#10B981',
        matchTags: ['Hợp ngân sách', 'Hợp style', 'Hợp occasion'],
      });
    }
  }

  // Combo 2: Elegant Dress
  if (dresses.length > 0) {
    const dress = dresses[0];
    const shoe = shoes.find((s) => dress.price + s.price <= customer.budget);
    const bag = bags.find((b) => dress.price + (shoe?.price || 0) + b.price <= customer.budget);

    const outfit: Outfit = {
      dress,
      ...(shoe ? { shoes: shoe } : {}),
      ...(bag ? { bag } : {}),
    };

    const items = [dress, ...(shoe ? [shoe] : []), ...(bag ? [bag] : [])];
    const totalPrice = items.reduce((sum, i) => sum + i.price, 0);

    if (totalPrice <= customer.budget && !combos.some((c) => c.totalPrice === totalPrice)) {
      combos.push({
        id: 'combo-2',
        title: `Combo 2 — Đầm Xinh Nổi Bật`,
        outfit,
        items,
        totalPrice,
        customerBudget: customer.budget,
        rating: 'PHÙ HỢP',
        ratingColor: '#EC4899',
        matchTags: ['Hợp ngân sách', 'Đầm duyên dáng', 'Hợp occasion'],
      });
    }
  }

  // Combo 3: Smart Budget Saver
  if (tops.length > 0 && (bottoms.length > 0 || skirts.length > 0)) {
    const top = tops[1] || tops[0];
    const bottom = bottoms[0] || skirts[0];
    const shoe = shoes[0];

    if (top && bottom) {
      const outfit: Outfit = {
        top,
        ...(bottom.category === 'skirts' ? { skirt: bottom } : { bottom }),
        ...(shoe && top.price + bottom.price + shoe.price <= customer.budget ? { shoes: shoe } : {}),
      };

      const items = [top, bottom, ...(outfit.shoes ? [outfit.shoes] : [])];
      const totalPrice = items.reduce((sum, i) => sum + i.price, 0);

      if (totalPrice <= customer.budget && !combos.some((c) => c.totalPrice === totalPrice)) {
        combos.push({
          id: 'combo-3',
          title: `Combo 3 — Tiết Kiệm Xinh Xắn`,
          outfit,
          items,
          totalPrice,
          customerBudget: customer.budget,
          rating: 'TẠM ỔN',
          ratingColor: '#F59E0B',
          matchTags: ['Giá mềm', 'Hợp gu nhẹ', 'Tối ưu chi phí'],
        });
      }
    }
  }

  return combos.slice(0, 3);
}

/**
 * Automatically builds the best matching Outfit for a customer from in-stock products.
 */
export function generateAutoOutfit(
  customer: Customer | null,
  products: Product[],
  playerLevel: number
): Outfit {
  if (!customer) return {};

  const inStockProducts = products.filter(
    (p) => p.unlockLevel <= playerLevel && p.stock > 0
  );

  if (inStockProducts.length === 0) return {};

  const budget = customer.budget;
  const outfit: Outfit = {};
  let currentCost = 0;

  const rankProduct = (p: Product) => {
    let score = 0;
    if (p.styleTags.includes(customer.preferredStyle)) score += 40;
    if (p.colors.includes(customer.preferredColor)) score += 30;
    if (p.occasions.includes(customer.occasion)) score += 20;
    return score;
  };

  const dresses = inStockProducts.filter((p) => p.category === 'dresses').sort((a, b) => rankProduct(b) - rankProduct(a));
  const tops = inStockProducts.filter((p) => p.category === 'tops').sort((a, b) => rankProduct(b) - rankProduct(a));
  const bottoms = inStockProducts.filter((p) => p.category === 'bottoms').sort((a, b) => rankProduct(b) - rankProduct(a));
  const skirts = inStockProducts.filter((p) => p.category === 'skirts').sort((a, b) => rankProduct(b) - rankProduct(a));
  const shoes = inStockProducts.filter((p) => p.category === 'shoes').sort((a, b) => rankProduct(b) - rankProduct(a));
  const bags = inStockProducts.filter((p) => p.category === 'bags').sort((a, b) => rankProduct(b) - rankProduct(a));
  const accessories = inStockProducts.filter((p) => p.category === 'accessories' || p.category === 'jackets').sort((a, b) => rankProduct(b) - rankProduct(a));

  const bestDress = dresses.find((d) => d.price <= budget * 0.85);

  let bestTop: Product | undefined;
  let bestBottom: Product | undefined;
  let bestBottomIsSkirt = false;

  const bottomCandidates = [...bottoms, ...skirts].sort((a, b) => rankProduct(b) - rankProduct(a));

  for (const t of tops) {
    for (const b of bottomCandidates) {
      if (t.price + b.price <= budget * 0.85) {
        if (!bestTop || rankProduct(t) + rankProduct(b) > rankProduct(bestTop) + (bestBottom ? rankProduct(bestBottom) : 0)) {
          bestTop = t;
          bestBottom = b;
          bestBottomIsSkirt = b.category === 'skirts';
        }
      }
    }
  }

  const dressScore = bestDress ? rankProduct(bestDress) : -1;
  const separatesScore = (bestTop && bestBottom) ? rankProduct(bestTop) + rankProduct(bestBottom) : -1;

  if (dressScore > separatesScore && bestDress) {
    outfit.dress = bestDress;
    currentCost += bestDress.price;
  } else if (bestTop && bestBottom) {
    outfit.top = bestTop;
    if (bestBottomIsSkirt) {
      outfit.skirt = bestBottom;
    } else {
      outfit.bottom = bestBottom;
    }
    currentCost += bestTop.price + bestBottom.price;
  } else if (bestDress) {
    outfit.dress = bestDress;
    currentCost += bestDress.price;
  } else if (bestTop) {
    outfit.top = bestTop;
    currentCost += bestTop.price;
  } else if (bestBottom) {
    if (bestBottomIsSkirt) outfit.skirt = bestBottom;
    else outfit.bottom = bestBottom;
    currentCost += bestBottom.price;
  }

  const bestShoe = shoes.find((s) => currentCost + s.price <= budget);
  if (bestShoe) {
    outfit.shoes = bestShoe;
    currentCost += bestShoe.price;
  }

  const bestBag = bags.find((b) => currentCost + b.price <= budget);
  if (bestBag) {
    outfit.bag = bestBag;
    currentCost += bestBag.price;
  }

  const bestAcc = accessories.find((a) => currentCost + a.price <= budget);
  if (bestAcc) {
    if (bestAcc.category === 'jackets') {
      outfit.jacket = bestAcc;
    } else {
      outfit.accessory = bestAcc;
    }
    currentCost += bestAcc.price;
  }

  return outfit;
}
