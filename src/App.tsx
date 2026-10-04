import React, { useState, useEffect, useRef } from 'react';
import {
  Achievement,
  Customer,
  DailyEvent,
  DailyMission,
  DaySummaryData,
  DecorItem,
  FashionCollection,
  GameToast,
  Outfit,
  OutfitScoreResult,
  OutfitSlot,
  OwnerSkin,
  OwnerState,
  PermanentStats,
  Product,
  ShopStats,
  ShopTier,
  ShopUpgradeItem,
  StoryChapter,
  ToastType,
} from './types/game';
import { INITIAL_PRODUCTS, SUBCATEGORY_LABELS } from './data/products';
import { generateRandomCustomer, getUnlockedStyles, fixImagePath } from './data/customers';
import { INITIAL_UPGRADES, INITIAL_DECORS, SHOP_TIERS } from './data/upgrades';
import { generateDailyMissions } from './data/missions';
import { INITIAL_ACHIEVEMENTS } from './data/achievements';
import { DAILY_EVENTS, getRandomDailyEvent } from './data/events';
import { STORY_CHAPTERS } from './data/story';
import { INITIAL_COLLECTIONS } from './data/collections';
import { INITIAL_SKINS, OWNER_PORTRAIT_DEFAULT } from './data/skins';
import {
  playTapSound,
  playAlertSound,
  playVipFanfare,
  playChimeSound,
  playCoinSound,
  playSuccessFanfare,
  playMissionCompleteSound,
  playAchievementSound,
  isAudioMuted,
  toggleAudio,
  startBGM,
} from './utils/audio';
import { calculateOutfitScore, getOutfitItems, validateOutfit } from './utils/scoring';
import { generateAutoOutfit } from './utils/recommendations';
import { Header } from './components/Header';
import { ShopArea } from './components/ShopArea';
import { CustomerRequestBubble } from './components/CustomerRequestBubble';
import { OutfitBuilder } from './components/OutfitBuilder';
import { CatalogBrowser } from './components/CatalogBrowser';
import { FittingModal } from './components/FittingModal';
import { CustomerDetailModal } from './components/CustomerDetailModal';
import { StartScreen } from './components/StartScreen';
import { GuideModal } from './components/GuideModal';
import { ChangelogModal } from './components/ChangelogModal';
import { DebugPanel } from './components/DebugPanel';
import { InventoryModal } from './components/InventoryModal';
import { RestockModal } from './components/RestockModal';
import { ShopUpgradeModal } from './components/ShopUpgradeModal';
import { DecorModal } from './components/DecorModal';
import { LevelUpModal } from './components/LevelUpModal';
import { DaySummaryModal } from './components/DaySummaryModal';
import { MissionsModal } from './components/MissionsModal';
import { AchievementsModal } from './components/AchievementsModal';
import { DailyEventBanner } from './components/DailyEventBanner';
import { ConfettiEffect } from './components/ConfettiEffect';
import { OfflineIndicator } from './components/OfflineIndicator';
import { StoryModal } from './components/StoryModal';
import { StoryArchiveModal } from './components/StoryArchiveModal';
import { CollectionModal } from './components/CollectionModal';
import { WardrobeModal } from './components/WardrobeModal';
import { TutorialOverlay } from './components/TutorialOverlay';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { TodayGoalsCard } from './components/TodayGoalsCard';
import { ActiveTab, BottomNav } from './components/BottomNav';
import { Smartphone, CheckCircle2, AlertTriangle, Info, XCircle, Zap, Sun, Package, Wrench, Palette, Shirt, Sparkles, ArrowRight, ArrowLeft, Clock } from 'lucide-react';

import { GAME_VERSION, SAVE_SCHEMA_VERSION, BUILD_ID } from './constants/version';

const CURRENT_SAVE_VERSION = SAVE_SCHEMA_VERSION;
const SAVE_KEY_CURRENT = `fashionShopSave_v${SAVE_SCHEMA_VERSION}`;

const DEFAULT_PERMANENT_STATS: PermanentStats = {
  totalCustomersServed: 0,
  totalSuccessfulSales: 0,
  totalFiveStarSales: 0,
  totalRevenue: 0,
  totalProfit: 0,
  totalVipServed: 0,
  totalDecorPurchased: 0,
  highestStreak: 0,
  currentStreak: 0,
  totalOutfitScore90Plus: 0,
  koreanSalesCount: 0,
  streetwearSalesCount: 0,
};

