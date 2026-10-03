export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'skirts'
  | 'dresses'
  | 'jackets'
  | 'shoes'
  | 'bags'
  | 'accessories';

export type SubCategory =
  // tops
  | 'tshirt' | 'croptop' | 'blouse' | 'shirt' | 'hoodie' | 'sweater' | 'cardigan' | 'jacket_top' | 'blazer'
  // bottoms
  | 'jeans' | 'trousers' | 'shorts' | 'wide_leg' | 'cargo' | 'legging'
  // skirts
  | 'aline_skirt' | 'tennis_skirt' | 'midi_skirt' | 'long_skirt' | 'denim_skirt'
  // dresses
  | 'office_dress' | 'party_dress' | 'floral_dress' | 'body_dress' | 'maxi_dress' | 'babydoll_dress'
  // shoes
  | 'sneaker' | 'heels' | 'sandal' | 'boots' | 'loafer' | 'mary_jane'
  // bags
  | 'tote' | 'mini_bag' | 'shoulder_bag' | 'office_bag' | 'luxury_bag'
  // accessories
  | 'glasses' | 'hat' | 'earrings' | 'necklace' | 'bracelet' | 'belt' | 'hair_clip';

export type StyleTag =
  | 'casual'   | 'cute'       | 'korean'    | 'minimal'  | 'elegant'
  | 'office'   | 'streetwear' | 'y2k'       | 'vintage'  | 'sporty'
  | 'feminine' | 'party'      | 'summer'    | 'luxury'   | 'winter'
  | 'preppy'   | 'chic'       | 'soft_girl' | 'retro'    | 'denim';

export type Occasion =
  | 'school' | 'work'   | 'coffee' | 'date'     | 'shopping'
  | 'party'  | 'travel' | 'formal' | 'picnic'   | 'sport'
  | 'street' | 'vacation';

export type FashionColor =
  | 'pink'   | 'white'  | 'black'  | 'beige'  | 'cream'
  | 'brown'  | 'blue'   | 'navy'   | 'green'  | 'olive'
  | 'yellow' | 'purple' | 'red'    | 'gray'   | 'orange';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'premium' | 'luxury';

export interface Product {
  id: string;
  name: string;
  category: ClothingCategory;
  subCategory?: SubCategory;
  styleTags: StyleTag[];
  colors: FashionColor[];
  occasions: Occasion[];
  cost: number;
  price: number;
  stock: number;
  maxStock: number;
  unlockLevel: number;
  rarity: Rarity;
  description: string;
  image?: string;
  visualEmoji: string;
  accentColor: string;
}


export type CustomerType =
  | 'student'
  | 'office'
  | 'genz'
  | 'party_goer'
  | 'traveler'
  | 'fashionista'
  | 'regular'
  | 'vip';

export type OwnerState = 'idle' | 'greet' | 'help' | 'happy' | 'tired' | 'celebrate';

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  typeLabel: string;
  avatar: string;
  age: number;
  budget: number;
  preferredStyle: StyleTag;
  preferredColor: FashionColor;
  occasion: Occasion;
  maxPatience: number;
  currentPatience: number;
  dialogue: string;
  tipMultiplier: number;
  isVip: boolean;
  specialTrait?: string;
  specialRole?: SpecialRole;
  minScoreRequired?: number;
}

export interface CustomerRequest {
  targetStyle: StyleTag;
  targetOccasion: Occasion;
  preferredColor: FashionColor;
  maxBudget: number;
  hintText: string;
}

export type OutfitSlot =
  | 'top'
  | 'bottom'
  | 'skirt'
  | 'dress'
  | 'jacket'
  | 'shoes'
  | 'bag'
  | 'accessory';

export interface Outfit {
  top?: Product | null;
  bottom?: Product | null;
  skirt?: Product | null;
  dress?: Product | null;
  jacket?: Product | null;
  shoes?: Product | null;
  bag?: Product | null;
  accessory?: Product | null;
}

export interface OutfitScoreResult {
  totalScore: number;
  styleScore: number;
  occasionScore: number;
  colorScore: number;
  budgetScore: number;
  completenessScore: number;
  stars: 1 | 2 | 3 | 4 | 5;
  reactionDialogue: string;
  isSuccess: boolean;
  tipAmount: number;
  expEarned: number;
  totalRevenue: number;
}

export type UpgradeEffectType =
  | 'satisfactionBonus'
  | 'scoreBonus'
  | 'patienceBonus'
  | 'maxStockBonus'
  | 'tipBonus'
  | 'vipChanceBonus';

export interface ShopUpgradeItem {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  baseCost: number;
  effectType: UpgradeEffectType;
  effectPerLevel: number;
  description: string;
  icon: string;
}

export type DecorCategory = 'Wall' | 'Floor' | 'Lighting' | 'Furniture' | 'Decoration';

