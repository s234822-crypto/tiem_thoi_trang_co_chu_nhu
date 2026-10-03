import { Customer, Product, StyleTag, Occasion, FashionColor, Outfit } from '../types/game';

export interface RecommendedProduct {
  product: Product;
  matchScore: number;
  matchReason: string;
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
      reasons.push('Hợp phong cách');
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
    // A single piece shouldn't take more than 60% of budget unless it's a dress
    if (product.category === 'dresses') {
      if (product.price <= customer.budget * 0.9) {
        score += 15;
      }
    } else {
      if (product.price <= customer.budget * 0.55) {
        score += 15;
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
 * Automatically builds the best matching Outfit for a customer from in-stock products.
 */
export function generateAutoOutfit(
  customer: Customer | null,
  products: Product[],
  playerLevel: number
): Outfit {
  if (!customer) return {};

  // Filter products: unlocked, in stock
  const inStockProducts = products.filter(
    (p) => p.unlockLevel <= playerLevel && p.stock > 0
  );

  if (inStockProducts.length === 0) return {};

  const budget = customer.budget;
  const outfit: Outfit = {};
  let currentCost = 0;

  // Helper score for ranking single products for this customer
  const rankProduct = (p: Product) => {
    let score = 0;
    if (p.styleTags.includes(customer.preferredStyle)) score += 40;
    if (p.colors.includes(customer.preferredColor)) score += 30;
    if (p.occasions.includes(customer.occasion)) score += 20;
    return score;
  };

  // Available by category sorted by rank
  const dresses = inStockProducts.filter((p) => p.category === 'dresses').sort((a, b) => rankProduct(b) - rankProduct(a));
  const tops = inStockProducts.filter((p) => p.category === 'tops').sort((a, b) => rankProduct(b) - rankProduct(a));
  const bottoms = inStockProducts.filter((p) => p.category === 'bottoms').sort((a, b) => rankProduct(b) - rankProduct(a));
  const skirts = inStockProducts.filter((p) => p.category === 'skirts').sort((a, b) => rankProduct(b) - rankProduct(a));
  const shoes = inStockProducts.filter((p) => p.category === 'shoes').sort((a, b) => rankProduct(b) - rankProduct(a));
  const bags = inStockProducts.filter((p) => p.category === 'bags').sort((a, b) => rankProduct(b) - rankProduct(a));
  const accessories = inStockProducts.filter((p) => p.category === 'accessories' || p.category === 'jackets').sort((a, b) => rankProduct(b) - rankProduct(a));

  // Determine if we should do Dress or Top + Bottom/Skirt
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

  // Add shoes if fits budget
  const bestShoe = shoes.find((s) => currentCost + s.price <= budget);
  if (bestShoe) {
    outfit.shoes = bestShoe;
    currentCost += bestShoe.price;
  }

  // Add bag if fits budget
  const bestBag = bags.find((b) => currentCost + b.price <= budget);
  if (bestBag) {
    outfit.bag = bestBag;
    currentCost += bestBag.price;
  }

  // Add accessory/jacket if fits budget
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

