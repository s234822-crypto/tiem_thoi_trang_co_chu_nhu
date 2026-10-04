import React, { useState, useMemo } from 'react';
import { Customer, Outfit, Product, StyleTag, FashionColor, Rarity } from '../types/game';
import { CATEGORY_LABELS, SUBCATEGORY_LABELS, STYLE_LABELS, COLOR_LABELS, RARITY_LABELS } from '../data/products';
import { getOutfitItems } from '../utils/scoring';
import { getRecommendedProducts, getItemBadgeInfo, generateRecommendedCombos } from '../utils/recommendations';
import { Sparkles, Check, Lock, ShoppingBag, Filter, ChevronDown, Zap, Search, X } from 'lucide-react';
import { GameIcon } from './GameIcon';
import { ProductIcon } from './ProductIcon';

interface CatalogBrowserProps {
  products: Product[];
  currentCustomer: Customer | null;
  outfit: Outfit;
  playerLevel: number;
  onToggleProduct: (product: Product) => void;
  onAutoOutfit?: () => void;
  onApplyCombo?: (outfit: Outfit) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

// Category tab config with GameIcon mapping
const CATEGORY_TABS = [
  { id: 'suggested', label: 'Gợi ý', isSpecial: true },
  { id: 'all', label: 'Tất cả', isSpecial: false },
  { id: 'tops', label: 'Áo', isSpecial: false },
  { id: 'bottoms', label: 'Quần', isSpecial: false },
  { id: 'skirts', label: 'Chân váy', isSpecial: false },
  { id: 'dresses', label: 'Đầm', isSpecial: false },
  { id: 'shoes', label: 'Giày', isSpecial: false },
  { id: 'bags', label: 'Túi', isSpecial: false },
  { id: 'accessories', label: 'Phụ kiện', isSpecial: false },
];

const RARITY_ORDER: Rarity[] = ['common', 'uncommon', 'rare', 'premium', 'luxury'];

export const CatalogBrowser: React.FC<CatalogBrowserProps> = ({
  products,
  currentCustomer,
  outfit,
  playerLevel,
  onToggleProduct,
  onAutoOutfit,
  onApplyCombo,
  selectedCategory: propCategory,
  onSelectCategory,
}) => {
  const [internalCategory, setInternalCategory] = useState<string>('suggested');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const selectedCategory = propCategory || internalCategory;

  const handleCategoryChange = (cat: string) => {
    setInternalCategory(cat);
    setSelectedSubCategory('all');
    onSelectCategory?.(cat);
  };

  const outfitItems = getOutfitItems(outfit);
  const outfitProductIds = useMemo(() => new Set(outfitItems.map((i) => i.id)), [outfitItems]);
  const recommendedProducts = useMemo(
    () => getRecommendedProducts(currentCustomer, products, playerLevel),
    [currentCustomer, products, playerLevel],
  );
  const recommendedCombos = useMemo(
    () => generateRecommendedCombos(currentCustomer, products, playerLevel),
    [currentCustomer, products, playerLevel],
  );

  // Available subCategories for current category tab
  const availableSubCategories = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'suggested' || selectedCategory === 'all') return [];
    const catProds = products.filter(p => {
      if (selectedCategory === 'accessories') return p.category === 'accessories' || p.category === 'jackets';
      return p.category === selectedCategory;
    });
    const subMap = new Map<string, string>();
    catProds.forEach(p => {
      if (p.subCategory) {
        subMap.set(p.subCategory, SUBCATEGORY_LABELS[p.subCategory] || p.subCategory);
      }
    });
    return Array.from(subMap.entries()).map(([id, label]) => ({ id, label }));
  }, [selectedCategory, products]);

  // Active filter count for badge
  const activeFilterCount = [selectedSubCategory, selectedStyle, selectedColor, selectedRarity].filter((v) => v !== 'all').length
    + (searchQuery.trim() !== '' ? 1 : 0);

  const displayedProducts = useMemo(() => {
    if (selectedCategory === 'suggested') return recommendedProducts;

    return products.filter((p) => {
      // Category
      if (selectedCategory === 'tops' && p.category !== 'tops') return false;
      if (selectedCategory === 'bottoms' && p.category !== 'bottoms') return false;
      if (selectedCategory === 'skirts' && p.category !== 'skirts') return false;
      if (selectedCategory === 'dresses' && p.category !== 'dresses') return false;
      if (selectedCategory === 'shoes' && p.category !== 'shoes') return false;
      if (selectedCategory === 'bags' && p.category !== 'bags') return false;
      if (selectedCategory === 'accessories' && p.category !== 'accessories' && p.category !== 'jackets') return false;

      // Sub-category filter
      if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;

      // Sub-filters
      if (selectedStyle !== 'all' && !p.styleTags.includes(selectedStyle as StyleTag)) return false;
      if (selectedColor !== 'all' && !p.colors.includes(selectedColor as FashionColor)) return false;
      if (selectedRarity !== 'all' && p.rarity !== selectedRarity as Rarity) return false;

      // Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedSubCategory, selectedStyle, selectedColor, selectedRarity, searchQuery, products, recommendedProducts]);

  const clearFilters = () => {
    setSelectedSubCategory('all');
    setSelectedStyle('all');
    setSelectedColor('all');
    setSelectedRarity('all');
    setSearchQuery('');
  };

  return (
    <div className="w-full flex flex-col min-h-0 bg-[#FFF8F4] border border-[#F2E1CF] rounded-2xl overflow-hidden shadow-xs select-none">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="px-3 pt-2 pb-1.5 flex items-center justify-between border-b border-[#F2E1CF]/70 bg-white/70 shrink-0">
        <div className="flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5 text-[#D87C9B]" />
          <h2 className="text-xs font-black uppercase tracking-wider text-[#3E3431] font-heading">
            Tủ Đồ Thời Trang
          </h2>
          <span className="text-[10px] text-[#8D6E63] font-bold">({displayedProducts.length})</span>
        </div>

        <div className="flex items-center gap-1.5">
          {onAutoOutfit && currentCustomer && (
            <button
              onClick={onAutoOutfit}
              className="h-6 px-2 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-2xs active:scale-95 transition-all flex items-center gap-1"
            >
              <Zap className="w-2.5 h-2.5 fill-current text-yellow-200" />
              <span> Phối nhanh</span>
            </button>
          )}

          {selectedCategory !== 'suggested' && (
            <button
              onClick={() => setIsFilterOpen((p) => !p)}
              className={`relative h-6 px-2 rounded-md text-[10px] font-bold border transition-all flex items-center gap-1 ${activeFilterCount > 0
                  ? 'bg-[#FFF0F5] border-[#D87C9B] text-[#D87C9B]'
                  : 'bg-white border-[#F2E1CF] text-[#6F554A]'
                }`}
            >
              <Filter className="w-2.5 h-2.5" />
              <span>Lọc</span>
              {activeFilterCount > 0 && (
                <span className="w-3.5 h-3.5 rounded-full bg-[#D87C9B] text-white text-[8px] font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className={`w-2.5 h-2.5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* ── Filter Drawer ─────────────────────────────────────── */}
      {isFilterOpen && selectedCategory !== 'suggested' && (
        <div className="px-3 py-2 bg-[#FFF0F5]/60 border-b border-[#F4C7D9]/60 space-y-2 shrink-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#8D6E63]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="w-full h-7 pl-7 pr-6 rounded-xl text-[10.5px] border border-[#F4C7D9] bg-white text-[#3E3431] placeholder:text-[#C0A090] outline-none focus:border-[#D87C9B]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                <X className="w-3 h-3 text-[#8D6E63]" />
              </button>
            )}
          </div>

          {/* Style pills */}
          <div>
            <div className="text-[8.5px] font-black text-[#8D6E63] uppercase tracking-wider mb-1">Phong cách</div>
            <div className="flex gap-1 overflow-x-auto no-scrollbar pb-0.5">
              {['all', 'casual', 'cute', 'korean', 'minimal', 'elegant', 'office', 'streetwear', 'y2k', 'vintage', 'soft_girl', 'preppy', 'chic'].map((st) => (
                <button key={st} onClick={() => setSelectedStyle(st)}
                  className={`h-5 px-1.5 rounded-full text-[9px] font-bold whitespace-nowrap shrink-0 transition-all ${selectedStyle === st ? 'bg-[#D87C9B] text-white' : 'bg-white text-[#6F554A] border border-[#F2E1CF]'
                    }`}>
                  {st === 'all' ? 'Tất cả' : STYLE_LABELS[st] || st}
                </button>
              ))}
            </div>
          </div>

          {/* Color + Rarity row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="text-[8.5px] font-black text-[#8D6E63] uppercase tracking-wider mb-1">Màu sắc</div>
              <div className="flex gap-1 overflow-x-auto no-scrollbar pb-0.5">
                <button onClick={() => setSelectedColor('all')}
                  className={`h-5 px-1.5 rounded-full text-[9px] font-bold whitespace-nowrap shrink-0 transition-all ${selectedColor === 'all' ? 'bg-[#D87C9B] text-white' : 'bg-white text-[#6F554A] border border-[#F2E1CF]'}`}>
                  Tất cả
                </button>
                {Object.entries(COLOR_LABELS).map(([key, val]) => (
                  <button key={key} onClick={() => setSelectedColor(key)} title={val.name}
                    className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all ${selectedColor === key ? 'border-[#D87C9B] scale-110 shadow-xs' : 'border-white shadow-xs'}`}
                    style={{ backgroundColor: val.hex }} />
                ))}
              </div>
            </div>
          </div>

          {/* Rarity pills */}
          <div>
            <div className="text-[8.5px] font-black text-[#8D6E63] uppercase tracking-wider mb-1">Độ hiếm</div>
            <div className="flex gap-1">
              {['all', ...RARITY_ORDER].map((r) => (
                <button key={r} onClick={() => setSelectedRarity(r)}
                  className={`h-5 px-1.5 rounded-full text-[9px] font-bold whitespace-nowrap shrink-0 transition-all ${selectedRarity === r
                      ? 'bg-[#D87C9B] text-white'
                      : 'bg-white text-[#6F554A] border border-[#F2E1CF]'
                    }`}
                  style={selectedRarity === r ? {} : r !== 'all' ? { borderColor: RARITY_LABELS[r]?.border } : {}}>
                  {r === 'all' ? 'Tất cả' : RARITY_LABELS[r]?.name || r}
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-[9.5px] font-bold text-[#D87C9B] flex items-center gap-1">
              <X className="w-3 h-3" /> Xóa bộ lọc ({activeFilterCount})
            </button>
          )}
        </div>
      )}

      {/* ── Category Tab Bar ──────────────────────────────────── */}
      <div className="flex items-center gap-1 px-2.5 py-1.5 overflow-x-auto no-scrollbar border-b border-[#F2E1CF]/50 bg-[#FFF7F1] shrink-0">
        {CATEGORY_TABS.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const isSuggested = cat.id === 'suggested';
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`h-7 px-2.5 rounded-full text-[10.5px] font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${isActive
                  ? isSuggested
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-black'
                    : 'bg-[#D87C9B] text-white shadow-xs font-black'
                  : isSuggested
                    ? 'bg-amber-50 text-amber-800 border border-amber-300'
                    : 'bg-white text-[#6F554A] border border-[#F2E1CF]'
                }`}
            >
              {isSuggested ? (
                <>
                  <span>⭐</span>
                  <span>{cat.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-ping" />
                </>
              ) : (
                <>
                  {cat.id !== 'all' ? (
                    <GameIcon name={cat.id as any} size={14} className={isActive ? '' : 'opacity-60'} />
                  ) : (
                    <span>✨</span>
                  )}
                  <span>{cat.label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* ── SubCategory Filter Bar ────────────────────────────── */}
      {availableSubCategories.length > 0 && (
        <div className="flex items-center gap-1 px-2.5 py-1.5 overflow-x-auto no-scrollbar border-b border-[#F2E1CF]/40 bg-white/70 shrink-0">
          <button
            onClick={() => setSelectedSubCategory('all')}
            className={`h-5.5 px-2 rounded-full text-[9.5px] font-bold whitespace-nowrap shrink-0 transition-all ${selectedSubCategory === 'all'
                ? 'bg-[#6F554A] text-white shadow-2xs font-black'
                : 'bg-[#FFF5EE] text-[#6F554A] border border-[#F2E1CF]'
              }`}
          >
            Tất cả
          </button>
          {availableSubCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubCategory(sub.id)}
              className={`h-5.5 px-2.5 rounded-full text-[9.5px] font-bold whitespace-nowrap shrink-0 transition-all ${selectedSubCategory === sub.id
                  ? 'bg-[#D87C9B] text-white shadow-2xs font-black'
                  : 'bg-white text-[#6F554A] border border-[#F2E1CF] hover:border-[#D87C9B]'
                }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Combo Gợi Ý Section (Requirement 3 & 6) ───────────── */}
      {currentCustomer && recommendedCombos.length > 0 && selectedCategory === 'suggested' && (
        <div className="mx-2 mt-2 p-2.5 rounded-2xl bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFF8F4] border border-[#F4C7D9] shadow-xs space-y-2 select-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D87C9B] fill-current" />
              <h4 className="text-xs font-black text-[#3E3431] uppercase tracking-wider font-heading">
                Combo Gợi Ý Cho Khách ({recommendedCombos.length} set)
              </h4>
            </div>
            <span className="text-[9.5px] font-bold text-[#8D6E63] bg-white px-2 py-0.5 rounded-full border border-[#F2E1CF]">
              💡 Chọn combo phù hợp nhất
            </span>
          </div>

          <div className="space-y-2">
            {recommendedCombos.map((combo) => (
              <div
                key={combo.id}
                className="bg-white/95 rounded-xl p-2 border border-[#F2E1CF] hover:border-[#D87C9B] transition-all shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs font-black text-[#3E3431] font-heading truncate">
                      {combo.title}
                    </span>
                    <span
                      className="text-[8px] font-black px-1.5 py-0.3 rounded-md text-white shadow-2xs shrink-0"
                      style={{ backgroundColor: combo.ratingColor }}
                    >
                      {combo.rating}
                    </span>
                  </div>
                  <span className="text-[10.5px] font-extrabold text-[#D87C9B] tabular-nums shrink-0">
                    {combo.totalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                {/* Items preview list */}
                <div className="text-[9px] font-medium text-[#6F554A] flex flex-wrap gap-1 leading-relaxed">
                  {combo.items.map((item) => (
                    <span key={item.id} className="bg-[#FFF5EE] px-1.5 py-0.5 rounded border border-[#F2E1CF]">
                      {item.name}: <strong className="text-[#3E3431]">{item.price.toLocaleString('vi-VN')}đ</strong>
                    </span>
                  ))}
                </div>

                {/* Bottom row: Match tags + Apply button */}
                <div className="flex items-center justify-between pt-1 border-t border-[#F2E1CF]/60">
                  <div className="flex items-center gap-1 text-[8.5px] font-bold text-emerald-700">
                    {combo.matchTags.map((tag, idx) => (
                      <span key={idx} className="bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  {onApplyCombo && (
                    <button
                      onClick={() => onApplyCombo(combo.outfit)}
                      className="px-2.5 py-1 bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-[9.5px] font-black rounded-lg shadow-2xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>👉 Áp dụng Combo</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Product Grid ──────────────────────────────────────── */}
      <div className="p-2 space-y-2">
        {displayedProducts.length === 0 ? (
          <div className="py-8 text-center text-[#8D6E63] space-y-2">
            <div className="text-3xl">🛍️</div>
            <p className="text-xs font-bold text-[#3E3431]">Không có sản phẩm phù hợp</p>
            <p className="text-[10px]">Thử thay đổi bộ lọc hoặc nhập thêm hàng!</p>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-[10px] font-black text-[#D87C9B] border border-[#D87C9B] px-3 py-1 rounded-full">
                Xóa bộ lọc
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {displayedProducts.map((prod) => {
              const isSelected = outfitProductIds.has(prod.id);
              const isLocked = prod.unlockLevel > playerLevel;
              const isOutOfStock = prod.stock <= 0;
              const isDisabled = isLocked || isOutOfStock;
              const rarityInfo = RARITY_LABELS[prod.rarity];
              const badgeInfo = getItemBadgeInfo(prod, currentCustomer, recommendedProducts);

              return (
                <div
                  key={prod.id}
                  onClick={() => { if (!isDisabled) onToggleProduct(prod); }}
                  className={`relative flex flex-col p-2 rounded-xl border transition-all min-h-[118px] ${isSelected
                      ? 'border-2 border-[#D87C9B] bg-[#FFF0F5] shadow-xs ring-2 ring-[#D87C9B]/20'
                      : isDisabled
                        ? 'opacity-50 border-slate-200 bg-slate-50 cursor-not-allowed'
                        : 'border-[#F2E1CF] bg-white hover:border-[#D87C9B] shadow-2xs cursor-pointer active:scale-[0.98]'
                    }`}
                  style={!isDisabled && !isSelected && rarityInfo ? { borderColor: rarityInfo.border } : {}}
                >
                  {/* Rarity badge + stock */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[8.5px] font-extrabold truncate" style={{ color: rarityInfo?.color }}>
                      {rarityInfo?.name || prod.rarity}
                    </span>
                    {isLocked ? (
                      <span className="inline-flex items-center gap-0.5 text-[8px] font-black px-1 py-0.5 rounded-full bg-slate-200 text-slate-600">
                        <Lock className="w-2 h-2" /> Lv.{prod.unlockLevel}
                      </span>
                    ) : isOutOfStock ? (
                      <span className="text-[8px] font-extrabold px-1 py-0.5 rounded-full bg-rose-100 text-rose-600">Hết</span>
                    ) : (
                      <span className="text-[8px] font-bold px-1 py-0.5 rounded-full bg-emerald-50 text-emerald-700 tabular-nums">
                        x{prod.stock}
                      </span>
                    )}
                  </div>

                  {/* Visual */}
                  <div
                    className="w-full h-14 rounded-lg flex items-center justify-center relative mb-1 overflow-hidden"
                    style={{ backgroundColor: `${prod.accentColor}30` }}
                  >
                    <ProductIcon product={prod} size={44} />

                    {/* Color dot */}
                    {prod.colors[0] && COLOR_LABELS[prod.colors[0]] && (
                      <div
                        className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white/80 shadow-xs"
                        style={{ backgroundColor: COLOR_LABELS[prod.colors[0]].hex }}
                        title={COLOR_LABELS[prod.colors[0]].name}
                      />
                    )}

                    {/* Item Hint Badges (Requirement 5: ✨ Gợi ý, 💗 Hợp gu, 💰 Hợp ngân sách) */}
                    {badgeInfo.badgeLabel && !isDisabled && (
                      <div className="absolute top-1 left-1 bg-gradient-to-r from-[#D87C9B] to-[#E91E63] text-white text-[7.5px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-2xs z-10">
                        <span>{badgeInfo.badgeEmoji}</span>
                        <span>{badgeInfo.badgeLabel}</span>
                      </div>
                    )}

                    {isLocked && (
                      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white rounded-lg">
                        <Lock className="w-4 h-4 mb-0.5" />
                        <span className="text-[8px] font-black">Lv.{prod.unlockLevel}</span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-[10px] font-bold text-[#3E3431] leading-snug line-clamp-2 mb-0.5 flex-1" title={prod.name}>
                    {prod.name}
                  </h3>

                  {/* Price + action */}
                  <div className="pt-1 border-t border-[#F2E1CF]/50 flex items-center justify-between">
                    <span className="font-extrabold text-[#D87C9B] text-[10px] tabular-nums">
                      {prod.price.toLocaleString('vi-VN')}đ
                    </span>

                    {isLocked ? (
                      <span className="text-[8px] text-slate-400 font-bold">Khóa</span>
                    ) : isOutOfStock ? (
                      <span className="text-[8px] font-bold text-rose-500">Hết hàng</span>
                    ) : isSelected ? (
                      <span className="inline-flex items-center gap-0.5 text-[8.5px] font-black text-[#D87C9B] bg-white px-1.5 py-0.5 rounded-md border border-[#D87C9B]">
                        <Check className="w-2.5 h-2.5" /><span>Đã chọn</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold text-[#6F554A] bg-[#FFF0F5] px-2 py-0.5 rounded-md border border-[#F4C7D9] hover:bg-[#D87C9B] hover:text-white transition-colors">
                        Chọn
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA when empty suggested tab */}
        {selectedCategory === 'suggested' && displayedProducts.length === 0 && !currentCustomer && (
          <div className="py-6 text-center space-y-1">
            <div className="text-2xl">🛍️</div>
            <p className="text-xs font-bold text-[#3E3431]">Mở tiệm để đón khách rồi gợi ý sẽ hiện ra!</p>
          </div>
        )}
      </div>

      {/* ── Quick auto-outfit CTA (when no outfit chosen) ──── */}
      {onAutoOutfit && currentCustomer && outfitItems.length === 0 && (
        <div
          onClick={onAutoOutfit}
          className="px-3 py-2.5 bg-gradient-to-r from-[#D87C9B]/10 to-[#D9A441]/10 border-t border-[#F4C7D9]/50 text-center cursor-pointer hover:from-[#D87C9B]/20 transition-all"
        >
          <span className="text-[10.5px] font-black text-[#6F554A] flex items-center justify-center gap-1.5">
            <Zap className="w-3 h-3 text-amber-500 fill-current" />
            BẤM "⚡ PHỐI NHANH" HOẶC CHỌN ĐỒ Ở TRÊN
          </span>
        </div>
      )}
    </div>
  );
};