export interface DecorItem {
  id: string;
  name: string;
  price: number;
  unlockLevel: number;
  category: DecorCategory;
  bonusType: 'patience' | 'tip' | 'exp' | 'score' | 'satisfaction';
  bonusValue: number;
  bonusLabel: string;
  owned: boolean;
  equipped: boolean;
  icon: string;
  visualEmoji: string;
}

export interface ShopTier {
  level: number;
  title: string;
  minPlayerLevel: number;
  upgradeCost: number;
  minRating: number;
  maxWaitingCustomers: number;
  decorSlots: number;
  patienceBonusPercent: number;
  tipBonusPercent: number;
  expBonusPercent: number;
  vipChancePercent: number;
}

export interface DaySummaryData {
  day: number;
  revenue: number;
  restockCost: number;
  profit: number;
  totalCustomers: number;
  successfulSales: number;
  failedSales: number;
  walkouts: number;
  fiveStarCount: number;
  finalRating: number;
  expEarned: number;
}

export interface ShopStats {
  shopName: string;
  day: number;
  level: number;
  exp: number;
  nextLevelExp: number;
  money: number;
  rating: number;
  customersServedToday: number;
  maxCustomersToday: number;
  successfulSalesToday: number;
  failedSalesToday: number;
  walkoutsToday: number;
  fiveStarToday: number;
  todayRevenue: number;
  todayRestockCost: number;
  isShopOpen: boolean;
  shopTierLevel: number;
}

export type MissionType =
  | 'successfulSales'
  | 'fiveStarSales'
  | 'revenue'
  | 'specificStyleSales'
  | 'fastService'
  | 'noCustomerLeave'
  | 'profit'
  | 'vipCustomer'
  | 'outfitScore'
  | 'saleStreak';

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  type: MissionType;
  target: number;
  progress: number;
  rewardType: 'money' | 'exp';
  rewardValue: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
  specificStyle?: StyleTag;
}

export type AchievementType =
  | 'totalSales'
  | 'totalCustomers'
  | 'highScoreOutfits'
  | 'shopRating'
  | 'koreanSales'
  | 'streetwearSales'
  | 'totalRevenue'
  | 'shopLevel'
  | 'decorOwned'
  | 'vipServed'
  | 'perfectStreak';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: AchievementType;
  target: number;
  progress: number;
  unlocked: boolean;
  unlockedAt?: number;
  rewardType: 'money' | 'exp';
  rewardValue: number;
  claimed: boolean;
}

export type SpecialRole = 'normal' | 'vip' | 'influencer' | 'reviewer' | 'returning' | 'picky';

export interface DailyEvent {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: string;
  customerMultiplier: number;
  patienceMultiplier: number;
  vipChanceBoost: number;
  featuredStyle?: StyleTag;
}

export interface PermanentStats {
  totalCustomersServed: number;
  totalSuccessfulSales: number;
  totalFiveStarSales: number;
  totalRevenue: number;
  totalProfit: number;
  totalVipServed: number;
  totalDecorPurchased: number;
  highestStreak: number;
  currentStreak: number;
  totalOutfitScore90Plus: number;
  koreanSalesCount: number;
  streetwearSalesCount: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

// --- PHASE 17: STORY SYSTEM ---
export type StoryCharacterState = 'idle' | 'happy' | 'surprised' | 'thinking' | 'celebrate';

export interface StoryScene {
  speaker: string;
  text: string;
  characterState: StoryCharacterState;
}

export type StoryUnlockConditionType =
  | 'day'
  | 'sales'
  | 'shopLevel'
  | 'rating'
  | 'influencer'
  | 'playerLevel';

export interface StoryChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  unlockCondition: string;
  unlockType: StoryUnlockConditionType;
  unlockValue: number;
  scenes: StoryScene[];
  unlocked: boolean;
  read: boolean;
  rewardMoney?: number;
  rewardExp?: number;
}

// --- PHASE 18: FASHION COLLECTION SYSTEM ---
export interface FashionCollection {
  id: string;
  name: string;
  description: string;
  theme: string;
  unlockLevel: number;
  productIds: string[];
  isSeasonal?: boolean;
  seasonName?: string;
  reward: {
    type: 'money' | 'exp' | 'skin' | 'decor';
    value: number | string;
    label: string;
  };
  claimed: boolean;
  icon: string;
}

// --- PHASE 19: CÔ CHỦ NHƯ SKIN SYSTEM ---
export interface OwnerSkin {
  id: string;
  name: string;
  description: string;
  avatar: string;
  unlockCondition: string;
  isUnlocked: boolean;
  isEquipped: boolean;
  bonusDescription?: string;
  themeColor: string;
  badgeEmoji: string;
}

// --- PHASE 20: STANDARDIZED TOAST SYSTEM ---
export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface GameToast {
  id: string;
  message: string;
  type: ToastType;
}