export default function App() {
  const [gameState, setGameState] = useState<'START' | 'PLAYING'>('START');
  const [activeTab, setActiveTab] = useState<ActiveTab>('shop');

  // Load Saved State with Dynamic Schema Migration
  const loadSavedData = () => {
    try {
      const keys = [
        `fashionShopSave_v${SAVE_SCHEMA_VERSION}`,
        ...Array.from({ length: SAVE_SCHEMA_VERSION - 1 }, (_, i) => `fashionShopSave_v${SAVE_SCHEMA_VERSION - 1 - i}`),
      ];

      for (const key of keys) {
        const saved = localStorage.getItem(key);
        if (saved) {
          const sanitized = saved
            .replace(/\/?src\/assets\/images\//g, '/assets/images/')
            .replace(/customer_avatar_office_1791010620864\.jpg/g, 'customer_avatar_office_1791010648067.jpg')
            .replace(/customer_avatar_student_1791010620138\.jpg/g, 'customer_avatar_student_1791010637680.jpg');
          return JSON.parse(sanitized);
        }
      }
    } catch {
      // ignore
    }
    return null;
  };

  const parsedData = loadSavedData();

  // Core Shop Stats
  const [stats, setStats] = useState<ShopStats>(() => {
    if (parsedData?.stats) {
      return {
        shopName: 'Tiệm Thời Trang Cô Chủ Như',
        day: parsedData.stats.day || 1,
        level: parsedData.stats.level || 1,
        exp: parsedData.stats.exp || 0,
        nextLevelExp: parsedData.stats.nextLevelExp || 100,
        money: parsedData.stats.money ?? 1250000,
        rating: parsedData.stats.rating || 5.0,
        customersServedToday: parsedData.stats.customersServedToday || 0,
        maxCustomersToday: parsedData.stats.maxCustomersToday || 8,
        successfulSalesToday: parsedData.stats.successfulSalesToday || 0,
        failedSalesToday: parsedData.stats.failedSalesToday || 0,
        walkoutsToday: parsedData.stats.walkoutsToday || 0,
        fiveStarToday: parsedData.stats.fiveStarToday || 0,
        todayRevenue: parsedData.stats.todayRevenue || 0,
        todayRestockCost: parsedData.stats.todayRestockCost || 0,
        isShopOpen: false, // always reset on load; customers are not persisted so open=true would leave an empty shop
        shopTierLevel: parsedData.stats.shopTierLevel || 1,
      };
    }
    return {
      shopName: 'Tiệm Thời Trang Cô Chủ Như',
      day: 1,
      level: 1,
      exp: 0,
      nextLevelExp: 100,
      money: 1250000,
      rating: 5.0,
      customersServedToday: 0,
      maxCustomersToday: 8,
      successfulSalesToday: 0,
      failedSalesToday: 0,
      walkoutsToday: 0,
      fiveStarToday: 0,
      todayRevenue: 0,
      todayRestockCost: 0,
      isShopOpen: false,
      shopTierLevel: 1,
    };
  });

  // Products Database — Master sync with INITIAL_PRODUCTS
  const [products, setProducts] = useState<Product[]>(() => {
    if (parsedData?.products && Array.isArray(parsedData.products)) {
      const savedStockMap = new Map<string, { stock?: number; maxStock?: number }>();
      for (const p of parsedData.products) {
        if (p && p.id) {
          savedStockMap.set(p.id, { stock: p.stock, maxStock: p.maxStock });
        }
      }

      return INITIAL_PRODUCTS.map((masterProd) => {
        const saved = savedStockMap.get(masterProd.id);
        if (saved) {
          return {
            ...masterProd,
            stock: typeof saved.stock === 'number' ? saved.stock : masterProd.stock,
            maxStock: Math.max(saved.maxStock || 10, masterProd.maxStock || 10),
          };
        }
        return masterProd;
      });
    }
    return INITIAL_PRODUCTS;
  });

  // Upgrades Database — Master sync with INITIAL_UPGRADES
  const [upgrades, setUpgrades] = useState<ShopUpgradeItem[]>(() => {
    if (parsedData?.upgrades && Array.isArray(parsedData.upgrades)) {
      const savedMap = new Map(parsedData.upgrades.map((u: any) => [u.id, u]));
      return INITIAL_UPGRADES.map((masterItem) => {
        const saved = savedMap.get(masterItem.id);
        if (saved) {
          return {
            ...masterItem,
            level: typeof saved.level === 'number' ? saved.level : masterItem.level,
            unlocked: typeof saved.unlocked === 'boolean' ? saved.unlocked : masterItem.unlocked,
          };
        }
        return masterItem;
      });
    }
    return INITIAL_UPGRADES;
  });

  // Decor Database — Master sync with INITIAL_DECORS
  const [decors, setDecors] = useState<DecorItem[]>(() => {
    if (parsedData?.decors && Array.isArray(parsedData.decors)) {
      const savedMap = new Map(parsedData.decors.map((d: any) => [d.id, d]));
      return INITIAL_DECORS.map((masterItem) => {
        const saved = savedMap.get(masterItem.id);
        if (saved) {
          return {
            ...masterItem,
            purchased: typeof saved.purchased === 'boolean' ? saved.purchased : masterItem.purchased,
            equipped: typeof saved.equipped === 'boolean' ? saved.equipped : masterItem.equipped,
          };
        }
        return masterItem;
      });
    }
    return INITIAL_DECORS;
  });

  // Phase 13: Daily Missions State
  const [missions, setMissions] = useState<DailyMission[]>(() => {
    if (parsedData?.missions && Array.isArray(parsedData.missions) && parsedData.missions.length > 0) {
      return parsedData.missions;
    }
    return generateDailyMissions(1);
  });

  // Phase 14: Permanent Stats & Achievements State
  const [permanentStats, setPermanentStats] = useState<PermanentStats>(() => {
    if (parsedData?.permanentStats) {
      return { ...DEFAULT_PERMANENT_STATS, ...parsedData.permanentStats };
    }
    return DEFAULT_PERMANENT_STATS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    if (parsedData?.achievements && Array.isArray(parsedData.achievements)) {
      return parsedData.achievements;
    }
    return INITIAL_ACHIEVEMENTS;
  });

  // Phase 15: Daily Event State
  const [currentEvent, setCurrentEvent] = useState<DailyEvent>(() => {
    if (parsedData?.currentEvent) {
      return parsedData.currentEvent;
    }
    return DAILY_EVENTS[0];
  });

  const [viralCustomersRemaining, setViralCustomersRemaining] = useState<number>(0);

  // Phase 17: Story Chapters State
  const [storyChapters, setStoryChapters] = useState<StoryChapter[]>(() => {
    if (parsedData?.storyChapters && Array.isArray(parsedData.storyChapters)) {
      return parsedData.storyChapters;
    }
    return STORY_CHAPTERS;
  });
  const [activeStoryChapter, setActiveStoryChapter] = useState<StoryChapter | null>(null);
  const [isStoryArchiveOpen, setIsStoryArchiveOpen] = useState(false);

  // Phase 18: Fashion Collections State
  const [collections, setCollections] = useState<FashionCollection[]>(() => {
    if (parsedData?.collections && Array.isArray(parsedData.collections)) {
      return parsedData.collections;
    }
    return INITIAL_COLLECTIONS;
  });
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);

  // Phase 19: Cô Chủ Như Skins State
  const [skins, setSkins] = useState<OwnerSkin[]>(() => {
    if (parsedData?.skins && Array.isArray(parsedData.skins)) {
      return parsedData.skins;
    }
    return INITIAL_SKINS;
  });
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);

  // Phase 20: Tutorial State (runs once for first-time player)
  const [showTutorial, setShowTutorial] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fashionShop_tutorialCompleted') !== 'true';
    }
    return false;
  });

  // 2-Screen Gameplay Mode & Customer Animations
  const [shopMode, setShopMode] = useState<'shop_view' | 'styling_mode'>('shop_view');
  const [customerAnimState, setCustomerAnimState] = useState<'entering' | 'arrived' | 'exiting'>('arrived');
  const animTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shopTopRef = useRef<HTMLDivElement | null>(null);

  const scrollToTopShop = () => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (shopTopRef.current) {
        shopTopRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Current active customer & waiting queue
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [waitingQueue, setWaitingQueue] = useState<Customer[]>([]);
  const [ownerState, setOwnerState] = useState<OwnerState>('idle');

  // Active Outfit
  const [outfit, setOutfit] = useState<Outfit>({});

  // Modals & Popups
  const [fittingResult, setFittingResult] = useState<OutfitScoreResult | null>(null);
  const [levelUpData, setLevelUpData] = useState<{
    level: number;
    newProducts: Product[];
    newStyles: string[];
  } | null>(null);
  const [daySummary, setDaySummary] = useState<DaySummaryData | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>('suggested');
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleSelectCategoryFromOutfit = (cat: string) => {
    playTapSound();
    setSelectedCatalogCategory(cat);
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCloseShop = () => {
    playChimeSound();
    handleTriggerEndOfDay();
    showToast('🌙 Tiệm đã đóng cửa thành công. Chúc Cô Chủ Như nghỉ ngơi vui vẻ!', 'info');
  };

  // Toast System (Standardized with type: success, warning, error, info)
  const [currentToast, setCurrentToast] = useState<GameToast | null>(null);

  // Polish, Confetti & Sound Mute
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMuted, setIsMuted] = useState(() => isAudioMuted());

  // Desktop responsive simulator preset
  const [mobileWidthPreset, setMobileWidthPreset] = useState<'375' | '390' | '430' | 'full'>('390');

  // Active Owner Avatar from currently equipped skin
  const equippedSkin = skins.find((s) => s.isEquipped) || skins[0];
  const ownerAvatar = fixImagePath(equippedSkin ? equippedSkin.avatar : OWNER_PORTRAIT_DEFAULT);

  // Auto-Save whenever stats, products, upgrades, decors, missions, achievements, story, collections or skins update
  useEffect(() => {
    try {
      localStorage.setItem(
        SAVE_KEY_CURRENT,
        JSON.stringify({
          version: CURRENT_SAVE_VERSION,
          gameVersion: GAME_VERSION,
          stats,
          // Save only user inventory stock & maxStock so product catalog is always driven by current build
          products: products.map((p) => ({ id: p.id, stock: p.stock, maxStock: p.maxStock })),
          upgrades,
          decors,
          missions,
          achievements,
          permanentStats,
          currentEvent,
          storyChapters,
          collections,
          skins,
        })
      );
    } catch {
      // ignore
    }
  }, [
    stats,
    products,
    upgrades,
    decors,
    missions,
    achievements,
    permanentStats,
    currentEvent,
    storyChapters,
    collections,
    skins,
  ]);

  // Show standardized toast notification
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    setCurrentToast({ id, message, type });
    setTimeout(() => {
      setCurrentToast((prev) => (prev?.id === id ? null : prev));
    }, 3200);
  };

  const handleToggleSound = () => {
    const nextMuted = toggleAudio();
    setIsMuted(nextMuted);
    showToast(nextMuted ? 'Đã tắt âm thanh' : 'Đã bật âm thanh', 'info');
  };

  // Upgrades & Decor Bonuses Calculation
  const currentTier = SHOP_TIERS.find((t) => t.level === stats.shopTierLevel) || SHOP_TIERS[0];
  const rackUpgrade = upgrades.find((u) => u.id === 'clothing-rack');
  const rackBonus = rackUpgrade ? (rackUpgrade.level - 1) * rackUpgrade.effectPerLevel : 0;
  const maxStockCapacity = 10 + rackBonus;

  // Sync maxStock on products if changed by shelf upgrade
  useEffect(() => {
    setProducts((prev) =>
      prev.map((p) => (p.maxStock !== maxStockCapacity ? { ...p, maxStock: maxStockCapacity } : p))
    );
  }, [maxStockCapacity]);

  // Total decor bonuses
  const equippedDecors = decors.filter((d) => d.equipped);
  const decorPatienceBonus = equippedDecors
    .filter((d) => d.bonusType === 'patience')
    .reduce((sum, d) => sum + d.bonusValue, 0);
  const decorTipBonus = equippedDecors
    .filter((d) => d.bonusType === 'tip')
    .reduce((sum, d) => sum + d.bonusValue, 0);

  // Facility bonuses
  const benchUpgrade = upgrades.find((u) => u.id === 'waiting-bench');
  const acUpgrade = upgrades.find((u) => u.id === 'air-conditioner');
  const cashUpgrade = upgrades.find((u) => u.id === 'cash-counter');

  const facilityPatienceBonus =
    (benchUpgrade ? (benchUpgrade.level - 1) * benchUpgrade.effectPerLevel : 0) +
    (acUpgrade ? (acUpgrade.level - 1) * acUpgrade.effectPerLevel : 0);
  const facilityTipBonus = cashUpgrade ? (cashUpgrade.level - 1) * cashUpgrade.effectPerLevel : 0;

  const totalExtraPatience = Math.round(
    facilityPatienceBonus + decorPatienceBonus + 30 * currentTier.patienceBonusPercent
  );
  const totalExtraTipPercent = facilityTipBonus + decorTipBonus + currentTier.tipBonusPercent;

  // Spawn customer with patience bonus, unlocked styles, daily event modifiers, and viral bonus
  const createCustomerWithBonuses = (forceVip = false) => {
    const vipChanceBoost = (currentTier.vipChancePercent || 0) + (currentEvent.vipChanceBoost || 0);
    const cust = generateRandomCustomer(
      stats.level,
      stats.day,
      forceVip,
      vipChanceBoost,
      currentEvent.featuredStyle
    );

    const baseWithBonuses = cust.maxPatience + totalExtraPatience;
    cust.maxPatience = Math.round(baseWithBonuses * (currentEvent.patienceMultiplier || 1.0));
    cust.currentPatience = cust.maxPatience;

    let tip = cust.tipMultiplier + totalExtraTipPercent;
    if (viralCustomersRemaining > 0) {
      tip += 0.2; // TikTok viral bonus tip!
    }
    cust.tipMultiplier = Number(tip.toFixed(2));

    return cust;
  };

  // Phase 17: Check and unlock story chapters
  const checkStoryUnlocks = (
    currentPermStats: PermanentStats,
    currentShopStats: ShopStats
  ) => {
    setStoryChapters((prevChapters) => {
      let newlyUnlockedChapter: StoryChapter | null = null;

      const updated = prevChapters.map((ch) => {
        if (ch.unlocked) return ch;

        let shouldUnlock = false;
        switch (ch.unlockType) {
          case 'day':
            shouldUnlock = currentShopStats.day >= ch.unlockValue;
            break;
          case 'sales':
            shouldUnlock = currentPermStats.totalSuccessfulSales >= ch.unlockValue;
            break;
          case 'shopLevel':
            shouldUnlock = currentShopStats.shopTierLevel >= ch.unlockValue;
            break;
          case 'rating':
            shouldUnlock = currentShopStats.rating >= ch.unlockValue;
            break;
          case 'influencer':
            shouldUnlock = currentPermStats.totalVipServed >= ch.unlockValue;
            break;
          case 'playerLevel':
            shouldUnlock = currentShopStats.level >= ch.unlockValue;
            break;
        }

        if (shouldUnlock) {
          newlyUnlockedChapter = { ...ch, unlocked: true };
          return newlyUnlockedChapter;
        }
        return ch;
      });

      if (newlyUnlockedChapter) {
        setTimeout(() => {
          playSuccessFanfare();
          setActiveStoryChapter(newlyUnlockedChapter);
          showToast(`Cốt truyện mới: ${newlyUnlockedChapter!.title}!`, 'success');
        }, 800);
      }

      return updated;
    });
  };

  // Check and update achievement progress
  const checkAchievements = (
    updatedPermStats: PermanentStats,
    updatedStats: ShopStats,
    currentDecors: DecorItem[]
  ) => {
    setAchievements((prevAchs) => {
      let newlyUnlockedTitle: string | null = null;

      const updated = prevAchs.map((ach) => {
        let currentVal = ach.progress;

        switch (ach.type) {
          case 'totalSales':
            currentVal = updatedPermStats.totalSuccessfulSales;
            break;
          case 'totalCustomers':
            currentVal = updatedPermStats.totalCustomersServed;
            break;
          case 'highScoreOutfits':
            currentVal = updatedPermStats.totalOutfitScore90Plus;
            break;
          case 'shopRating':
            currentVal = updatedStats.rating;
            break;
          case 'koreanSales':
            currentVal = updatedPermStats.koreanSalesCount;
            break;
          case 'streetwearSales':
            currentVal = updatedPermStats.streetwearSalesCount;
            break;
          case 'totalRevenue':
            currentVal = updatedPermStats.totalRevenue;
            break;
          case 'shopLevel':
            currentVal = updatedStats.shopTierLevel;
            break;
          case 'decorOwned':
            currentVal = currentDecors.filter((d) => d.owned).length;
            break;
          case 'vipServed':
            currentVal = updatedPermStats.totalVipServed;
            break;
          case 'perfectStreak':
            currentVal = updatedPermStats.highestStreak;
            break;
        }

        const isNowUnlocked = currentVal >= ach.target;

        if (isNowUnlocked && !ach.unlocked) {
          newlyUnlockedTitle = ach.name;
          return {
            ...ach,
            progress: currentVal,
            unlocked: true,
            unlockedAt: Date.now(),
          };
        }

        return {
          ...ach,
          progress: currentVal,
        };
      });

      if (newlyUnlockedTitle) {
        setTimeout(() => {
          playAchievementSound();
          setShowConfetti(true);
          showToast(`Mở khóa thành tựu mới: ${newlyUnlockedTitle}!`, 'success');
        }, 500);
      }

      return updated;
    });
  };

  // Phase 19: Check and unlock skins based on gameplay milestones
  const checkSkinUnlocks = (
    currentPermStats: PermanentStats,
    currentShopStats: ShopStats
  ) => {
    setSkins((prevSkins) =>
      prevSkins.map((skin) => {
        if (skin.isUnlocked) return skin;

        let shouldUnlock = false;
        if (skin.id === 'skin-korean-stylist' && currentPermStats.koreanSalesCount >= 50) {
          shouldUnlock = true;
        } else if (skin.id === 'skin-office-chic' && currentShopStats.level >= 8) {
          shouldUnlock = true;
        } else if (skin.id === 'skin-street-fashion' && currentPermStats.streetwearSalesCount >= 50) {
          shouldUnlock = true;
        } else if (skin.id === 'skin-luxury-owner' && currentShopStats.shopTierLevel >= 4) {
          shouldUnlock = true;
        }

        if (shouldUnlock) {
          setTimeout(() => {
            playSuccessFanfare();
            setShowConfetti(true);
            showToast(`Mở khóa trang phục mới cho Cô Chủ Như: ${skin.name}!`, 'success');
          }, 700);
          return { ...skin, isUnlocked: true };
        }
        return skin;
      })
    );
  };

  // Requirement 13: Quick Restock low-stock products (stock <= 2)
  const handleQuickRestockLowStock = () => {
    const lowStockProds = products.filter((p) => p.stock <= 2 && p.unlockLevel <= stats.level);
    if (lowStockProds.length === 0) {
      showToast('Tất cả sản phẩm đã mở khóa đều còn đủ hàng!', 'info');
      return;
    }

    let totalSpent = 0;
    let itemsRestocked = 0;
    let remainingMoney = stats.money;

    setProducts((prev) =>
      prev.map((p) => {
        if (p.stock <= 2 && p.unlockLevel <= stats.level) {
          const targetStock = Math.min(5, p.maxStock || 10);
          const needed = targetStock - p.stock;
          const cost = needed * p.cost;
          if (needed > 0 && remainingMoney >= cost) {
            remainingMoney -= cost;
            totalSpent += cost;
            itemsRestocked += needed;
            return { ...p, stock: p.stock + needed };
          }
        }
        return p;
      })
    );

    if (totalSpent > 0) {
      playCoinSound();
      setStats((s) => ({
        ...s,
        money: s.money - totalSpent,
        todayRestockCost: s.todayRestockCost + totalSpent,
      }));
      showToast(`Đã nhập nhanh ${itemsRestocked} sản phẩm (-${totalSpent.toLocaleString('vi-VN')}đ)!`, 'success');
    } else {
      showToast('Không đủ tiền để nhập nhanh sản phẩm!', 'warning');
    }
  };

  // Open Shop for the Day (Requirement 10 & 11: 3-5 minute daily cycle)
  const handleOpenShop = () => {
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    playChimeSound();
    const baseCust =
      stats.day === 1 ? 5 :
      stats.day === 2 ? 6 :
      stats.day <= 5 ? 8 :
      stats.day <= 10 ? 10 : 12;
    const maxCust = Math.max(5, Math.round(baseCust * (currentEvent.customerMultiplier || 1.0)));

    const firstCust = createCustomerWithBonuses();
    const wait1 = createCustomerWithBonuses();
    const wait2 = currentTier.maxWaitingCustomers > 1 ? createCustomerWithBonuses() : null;

    setCurrentCustomer(firstCust);
    setWaitingQueue(wait2 ? [wait1, wait2] : [wait1]);
    setOwnerState('greet');
    setOutfit({});
    setShopMode('shop_view');
    setCustomerAnimState('entering');

    animTimerRef.current = setTimeout(() => {
      setCustomerAnimState('arrived');
    }, 1200);

    setStats((prev) => ({
      ...prev,
      isShopOpen: true,
      customersServedToday: 1,
      maxCustomersToday: maxCust,
    }));

    setActiveTab('shop');
    showToast(`Ngày ${stats.day}: ${currentEvent.title}! Khách ${firstCust.name} đã vào tiệm!`, 'info');

    // Check Chapter 1 on Day 1
    if (stats.day === 1) {
      const ch1 = storyChapters.find((c) => c.id === 'ch-1');
      if (ch1 && !ch1.read) {
        setTimeout(() => {
          setActiveStoryChapter(ch1);
        }, 600);
      }
    }
  };

  // Next customer or End Day
  const advanceToNextCustomer = (reason?: 'walkout' | 'served') => {
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    setOutfit({});
    setShopMode('shop_view');

    if (reason === 'walkout') {
      playAlertSound();
      showToast('Khách đã chờ quá lâu và rời tiệm!', 'warning');
      setOwnerState('tired');
      setStats((prev) => ({
        ...prev,
        walkoutsToday: prev.walkoutsToday + 1,
        rating: Math.max(3.0, Number((prev.rating - 0.1).toFixed(1))),
      }));

      // Break streak on walkout
      setPermanentStats((prev) => ({
        ...prev,
        currentStreak: 0,
      }));
    } else {
      setOwnerState('greet');
    }

    // Check if day is over
    if (stats.customersServedToday >= stats.maxCustomersToday) {
      setTimeout(() => {
        handleTriggerEndOfDay();
      }, 500);
      return;
    }

    // Advance queue
    setWaitingQueue((prevQueue) => {
      let nextCust: Customer;
      let remainingQueue: Customer[];

      if (prevQueue.length > 0) {
        nextCust = prevQueue[0];
        remainingQueue = [...prevQueue.slice(1), createCustomerWithBonuses()];
      } else {
        nextCust = createCustomerWithBonuses();
        remainingQueue = [createCustomerWithBonuses()];
      }

      setCurrentCustomer(nextCust);
      setCustomerAnimState('entering');
      scrollToTopShop();

      animTimerRef.current = setTimeout(() => {
        setCustomerAnimState('arrived');
      }, 1200);

      if (nextCust.isVip || nextCust.specialRole === 'vip') {
        playVipFanfare();
        showToast(`KHÁCH VIP: ${nextCust.name} vừa bước vào tiệm!`, 'success');
      } else if (nextCust.specialRole === 'influencer') {
        playVipFanfare();
        showToast(`INFLUENCER: ${nextCust.name} ghé tiệm quay video OOTD!`, 'info');
      } else if (nextCust.specialRole === 'reviewer') {
        playChimeSound();
        showToast(`REVIEWER: ${nextCust.name} đến thẩm định phong cách!`, 'info');
      } else {
        playChimeSound();
        showToast(`Khách mới: ${nextCust.name} (${nextCust.typeLabel})`, 'info');
      }

      setStats((s) => ({
        ...s,
        customersServedToday: s.customersServedToday + 1,
      }));

      return remainingQueue;
    });
  };

  // Trigger End of Day
  const handleTriggerEndOfDay = () => {
    setCurrentCustomer(null);
    setWaitingQueue([]);
    setOwnerState('idle');

    const profit = stats.todayRevenue - stats.todayRestockCost;

    // Check end-of-day missions: noCustomerLeave & profit
    setMissions((prevMissions) =>
      prevMissions.map((m) => {
        if (m.type === 'noCustomerLeave') {
          const noLeave = stats.walkoutsToday === 0;
          if (noLeave && !m.completed) {
            setTimeout(() => {
              playMissionCompleteSound();
              showToast(`Hoàn thành nhiệm vụ: ${m.title}!`, 'success');
            }, 300);
            return { ...m, progress: 1, completed: true };
          }
        }
        if (m.type === 'profit') {
          if (profit >= m.target && !m.completed) {
            setTimeout(() => {
              playMissionCompleteSound();
              showToast(`Hoàn thành nhiệm vụ: ${m.title}!`, 'success');
            }, 300);
            return { ...m, progress: profit, completed: true };
          }
        }
        return m;
      })
    );

    setDaySummary({
      day: stats.day,
      revenue: stats.todayRevenue,
      restockCost: stats.todayRestockCost,
      profit: profit,
      totalCustomers: stats.customersServedToday,
      successfulSales: stats.successfulSalesToday,
      failedSales: stats.failedSalesToday,
      walkouts: stats.walkoutsToday,
      fiveStarCount: stats.fiveStarToday,
      finalRating: stats.rating,
      expEarned: stats.successfulSalesToday * 15,
    });

    setStats((prev) => ({
      ...prev,
      isShopOpen: false,
    }));
  };

  // Next Day Handler
  const handleNextDay = () => {
    playTapSound();
    setDaySummary(null);

    const nextDay = stats.day + 1;
    const nextEvent = getRandomDailyEvent(nextDay);
    const nextMissions = generateDailyMissions(nextDay);

    setCurrentEvent(nextEvent);
    setMissions(nextMissions);
    setViralCustomersRemaining(0);

    setStats((prev) => ({
      ...prev,
      day: nextDay,
      todayRevenue: 0,
      todayRestockCost: 0,
      customersServedToday: 0,
      successfulSalesToday: 0,
      failedSalesToday: 0,
      walkoutsToday: 0,
      fiveStarToday: 0,
      isShopOpen: false,
    }));

    showToast(`Chào mừng Ngày ${nextDay}: ${nextEvent.title}! Hãy nhập hàng và sẵn sàng nhé!`, 'info');
  };

  // Customer patience countdown timer
  useEffect(() => {
    if (
      gameState !== 'PLAYING' ||
      !stats.isShopOpen ||
      !currentCustomer ||
      fittingResult !== null ||
      levelUpData !== null ||
      daySummary !== null ||
      isMissionsOpen ||
      isAchievementsOpen ||
      isCollectionOpen ||
      isWardrobeOpen ||
      activeStoryChapter !== null ||
      showTutorial
    )
      return;

    const timer = setInterval(() => {
      setCurrentCustomer((prev) => {
        if (!prev) return null;
        const newPatience = prev.currentPatience - 1;
        if (newPatience <= 0) {
          setCustomerAnimState('exiting');
          if (animTimerRef.current) clearTimeout(animTimerRef.current);
          animTimerRef.current = setTimeout(() => advanceToNextCustomer('walkout'), 1100);
          return null;
        }
        return {
          ...prev,
          currentPatience: newPatience,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    gameState,
    stats.isShopOpen,
    currentCustomer?.id,
    fittingResult,
    levelUpData,
    daySummary,
    isMissionsOpen,
    isAchievementsOpen,
    isCollectionOpen,
    isWardrobeOpen,
    activeStoryChapter,
    showTutorial,
  ]);

  // Outfit Selection Handler
  const handleToggleProduct = (product: Product) => {
    playTapSound();
    setOwnerState('help');

    setOutfit((prev) => {
      const nextOutfit = { ...prev };

      // Deselect if already selected
      if (nextOutfit.top?.id === product.id) {
        delete nextOutfit.top;
        showToast(`Đã bỏ ${product.name}`, 'info');
        return nextOutfit;
      }
      if (nextOutfit.bottom?.id === product.id) {
        delete nextOutfit.bottom;
        showToast(`Đã bỏ ${product.name}`, 'info');
        return nextOutfit;
      }
      if (nextOutfit.skirt?.id === product.id) {
        delete nextOutfit.skirt;
        showToast(`Đã bỏ ${product.name}`, 'info');
        return nextOutfit;
      }
      if (nextOutfit.dress?.id === product.id) {
        delete nextOutfit.dress;
        showToast(`Đã bỏ ${product.name}`, 'info');
        return nextOutfit;
      }
      if (nextOutfit.jacket?.id === product.id) {
        delete nextOutfit.jacket;
        showToast(`Đã bỏ ${product.name}`, 'info');
        return nextOutfit;
      }
      if (nextOutfit.shoes?.id === product.id) {
        delete nextOutfit.shoes;
        showToast(`Đã bỏ ${product.name}`, 'info');
        return nextOutfit;
      }
      if (nextOutfit.bag?.id === product.id) {
        delete nextOutfit.bag;
        showToast(`Đã bỏ ${product.name}`, 'info');
        return nextOutfit;
      }
      if (nextOutfit.accessory?.id === product.id) {
        delete nextOutfit.accessory;
        showToast(`Đã bỏ ${product.name}`, 'info');
        return nextOutfit;
      }

      // Mutual exclusivity rules
      if (product.category === 'dresses') {
        nextOutfit.dress = product;
        delete nextOutfit.top;
        delete nextOutfit.bottom;
        delete nextOutfit.skirt;
        showToast(`Đã chọn Đầm (Đã bỏ Áo/Quần/Váy)`, 'info');
        return nextOutfit;
      }
      if (product.category === 'tops') {
        nextOutfit.top = product;
        delete nextOutfit.dress;
        showToast(`Đã chọn Áo`, 'info');
        return nextOutfit;
      }
      if (product.category === 'bottoms') {
        nextOutfit.bottom = product;
        delete nextOutfit.dress;
        delete nextOutfit.skirt;
        showToast(`Đã chọn Quần (Đã bỏ Chân váy)`, 'info');
        return nextOutfit;
      }
      if (product.category === 'skirts') {
        nextOutfit.skirt = product;
        delete nextOutfit.dress;
        delete nextOutfit.bottom;
        showToast(`Đã chọn Chân váy (Đã bỏ Quần)`, 'info');
        return nextOutfit;
      }
      if (product.category === 'jackets') {
        nextOutfit.jacket = product;
        showToast(`Đã chọn Áo khoác`, 'info');
        return nextOutfit;
      }
      if (product.category === 'shoes') {
        nextOutfit.shoes = product;
        showToast(`Đã chọn Giày`, 'info');
        return nextOutfit;
      }
      if (product.category === 'bags') {
        nextOutfit.bag = product;
        showToast(`Đã chọn Túi xách`, 'info');
        return nextOutfit;
      }
      if (product.category === 'accessories') {
        nextOutfit.accessory = product;
        showToast(`Đã chọn Phụ kiện`, 'info');
        return nextOutfit;
      }

      return nextOutfit;
    });
  };

  const handleRemoveItem = (slot: OutfitSlot) => {
    playTapSound();
    setOutfit((prev) => {
      const nextOutfit = { ...prev };
      delete nextOutfit[slot];
      return nextOutfit;
    });
  };

  const handleClearOutfit = () => {
    playTapSound();
    setOutfit({});
    showToast('Đã làm mới set đồ!', 'info');
  };

  // Auto Outfit Stylist Handler
  const handleAutoOutfit = () => {
    if (!currentCustomer) {
      showToast('Chưa có khách hàng trong tiệm!', 'warning');
      return;
    }

    const inStockProds = products.filter((p) => p.unlockLevel <= stats.level && p.stock > 0);
    if (inStockProds.length === 0) {
      showToast('Kho hàng đã hết! Hãy bấm Nhập Hàng để bổ sung nhé.', 'warning');
      return;
    }

    const autoOutfit = generateAutoOutfit(currentCustomer, products, stats.level);
    const autoItems = getOutfitItems(autoOutfit);

    if (autoItems.length === 0) {
      showToast('Không tìm thấy đồ trong kho vừa túi tiền của khách!', 'warning');
      return;
    }

    playChimeSound();
    setOutfit(autoOutfit);
    setOwnerState('help');
    showToast(`⚡ Đã tự động chọn set đồ hợp gu cho ${currentCustomer.name} (${autoItems.length} món)!`, 'success');
  };

  // Apply Recommended Combo Handler
  const handleApplyCombo = (comboOutfit: Outfit) => {
    if (!currentCustomer) return;
    const comboItems = getOutfitItems(comboOutfit);
    playChimeSound();
    setOutfit(comboOutfit);
    setOwnerState('help');
    showToast(`✨ Đã áp dụng Combo gợi ý (${comboItems.length} món) cho ${currentCustomer.name}!`, 'success');
  };

  // Try Outfit & Calculate Score with Mirror & Mannequin bonus
  const handleTryOutfit = () => {
    if (!currentCustomer) return;
    playChimeSound();

    const mirrorUpgrade = upgrades.find((u) => u.id === 'mirror');
    const mannequinUpgrade = upgrades.find((u) => u.id === 'mannequin');
    const decorScoreBonus = equippedDecors
      .filter((d) => d.bonusType === 'score')
      .reduce((sum, d) => sum + d.bonusValue, 0);

    const bonusPoints =
      (mirrorUpgrade ? (mirrorUpgrade.level - 1) * mirrorUpgrade.effectPerLevel : 0) +
      (mannequinUpgrade ? (mannequinUpgrade.level - 1) * mannequinUpgrade.effectPerLevel : 0) +
      decorScoreBonus;

    const result = calculateOutfitScore(currentCustomer, outfit);

    if (bonusPoints > 0) {
      result.totalScore = Math.min(100, Math.round(result.totalScore + bonusPoints));
      if (result.totalScore >= 90) result.stars = 5;
      else if (result.totalScore >= 75) result.stars = 4;
      else if (result.totalScore >= 60) result.stars = 3;
    }

    // Special Customer Role requirement: Picky customers require minScoreRequired
    if (currentCustomer.minScoreRequired && result.totalScore < currentCustomer.minScoreRequired) {
      result.isSuccess = false;
      result.reactionDialogue = `“Bộ này mới được ${result.totalScore} điểm, chưa đạt chuẩn ${currentCustomer.minScoreRequired} điểm mình mong muốn. Tiếc quá mình chưa ưng ý!”`;
    } else {
      result.isSuccess = result.totalScore >= 60;
    }

    setFittingResult(result);
    setOwnerState(result.isSuccess ? 'happy' : 'tired');
  };

  // Complete Sale or Process Failure
  const handleFinishSale = () => {
    if (!fittingResult || !currentCustomer) return;

    const outfitItems = getOutfitItems(outfit);
    const isKorean =
      currentCustomer.preferredStyle === 'korean' ||
      outfitItems.some((i) => i.styleTags.includes('korean'));
    const isStreetwear =
      currentCustomer.preferredStyle === 'streetwear' ||
      currentCustomer.preferredStyle === 'y2k' ||
      outfitItems.some((i) => i.styleTags.includes('streetwear') || i.styleTags.includes('y2k'));

    const isFastService = currentCustomer.currentPatience >= currentCustomer.maxPatience * 0.5;
    const isVipCust = currentCustomer.isVip || currentCustomer.specialRole === 'vip';

    if (fittingResult.isSuccess) {
      // 1. Deduct stock
      const selectedItemIds = new Set(outfitItems.map((i) => i.id));
      setProducts((prev) =>
        prev.map((p) => {
          if (selectedItemIds.has(p.id)) {
            return { ...p, stock: Math.max(0, p.stock - 1) };
          }
          return p;
        })
      );

      // 2. Add Money & EXP & Multi-level-up check
      setStats((prev) => {
        const newMoney = prev.money + fittingResult.totalRevenue;
        const newTodayRevenue = prev.todayRevenue + fittingResult.totalRevenue;
        let newLevel = prev.level;
        let newExp = prev.exp + fittingResult.expEarned;
        let nextExp = prev.nextLevelExp;
        let didLevelUp = false;

        while (newExp >= nextExp) {
          didLevelUp = true;
          newLevel += 1;
          newExp = newExp - nextExp;
          nextExp = Math.round(100 * Math.pow(1.35, newLevel - 1));
        }

        if (didLevelUp) {
          const unlockedProducts = products.filter(
            (p) => p.unlockLevel <= newLevel && p.unlockLevel > prev.level
          );
          const oldStyles = getUnlockedStyles(prev.level);
          const currentStyles = getUnlockedStyles(newLevel);
          const newlyUnlockedStyles = currentStyles.filter((s) => !oldStyles.includes(s));

          setTimeout(() => {
            playVipFanfare();
            setShowConfetti(true);
            setLevelUpData({
              level: newLevel,
              newProducts: unlockedProducts,
              newStyles: newlyUnlockedStyles,
            });
          }, 400);
        }

        // Weighted Rating update + Reviewer role bonus
        let reviewerRatingDelta = 0;
        if (currentCustomer.specialRole === 'reviewer') {
          reviewerRatingDelta = fittingResult.totalScore >= 80 ? 0.2 : 0.05;
        }

        const updatedRating = Number(
          (prev.rating * 0.85 + fittingResult.stars * 0.15 + reviewerRatingDelta).toFixed(1)
        );
        const finalRating = Math.min(5.0, Math.max(3.0, updatedRating));

        const updatedStats: ShopStats = {
          ...prev,
          money: newMoney,
          todayRevenue: newTodayRevenue,
          level: newLevel,
          exp: newExp,
          nextLevelExp: nextExp,
          rating: finalRating,
          successfulSalesToday: prev.successfulSalesToday + 1,
          fiveStarToday: prev.fiveStarToday + (fittingResult.stars === 5 ? 1 : 0),
        };

        // Update permanent stats
        setPermanentStats((perm) => {
          const newStreak = fittingResult.totalScore >= 80 ? perm.currentStreak + 1 : 0;
          const nextPerm: PermanentStats = {
            ...perm,
            totalCustomersServed: perm.totalCustomersServed + 1,
            totalSuccessfulSales: perm.totalSuccessfulSales + 1,
            totalFiveStarSales: perm.totalFiveStarSales + (fittingResult.stars === 5 ? 1 : 0),
            totalRevenue: perm.totalRevenue + fittingResult.totalRevenue,
            totalProfit: perm.totalProfit + fittingResult.totalRevenue,
            totalVipServed: perm.totalVipServed + (isVipCust ? 1 : 0),
            totalOutfitScore90Plus: perm.totalOutfitScore90Plus + (fittingResult.totalScore >= 90 ? 1 : 0),
            koreanSalesCount: perm.koreanSalesCount + (isKorean ? 1 : 0),
            streetwearSalesCount: perm.streetwearSalesCount + (isStreetwear ? 1 : 0),
            currentStreak: newStreak,
            highestStreak: Math.max(perm.highestStreak, newStreak),
          };

          checkAchievements(nextPerm, updatedStats, decors);
          checkStoryUnlocks(nextPerm, updatedStats);
          checkSkinUnlocks(nextPerm, updatedStats);
          return nextPerm;
        });

        return updatedStats;
      });

      // 3. Update Daily Missions
      setMissions((prevMissions) =>
        prevMissions.map((m) => {
          let addProgress = 0;

          if (m.type === 'successfulSales') addProgress = 1;
          else if (m.type === 'fiveStarSales' && fittingResult.stars === 5) addProgress = 1;
          else if (m.type === 'revenue') addProgress = fittingResult.totalRevenue;
          else if (m.type === 'specificStyleSales') {
            if (m.specificStyle && (currentCustomer.preferredStyle === m.specificStyle || outfitItems.some((i) => i.styleTags.includes(m.specificStyle!)))) {
              addProgress = 1;
            }
          } else if (m.type === 'fastService' && isFastService) addProgress = 1;
          else if (m.type === 'vipCustomer' && isVipCust) addProgress = 1;
          else if (m.type === 'outfitScore' && fittingResult.totalScore >= 85) addProgress = 1;
          else if (m.type === 'saleStreak' && fittingResult.totalScore >= 80) addProgress = 1;

          const newProgress = Math.min(m.target, m.progress + addProgress);
          const isNowCompleted = newProgress >= m.target;

          if (isNowCompleted && !m.completed) {
            setTimeout(() => {
              playMissionCompleteSound();
              setShowConfetti(true);
              showToast(`Hoàn thành nhiệm vụ: ${m.title}! Nhấn vào Nhiệm vụ để nhận thưởng!`, 'success');
            }, 600);
            return { ...m, progress: newProgress, completed: true };
          }

          return { ...m, progress: newProgress };
        })
      );

      // 4. Special Customer Role Bonuses
      if (currentCustomer.specialRole === 'influencer' && fittingResult.totalScore >= 90) {
        setViralCustomersRemaining(3);
        setShowConfetti(true);
        showToast('Video OOTD lên xu hướng TikTok! 3 khách tiếp theo sẽ tip thêm +20%! 🎉', 'success');
      }

      if (fittingResult.stars === 5) {
        setShowConfetti(true);
      }

      showToast(`+${fittingResult.totalRevenue.toLocaleString('vi-VN')}đ đã vào quỹ tiệm!`, 'success');
    } else {
      // Failed sale
      let ratingPenalty = 0.05;
      if (currentCustomer.specialRole === 'reviewer') {
        ratingPenalty = 0.15;
      }

      setStats((prev) => ({
        ...prev,
        failedSalesToday: prev.failedSalesToday + 1,
        rating: Math.max(3.0, Number((prev.rating - ratingPenalty).toFixed(1))),
      }));

      setPermanentStats((perm) => ({
        ...perm,
        totalCustomersServed: perm.totalCustomersServed + 1,
        currentStreak: 0,
      }));

      showToast('Khách không mua đồ lần này.', 'warning');
    }

    if (viralCustomersRemaining > 0) {
      setViralCustomersRemaining((v) => Math.max(0, v - 1));
    }

    setFittingResult(null);
    setShopMode('shop_view');
    setCustomerAnimState('exiting');
    scrollToTopShop();
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    animTimerRef.current = setTimeout(() => {
      advanceToNextCustomer('served');
    }, 1100);
  };

  // Phase 13: Claim Mission Reward
  const handleClaimMissionReward = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || !mission.completed || mission.claimed) return;

    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, claimed: true } : m))
    );

    if (mission.rewardType === 'money') {
      playCoinSound();
      setStats((s) => ({ ...s, money: s.money + mission.rewardValue }));
      showToast(`Đã nhận +${mission.rewardValue.toLocaleString('vi-VN')}đ từ nhiệm vụ!`, 'success');
    } else {
      playChimeSound();
      handleAddExp(mission.rewardValue);
      showToast(`Đã nhận +${mission.rewardValue} EXP từ nhiệm vụ!`, 'success');
    }
  };

  // Phase 14: Claim Achievement Reward
  const handleClaimAchievementReward = (achievementId: string) => {
    const ach = achievements.find((a) => a.id === achievementId);
    if (!ach || !ach.unlocked || ach.claimed) return;

    setAchievements((prev) =>
      prev.map((a) => (a.id === achievementId ? { ...a, claimed: true } : a))
    );

    if (ach.rewardType === 'money') {
      playCoinSound();
      setStats((s) => ({ ...s, money: s.money + ach.rewardValue }));
      showToast(`Đã nhận +${ach.rewardValue.toLocaleString('vi-VN')}đ từ thành tựu!`, 'success');
    } else {
      playChimeSound();
      handleAddExp(ach.rewardValue);
      showToast(`Đã nhận +${ach.rewardValue} EXP từ thành tựu!`, 'success');
    }
  };

  // Phase 17: Finish Story Chapter
  const handleFinishStoryChapter = (chapterId: string) => {
    const chapter = storyChapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    setStoryChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, read: true } : c))
    );

    if (!chapter.read) {
      if (chapter.rewardMoney) {
        setStats((s) => ({ ...s, money: s.money + chapter.rewardMoney! }));
      }
      if (chapter.rewardExp) {
        handleAddExp(chapter.rewardExp);
      }
      showToast(`Hoàn thành chương: ${chapter.title}!`, 'success');
    }

    setActiveStoryChapter(null);
  };

  // Phase 18: Claim Collection Reward
  const handleClaimCollectionReward = (collectionId: string) => {
    const col = collections.find((c) => c.id === collectionId);
    if (!col || col.claimed) return;

    setCollections((prev) =>
      prev.map((c) => (c.id === collectionId ? { ...c, claimed: true } : c))
    );

    if (col.reward.type === 'money') {
      playCoinSound();
      setStats((s) => ({ ...s, money: s.money + (col.reward.value as number) }));
      showToast(`Đã nhận +${(col.reward.value as number).toLocaleString('vi-VN')}đ từ bộ sưu tập!`, 'success');
    } else if (col.reward.type === 'skin') {
      const skinId = col.reward.value as string;
      setSkins((prev) =>
        prev.map((sk) => (sk.id === skinId ? { ...sk, isUnlocked: true } : sk))
      );
      playSuccessFanfare();
      setShowConfetti(true);
      showToast(`Đã mở khóa trang phục mới cho Cô Chủ Như: ${col.reward.label}!`, 'success');
    }
  };

  // Phase 19: Equip Owner Skin
  const handleEquipSkin = (skinId: string) => {
    setSkins((prev) =>
      prev.map((sk) => ({ ...sk, isEquipped: sk.id === skinId }))
    );
    const eq = skins.find((s) => s.id === skinId);
    showToast(`Đã mặc trang phục: ${eq ? eq.name : ''}!`, 'success');
    setIsWardrobeOpen(false);
  };

  // Phase 20: Complete Tutorial
  const handleCompleteTutorial = () => {
    setShowTutorial(false);
    try {
      localStorage.setItem('fashionShop_tutorialCompleted', 'true');
    } catch {
      // ignore
    }
    showToast('Hoàn tất cẩm nang mở tiệm! Chúc bạn kinh doanh hồng phát!', 'success');
  };

  // Phase 9: Restock Action
  const handleRestockItem = (productId: string, quantity: number, totalCost: number): boolean => {
    if (stats.money < totalCost) return false;

    setStats((prev) => ({
      ...prev,
      money: prev.money - totalCost,
      todayRestockCost: prev.todayRestockCost + totalCost,
    }));

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = Math.min(p.maxStock || 10, p.stock + quantity);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );

    return true;
  };

  // Phase 12: Upgrades & Expansion
  const handleUpgradeFacility = (upgradeId: string, cost: number): boolean => {
    if (stats.money < cost) return false;

    setStats((prev) => ({
      ...prev,
      money: prev.money - cost,
    }));

    setUpgrades((prev) =>
      prev.map((u) => (u.id === upgradeId ? { ...u, level: u.level + 1 } : u))
    );

    return true;
  };

  const handleUpgradeShopTier = (targetTier: ShopTier): boolean => {
    if (stats.money < targetTier.upgradeCost) return false;

    setStats((prev) => {
      const nextStats = {
        ...prev,
        money: prev.money - targetTier.upgradeCost,
        shopTierLevel: targetTier.level,
      };
      checkAchievements(permanentStats, nextStats, decors);
      checkStoryUnlocks(permanentStats, nextStats);
      checkSkinUnlocks(permanentStats, nextStats);
      return nextStats;
    });

    return true;
  };

  // Phase 12: Decor Store Actions
  const handleBuyDecor = (decorId: string, price: number): boolean => {
    if (stats.money < price) return false;

    setStats((prev) => ({
      ...prev,
      money: prev.money - price,
    }));

    const nextDecors = decors.map((d) =>
      d.id === decorId ? { ...d, owned: true, equipped: true } : d
    );
    setDecors(nextDecors);

    setPermanentStats((perm) => {
      const nextPerm = { ...perm, totalDecorPurchased: perm.totalDecorPurchased + 1 };
      checkAchievements(nextPerm, stats, nextDecors);
      return nextPerm;
    });

    return true;
  };

  const handleToggleEquipDecor = (decorId: string): boolean => {
    setDecors((prev) =>
      prev.map((d) => (d.id === decorId ? { ...d, equipped: !d.equipped } : d))
    );
    return true;
  };

  // Debug Panel Actions
  const handleAddMoney = (amount: number) => {
    playCoinSound();
    setStats((prev) => ({ ...prev, money: prev.money + amount }));
    showToast(`Đã cộng +${amount.toLocaleString('vi-VN')}đ!`, 'success');
  };

  const handleAddExp = (amount: number) => {
    playChimeSound();
    setStats((prev) => {
      let newLevel = prev.level;
      let newExp = prev.exp + amount;
      let nextExp = prev.nextLevelExp;
      let didLevelUp = false;

      while (newExp >= nextExp) {
        didLevelUp = true;
        newLevel += 1;
        newExp = newExp - nextExp;
        nextExp = Math.round(100 * Math.pow(1.35, newLevel - 1));
      }

      if (didLevelUp) {
        const unlockedProducts = products.filter(
          (p) => p.unlockLevel <= newLevel && p.unlockLevel > prev.level
        );
        const oldStyles = getUnlockedStyles(prev.level);
        const currentStyles = getUnlockedStyles(newLevel);
        const newlyUnlockedStyles = currentStyles.filter((s) => !oldStyles.includes(s));

        setTimeout(() => {
          playVipFanfare();
          setShowConfetti(true);
          setLevelUpData({
            level: newLevel,
            newProducts: unlockedProducts,
            newStyles: newlyUnlockedStyles,
          });
        }, 400);
      }

      const updatedStats = { ...prev, level: newLevel, exp: newExp, nextLevelExp: nextExp };
      checkStoryUnlocks(permanentStats, updatedStats);
      checkSkinUnlocks(permanentStats, updatedStats);
      return updatedStats;
    });
    showToast(`Đã cộng +${amount} EXP!`, 'success');
  };

  const handleSpawnVip = () => {
    const vip = createCustomerWithBonuses(true);
    setCurrentCustomer(vip);
    setOutfit({});
    playVipFanfare();
    showToast(`VIP ${vip.name} đã được triệu hồi!`, 'info');
  };

  const handleResetPatience = () => {
    if (currentCustomer) {
      setCurrentCustomer({
        ...currentCustomer,
        currentPatience: currentCustomer.maxPatience,
      });
      playTapSound();
      showToast('Đã hồi đầy 100% thanh kiên nhẫn!', 'info');
    }
  };

  const handleRefillStock = () => {
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        stock: p.maxStock || 10,
      }))
    );
    playTapSound();
    showToast(`Đã nạp đầy tất cả sản phẩm (${maxStockCapacity}/${maxStockCapacity})!`, 'info');
  };

  const handleCompleteAllMissions = () => {
    setMissions((prev) =>
      prev.map((m) => ({
        ...m,
        progress: m.target,
        completed: true,
      }))
    );
    playMissionCompleteSound();
    setShowConfetti(true);
    showToast('Đã hoàn thành tất cả 3 nhiệm vụ ngày!', 'success');
  };

  const handleUnlockNextAchievement = () => {
    const lockedAch = achievements.find((a) => !a.unlocked);
    if (!lockedAch) {
      showToast('Tất cả thành tựu đã được mở khóa rồi!', 'info');
      return;
    }
    setAchievements((prev) =>
      prev.map((a) =>
        a.id === lockedAch.id ? { ...a, progress: a.target, unlocked: true, unlockedAt: Date.now() } : a
      )
    );
    playAchievementSound();
    setShowConfetti(true);
    showToast(`Đã mở khóa thành tựu: ${lockedAch.name}!`, 'success');
  };

  const handleSwitchEvent = () => {
    const currentIndex = DAILY_EVENTS.findIndex((e) => e.id === currentEvent.id);
    const nextIndex = (currentIndex + 1) % DAILY_EVENTS.length;
    const nextEv = DAILY_EVENTS[nextIndex];
    setCurrentEvent(nextEv);
    playChimeSound();
    showToast(`Đã đổi sang sự kiện: ${nextEv.title}!`, 'info');
  };

  const handleConfirmReset = () => {
    localStorage.removeItem(SAVE_KEY_CURRENT);
    for (let i = 1; i <= SAVE_SCHEMA_VERSION; i++) {
      localStorage.removeItem(`fashionShopSave_v${i}`);
    }
    localStorage.removeItem('fashionShop_tutorialCompleted');
    window.location.reload();
  };

  const lowStockCount = products.filter((p) => p.stock <= 2).length;
  const unclaimedMissionsCount = missions.filter((m) => m.completed && !m.claimed).length;
  const unclaimedAchievementsCount = achievements.filter((a) => a.unlocked && !a.claimed).length;

  const productMap = new Map<string, Product>();
  products.forEach((p) => productMap.set(p.id, p));

  const unclaimedCollectionsCount = collections.filter((c) => {
    const allUnlocked = c.productIds.every((pid) => {
      const p = productMap.get(pid);
      return p && p.unlockLevel <= stats.level;
    });
    return allUnlocked && !c.claimed;
  }).length;

  const hasUnreadStory = storyChapters.some((c) => c.unlocked && !c.read);

  const getContainerMaxWidth = () => {
    switch (mobileWidthPreset) {
      case '375':
        return 'max-w-[375px]';
      case '430':
        return 'max-w-[430px]';
      case 'full':
        return 'max-w-none';
      case '390':
      default:
        return 'max-w-[415px]';
    }
  };

  // Toast Icon and Color Mapper
  const renderToastContent = (toast: GameToast) => {
    switch (toast.type) {
      case 'success':
        return (
          <div className="bg-emerald-900/95 text-emerald-100 border border-emerald-400/50 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 truncate max-w-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{toast.message}</span>
          </div>
        );
      case 'warning':
        return (
          <div className="bg-amber-950/95 text-amber-100 border border-amber-400/50 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 truncate max-w-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{toast.message}</span>
          </div>
        );
      case 'error':
        return (
          <div className="bg-rose-950/95 text-rose-100 border border-rose-400/50 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 truncate max-w-xs">
            <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">{toast.message}</span>
          </div>
        );
      case 'info':
      default:
        return (
          <div className="bg-[#3E3431]/95 text-white border border-[#F4C7D9]/50 text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5 truncate max-w-xs">
            <Info className="w-3.5 h-3.5 text-[#F4C7D9] shrink-0" />
            <span className="truncate">{toast.message}</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-center bg-[#231B19] text-[#3E3431] overflow-hidden p-0 sm:p-2.5">
      {/* Confetti Particle Celebrations (Phase 16) */}
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* PWA Offline Connection Indicator (Phase 16) */}
      <OfflineIndicator />

      {/* Desktop Responsive Simulator Bar */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[460px] px-3 py-1.5 mb-1.5 bg-[#2D2321] rounded-xl border border-white/10 text-white/80 text-[11px]">
        <div className="flex items-center gap-1.5 font-bold text-[#F4C7D9]">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile 9:16 Test</span>
        </div>
        <div className="flex items-center gap-1 bg-black/30 p-0.5 rounded-lg border border-white/10">
          {(['375', '390', '430'] as const).map((w) => (
            <button
              key={w}
              onClick={() => setMobileWidthPreset(w)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                mobileWidthPreset === w
                  ? 'bg-[#D87C9B] text-white shadow-xs'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {w}px
            </button>
          ))}
        </div>
      </div>

      {/* Main 9:16 Mobile Game Chassis */}
      <div
        className={`relative w-full flex-1 min-h-0 sm:h-[95vh] sm:max-h-[895px] ${getContainerMaxWidth()} bg-[#FFF7F1] sm:rounded-[36px] sm:border-[8px] sm:border-[#382D2A] sm:shadow-2xl overflow-hidden flex flex-col`}
      >
        {/* Mobile Camera / Notch simulation on desktop */}
        <div className="hidden sm:flex justify-center pt-1.5 pb-0.5 bg-[#FFF8F4]">
          <div className="w-20 h-3.5 bg-[#231B19] rounded-full flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#150F0E]" />
            <div className="w-2.5 h-1 bg-[#150F0E] rounded-full" />
          </div>
        </div>

        {/* Global Toast Notification */}
        {currentToast && (
          <div className="absolute top-14 inset-x-3 z-50 pointer-events-none flex justify-center animate-gentle-bounce">
            {renderToastContent(currentToast)}
          </div>
        )}

        {/* Game State Switcher */}
        {gameState === 'START' ? (
          <StartScreen
            onStartGame={() => {
              playTapSound();
              startBGM();
              setGameState('PLAYING');
              if (!stats.isShopOpen) {
                handleOpenShop();
              }
            }}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenChangelog={() => setIsChangelogOpen(true)}
            hasSavedGame={stats.day > 1 || stats.customersServedToday > 0}
            equippedAvatar={ownerAvatar}
          />
        ) : (
          <div className="w-full flex-1 min-h-0 flex flex-col">
            {/* Header with missions, achievements, wardrobe, collections, story */}
            <Header
              stats={stats}
              unclaimedMissionsCount={unclaimedMissionsCount}
              unclaimedAchievementsCount={unclaimedAchievementsCount}
              unclaimedCollectionsCount={unclaimedCollectionsCount}
              hasUnreadStory={hasUnreadStory}
              isMuted={isMuted}
              onToggleMute={handleToggleSound}
              onCloseShop={handleCloseShop}
              onOpenMissions={() => setIsMissionsOpen(true)}
              onOpenAchievements={() => setIsAchievementsOpen(true)}
              onOpenWardrobe={() => setIsWardrobeOpen(true)}
              onOpenCollections={() => setIsCollectionOpen(true)}
              onOpenStory={() => setIsStoryArchiveOpen(true)}
              onOpenGuide={() => setIsGuideOpen(true)}
              onOpenDebug={() => setIsDebugOpen(true)}
              onOpenChangelog={() => setIsChangelogOpen(true)}
            />

            {/* Main Tab Content Switching */}
            {activeTab === 'shop' && (
              <div className="flex-1 flex flex-col min-h-0 overflow-y-auto overscroll-contain px-3 py-2 pb-20 space-y-2.5 custom-scrollbar" style={{WebkitOverflowScrolling: 'touch', touchAction: 'pan-y'}}>
                {/* Phase 15: Daily Event Banner */}
                <DailyEventBanner event={currentEvent} />

                {!stats.isShopOpen ? (
                  /* MANAGEMENT PHASE HUB (Requirement 12 & 13) */
                  <div className="space-y-3 pb-3">
                    {/* Low Stock Warning Alert & Quick Restock Button (Requirement 13) */}
                    {lowStockCount > 0 ? (
                      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 shadow-xs flex items-center justify-between gap-2.5">
                        <div>
                          <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Có {lowStockCount} sản phẩm sắp hết hàng!</span>
                          </div>
                          <p className="text-[10.5px] text-amber-800 leading-snug mt-0.5">
                            Nhập nhanh để sẵn sàng phục vụ khách Ngày {stats.day}.
                          </p>
                        </div>
                        <button
                          onClick={handleQuickRestockLowStock}
                          className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs shadow-xs shrink-0 flex items-center gap-1"
                        >
                          <Zap className="w-3.5 h-3.5 fill-white" />
                          <span>NHẬP NHANH</span>
                        </button>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Kho hàng đầy đủ, sẵn sàng cho Ngày {stats.day}!</span>
                      </div>
                    )}

                    {/* Boutique Shop Interior */}
                    <ShopArea
                      currentCustomer={null}
                      waitingQueue={[]}
                      ownerState="idle"
                      equippedDecors={equippedDecors}
                      isShopOpen={false}
                      ownerAvatar={ownerAvatar}
                      onCustomerClick={() => {}}
                      onOwnerClick={() => {
                        playTapSound();
                        setIsWardrobeOpen(true);
                      }}
                      onOpenShop={handleOpenShop}
                    />

                    {/* Management Quick Actions Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <button
                        onClick={() => setActiveTab('restock')}
                        className="p-3 bg-white rounded-2xl border border-[#F2E1CF] hover:border-[#D87C9B] flex items-center gap-2.5 shadow-2xs active:scale-98 transition-all"
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                          <Package className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="text-[#3E3431]">Nhập hàng mới</div>
                          <div className="text-[10px] text-[#8D6E63] font-normal">Bổ sung kho đồ</div>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('upgrade')}
                        className="p-3 bg-white rounded-2xl border border-[#F2E1CF] hover:border-[#D87C9B] flex items-center gap-2.5 shadow-2xs active:scale-98 transition-all"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="text-[#3E3431]">Nâng cấp tiệm</div>
                          <div className="text-[10px] text-[#8D6E63] font-normal">Kệ đồ, gương soi</div>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('decor')}
                        className="p-3 bg-white rounded-2xl border border-[#F2E1CF] hover:border-[#D87C9B] flex items-center gap-2.5 shadow-2xs active:scale-98 transition-all"
                      >
                        <div className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-[#D87C9B]">
                          <Palette className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="text-[#3E3431]">Trang trí tiệm</div>
                          <div className="text-[10px] text-[#8D6E63] font-normal">Cây, đèn, nội thất</div>
                        </div>
                      </button>

                      <button
                        onClick={() => setIsWardrobeOpen(true)}
                        className="p-3 bg-white rounded-2xl border border-[#F2E1CF] hover:border-[#D87C9B] flex items-center gap-2.5 shadow-2xs active:scale-98 transition-all"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1E88E5]">
                          <Shirt className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="text-[#3E3431]">Tủ đồ Cô Chủ Như</div>
                          <div className="text-[10px] text-[#8D6E63] font-normal">Đổi trang phục</div>
                        </div>
                      </button>
                    </div>

                    {/* Primary Action Button: BẮT ĐẦU NGÀY MỚI */}
                    <button
                      onClick={handleOpenShop}
                      className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-xs font-black shadow-lg shadow-[#D87C9B]/30 flex items-center justify-center gap-2 active:scale-98 transition-all"
                    >
                      <Sun className="w-4 h-4" />
                      <span>BẮT ĐẦU NGÀY MỚI (MỞ TIỆM)</span>
                    </button>
                  </div>
                ) : (
                  /* 2-SCREEN GAMEPLAY LOOP */
                  shopMode === 'shop_view' ? (
                    /* MÀN HÌNH 1: MÀN HÌNH CỬA HÀNG */
                    <div className="space-y-3 animate-fade-in" ref={shopTopRef}>
                      {/* Boutique Shop Scene & Characters with Entrance/Exit Animation */}
                      <ShopArea
                        currentCustomer={currentCustomer}
                        waitingQueue={waitingQueue}
                        ownerState={ownerState}
                        equippedDecors={equippedDecors}
                        isShopOpen={stats.isShopOpen}
                        ownerAvatar={ownerAvatar}
                        customerAnimState={customerAnimState}
                        onCustomerClick={() => {
                          playTapSound();
                          setIsCustomerModalOpen(true);
                        }}
                        onOwnerClick={() => {
                          playTapSound();
                          setIsWardrobeOpen(true);
                        }}
                        onOpenShop={handleOpenShop}
                      />

                      {/* Customer Request Dialogue & Tags */}
                      {currentCustomer && (
                        <CustomerRequestBubble
                          customer={currentCustomer}
                          onInspectCustomer={() => {
                            playTapSound();
                            setIsCustomerModalOpen(true);
                          }}
                        />
                      )}

                      {/* Mục tiêu hôm nay (Daily Goals Card) */}
                      <TodayGoalsCard
                        stats={stats}
                        onOpenMissions={() => {
                          playTapSound();
                          setIsMissionsOpen(true);
                        }}
                      />

                      {/* Primary Action Button: CHỌN OUTFIT CHO [TÊN KHÁCH] */}
                      {currentCustomer && customerAnimState === 'arrived' ? (
                        <button
                          onClick={() => {
                            playTapSound();
                            setShopMode('styling_mode');
                          }}
                          className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#D87C9B] via-[#E91E63] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-xs font-black shadow-lg shadow-[#D87C9B]/35 flex items-center justify-center gap-2 active:scale-98 transition-all animate-soft-pulse uppercase tracking-wider cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '3s' }} />
                          <span>CHỌN OUTFIT CHO {currentCustomer.name}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="w-full h-12 rounded-2xl bg-[#E0D5D0] text-[#8D6E63] text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-not-allowed opacity-85"
                        >
                          <Clock className="w-4 h-4 animate-spin text-[#8D6E63]" />
                          <span>
                            {customerAnimState === 'entering'
                              ? '🚶 KHÁCH ĐANG BƯỚC VÀO TIỆM...'
                              : customerAnimState === 'exiting'
                              ? '👋 KHÁCH ĐANG RỜI TIỆM...'
                              : '✨ ĐANG ĐÓN KHÁCH MỚI...'}
                          </span>
                        </button>
                      )}
                    </div>
                  ) : (
                    /* MÀN HÌNH 2: MÀN HÌNH CHỌN OUTFIT */
                    <div className="space-y-3 animate-fade-in">
                      {/* Top Header Bar & Customer Request Summary */}
                      <div className="flex items-center justify-between bg-white/95 p-2 rounded-2xl border border-[#F4C7D9] shadow-2xs">
                        <button
                          onClick={() => {
                            playTapSound();
                            setShopMode('shop_view');
                            scrollToTopShop();
                          }}
                          className="flex items-center gap-1 text-[11px] font-extrabold text-[#D87C9B] hover:text-[#c96c8a] bg-[#FFF0F5] px-3 py-1.5 rounded-xl border border-[#F4C7D9] active:scale-95 transition-all cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Quay lại cửa hàng</span>
                        </button>
                        <div className="text-[11px] font-black text-[#3E3431] flex items-center gap-1 pr-1">
                          <span className="text-[#8D6E63]">Đang phục vụ:</span>
                          <span className="text-[#D87C9B] font-extrabold">{currentCustomer?.name}</span>
                        </div>
                      </div>

                      {/* Request Summary Card */}
                      {currentCustomer && (
                        <CustomerRequestBubble
                          customer={currentCustomer}
                          onInspectCustomer={() => {
                            playTapSound();
                            setIsCustomerModalOpen(true);
                          }}
                        />
                      )}

                      {/* Outfit Builder & Selected Slots Preview */}
                      {currentCustomer && (
                        <OutfitBuilder
                          outfit={outfit}
                          customer={currentCustomer}
                          onRemoveItem={handleRemoveItem}
                          onClearOutfit={handleClearOutfit}
                          onTryOutfit={handleTryOutfit}
                          onAutoOutfit={handleAutoOutfit}
                          onSelectCategory={handleSelectCategoryFromOutfit}
                        />
                      )}

                      {/* Catalog Browser Grid */}
                      <div ref={catalogRef}>
                        <CatalogBrowser
                          products={products}
                          currentCustomer={currentCustomer}
                          outfit={outfit}
                          playerLevel={stats.level}
                          onToggleProduct={handleToggleProduct}
                          onAutoOutfit={handleAutoOutfit}
                          onApplyCombo={handleApplyCombo}
                          selectedCategory={selectedCatalogCategory}
                          onSelectCategory={setSelectedCatalogCategory}
                        />
                      </div>

                      {/* Action Button: CHO KHÁCH THỬ OUTFIT */}
                      {(() => {
                        const mainValidation = validateOutfit(outfit, currentCustomer);
                        return (
                          <button
                            onClick={handleTryOutfit}
                            disabled={!mainValidation.isValid}
                            className={`w-full h-12 rounded-2xl text-xs font-black shadow-lg flex items-center justify-center gap-2 transition-all uppercase tracking-wider ${
                              mainValidation.isValid
                                ? 'bg-gradient-to-r from-[#D87C9B] via-[#E91E63] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white cursor-pointer active:scale-98 shadow-[#D87C9B]/35'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            }`}
                          >
                            <Sparkles className="w-4 h-4 text-yellow-200" />
                            <span>
                              {mainValidation.isValid
                                ? 'CHO KHÁCH THỬ OUTFIT'
                                : mainValidation.reason}
                            </span>
                          </button>
                        );
                      })()}
                    </div>
                  )
                )}
              </div>
            )}

            {activeTab === 'inventory' && (
              <InventoryModal
                products={products}
                onOpenRestock={() => setActiveTab('restock')}
              />
            )}

            {activeTab === 'restock' && (
              <RestockModal
                products={products}
                money={stats.money}
                onRestockItem={handleRestockItem}
              />
            )}

            {activeTab === 'upgrade' && (
              <ShopUpgradeModal
                stats={stats}
                upgrades={upgrades}
                onUpgradeItem={handleUpgradeFacility}
                onUpgradeShopTier={handleUpgradeShopTier}
              />
            )}

            {activeTab === 'decor' && (
              <DecorModal
                decors={decors}
                money={stats.money}
                maxDecorSlots={currentTier.decorSlots}
                onBuyDecor={handleBuyDecor}
                onToggleEquipDecor={handleToggleEquipDecor}
              />
            )}

            {/* Mobile Bottom Navigation Bar */}
            <BottomNav
              activeTab={activeTab}
              onTabChange={(tab) => {
                playTapSound();
                setActiveTab(tab);
              }}
              lowStockCount={lowStockCount}
            />
          </div>
        )}
      </div>

      {/* Phase 17: Story Milestone Modal */}
      {activeStoryChapter && (
        <StoryModal
          chapter={activeStoryChapter}
          characterAvatar={ownerAvatar}
          onFinishChapter={handleFinishStoryChapter}
          onClose={() => setActiveStoryChapter(null)}
        />
      )}

      {/* Phase 17: Story Archive Book Modal */}
      {isStoryArchiveOpen && (
        <StoryArchiveModal
          chapters={storyChapters}
          onReadChapter={(ch) => {
            setIsStoryArchiveOpen(false);
            setActiveStoryChapter(ch);
          }}
          onClose={() => setIsStoryArchiveOpen(false)}
        />
      )}

      {/* Phase 18: Fashion Collections Modal */}
      {isCollectionOpen && (
        <CollectionModal
          collections={collections}
          products={products}
          playerLevel={stats.level}
          onClaimReward={handleClaimCollectionReward}
          onClose={() => setIsCollectionOpen(false)}
        />
      )}

      {/* Phase 19: Cô Chủ Như Wardrobe Modal */}
      {isWardrobeOpen && (
        <WardrobeModal
          skins={skins}
          onEquipSkin={handleEquipSkin}
          onClose={() => setIsWardrobeOpen(false)}
        />
      )}

      {/* Phase 20: First-Time Tutorial Overlay */}
      {showTutorial && gameState === 'PLAYING' && (
        <TutorialOverlay onCompleteTutorial={handleCompleteTutorial} />
      )}

      {/* Phase 13: Daily Missions Modal */}
      {isMissionsOpen && (
        <MissionsModal
          missions={missions}
          day={stats.day}
          onClaimReward={handleClaimMissionReward}
          onClose={() => setIsMissionsOpen(false)}
        />
      )}

      {/* Phase 14: Achievements Modal */}
      {isAchievementsOpen && (
        <AchievementsModal
          achievements={achievements}
          onClaimReward={handleClaimAchievementReward}
          onClose={() => setIsAchievementsOpen(false)}
        />
      )}

      {/* Fitting Room Modal */}
      {fittingResult && currentCustomer && (
        <FittingModal
          customer={currentCustomer}
          outfit={outfit}
          scoreResult={fittingResult}
          onFinishSale={handleFinishSale}
        />
      )}

      {/* Level Up Celebration Modal */}
      {levelUpData && (
        <LevelUpModal
          level={levelUpData.level}
          newProductsUnlocked={levelUpData.newProducts}
          newStylesUnlocked={levelUpData.newStyles}
          onClose={() => setLevelUpData(null)}
        />
      )}

      {/* Day Summary Modal */}
      {daySummary && (
        <DaySummaryModal
          summary={daySummary}
          event={currentEvent}
          missions={missions}
          onNextDay={handleNextDay}
        />
      )}

      {/* Customer Detail Modal */}
      {isCustomerModalOpen && (
        <CustomerDetailModal
          customer={currentCustomer}
          onClose={() => setIsCustomerModalOpen(false)}
        />
      )}

      {/* Guide Modal */}
      {isGuideOpen && <GuideModal onClose={() => setIsGuideOpen(false)} />}

      {/* Patch Notes / Changelog Modal v1.0.1 */}
      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />

      {/* Developer Debug Panel */}
      {isDebugOpen && (
        <DebugPanel
          onClose={() => setIsDebugOpen(false)}
          onAddMoney={handleAddMoney}
          onAddExp={handleAddExp}
          onSpawnVip={handleSpawnVip}
          onNextCustomer={() => advanceToNextCustomer()}
          onResetPatience={handleResetPatience}
          onRefillStock={handleRefillStock}
          onCompleteAllMissions={handleCompleteAllMissions}
          onUnlockNextAchievement={handleUnlockNextAchievement}
          onSwitchEvent={handleSwitchEvent}
          onResetGame={() => {
            setIsDebugOpen(false);
            setIsResetConfirmOpen(true);
          }}
        />
      )}

      {/* Phase 20: 2-Step Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <ResetConfirmModal
          onConfirmReset={handleConfirmReset}
          onClose={() => setIsResetConfirmOpen(false)}
        />
      )}
    </div>
  );
}
