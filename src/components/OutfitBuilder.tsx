import React from 'react';
import { Customer, Outfit, OutfitSlot, Product } from '../types/game';
import { getOutfitItems, getOutfitTotalPrice, validateOutfit, getOutfitMatchHints } from '../utils/scoring';
import { Sparkles, Trash2, CheckCircle2, AlertTriangle, Shirt, Check, Zap, HelpCircle } from 'lucide-react';
import { GameIcon, GameIconName } from './GameIcon';
import { ClothesIcon, ClothesIconName } from './ClothesIcon';
import { ProductIcon } from './ProductIcon';

interface OutfitBuilderProps {
  outfit: Outfit;
  customer: Customer | null;
  onRemoveItem: (slot: OutfitSlot) => void;
  onClearOutfit: () => void;
  onTryOutfit: () => void;
  onAutoOutfit?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const OutfitBuilder: React.FC<OutfitBuilderProps> = ({
  outfit,
  customer,
  onRemoveItem,
  onClearOutfit,
  onTryOutfit,
  onAutoOutfit,
  onSelectCategory,
}) => {
  const items = getOutfitItems(outfit);
  const totalPrice = getOutfitTotalPrice(outfit);
  const validation = validateOutfit(outfit);
  const hints = getOutfitMatchHints(customer, outfit);

  const budget = customer?.budget || 0;
  const isOverBudget = customer ? totalPrice > budget : false;
  const excessAmount = isOverBudget ? totalPrice - budget : 0;

  // Primary 6 slots: Top, Bottom/Skirt, Dress, Shoes, Bag, Accessory
  const bottomOrSkirt = outfit.bottom || outfit.skirt;
  const bottomOrSkirtSlot: OutfitSlot = outfit.skirt ? 'skirt' : 'bottom';

  const primarySlots: Array<{
    slotKey: OutfitSlot;
    category: string;
    label: string;
    product: Product | null | undefined;
    svgIcon: GameIconName;
    isDisabledByDress?: boolean;
    isDressDisabledBySeparates?: boolean;
  }> = [
    {
      slotKey: 'top',
      category: 'tops',
      label: 'Áo',
      product: outfit.top,
      svgIcon: 'top',
      isDisabledByDress: Boolean(outfit.dress),
    },
    {
      slotKey: bottomOrSkirtSlot,
      category: outfit.skirt ? 'skirts' : 'bottoms',
      label: 'Quần / Váy',
      product: bottomOrSkirt,
      svgIcon: 'bottom',
      isDisabledByDress: Boolean(outfit.dress),
    },
    {
      slotKey: 'dress',
      category: 'dresses',
      label: 'Đầm',
      product: outfit.dress,
      svgIcon: 'dress',
      isDressDisabledBySeparates: Boolean(outfit.top || bottomOrSkirt),
    },
    {
      slotKey: 'shoes',
      category: 'shoes',
      label: 'Giày',
      product: outfit.shoes,
      svgIcon: 'shoes',
    },
    {
      slotKey: 'bag',
      category: 'bags',
      label: 'Túi xách',
      product: outfit.bag,
      svgIcon: 'bag',
    },
    {
      slotKey: 'accessory',
      category: 'accessories',
      label: 'Phụ kiện',
      product: outfit.accessory || outfit.jacket,
      svgIcon: 'accessory',
    },
  ];

  return (
    <div className="w-full bg-[#FFF8F4] border border-[#F2E1CF] rounded-2xl p-2.5 shadow-xs select-none">
      {/* Header row: title, total count, auto-outfit button, clear button */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#F2E1CF]/70">
        <div className="flex items-center gap-1.5">
          <Shirt className="w-3.5 h-3.5 text-[#D87C9B]" />
          <h3 className="text-xs font-black uppercase tracking-wider text-[#3E3431] font-heading">
            Set Đồ Đang Chọn ({items.length} món)
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          {onAutoOutfit && customer && (
            <button
              onClick={onAutoOutfit}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white shadow-xs active:scale-95 transition-all"
              title="Tự động chọn set đồ phù hợp nhất từ kho cho khách"
            >
              <Zap className="w-3 h-3 fill-current text-yellow-200" />
              <span>⚡ Phối nhanh</span>
            </button>
          )}

          {items.length > 0 && (
            <button
              onClick={onClearOutfit}
              className="flex items-center gap-1 text-[10px] font-bold text-[#8D6E63] hover:text-rose-600 transition-colors px-1.5 py-0.5 rounded-md hover:bg-rose-50 border border-transparent hover:border-rose-200"
              title="Xóa toàn bộ set đồ"
            >
              <Trash2 className="w-3 h-3" />
              <span>Xóa</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State Help Callout Banner */}
      {items.length === 0 && (
        <div className="mb-2 p-1.5 rounded-xl bg-pink-50/80 border border-pink-200 flex items-center justify-between text-[10px] text-[#6F554A]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">💡</span>
            <span>Đã có hàng trong kho? Hãy bấm <strong>"⚡ Phối nhanh"</strong> hoặc chọn trang phục ở bên dưới!</span>
          </div>
        </div>
      )}

      {/* 6 Primary Outfit Slots Grid / Row */}
      <div className="grid grid-cols-6 gap-1.5 mb-2.5">
        {primarySlots.map(({ slotKey, category, label, product, svgIcon, isDisabledByDress, isDressDisabledBySeparates }) => {
          const isSelected = Boolean(product);
          const isFaded = isDisabledByDress || isDressDisabledBySeparates;

          return (
            <div
              key={slotKey + label}
              onClick={() => onSelectCategory?.(category)}
              title={`Bấm để chọn ${label} trong Tủ Đồ`}
              className={`relative flex flex-col items-center justify-center h-16 rounded-xl border transition-all text-center p-0.5 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'border-2 border-[#D87C9B] bg-white shadow-xs hover:border-[#c96c8a]'
                  : isFaded
                  ? 'border-dashed border-slate-200 bg-slate-100/60 opacity-40'
                  : 'border-dashed border-[#E0D0BE] bg-white/70 hover:border-[#D87C9B]'
              }`}
            >
              {isSelected && product ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(slotKey);
                    }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs hover:bg-rose-600 active:scale-90 z-10"
                    title={`Gỡ ${product.name}`}
                  >
                    ✕
                  </button>
                  <ProductIcon product={product} size={28} className="mb-0.5" />
                  <span className="text-[8.5px] font-bold text-[#3E3431] truncate w-full px-0.5 leading-tight">
                    {product.name}
                  </span>
                  <div className="flex items-center justify-center gap-1 w-full">
                    <span className="text-[8px] font-extrabold text-[#D87C9B] tabular-nums leading-none">
                      {(product.price / 1000).toLocaleString('vi-VN')}k
                    </span>
                    <span className="text-[7.5px] font-extrabold text-emerald-700 bg-emerald-50 px-1 rounded tabular-nums leading-none">
                      Kho:{product.stock}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <ClothesIcon
                    name={(svgIcon) as ClothesIconName}
                    size={28}
                    color="#D87C9B"
                    className="opacity-40 mb-0.5"
                  />
                  <span className="text-[8.5px] text-[#8D6E63] font-medium leading-tight">
                    {label}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Match Hints Bar & Price Summary (Requirement 5) */}
      <div className="bg-white/95 rounded-xl p-2 border border-[#F2E1CF] mb-2.5 shadow-2xs space-y-1.5">
        {/* Total Price vs Budget */}
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1">
            <span className="text-[#8D6E63] font-medium">Tổng giá:</span>
            <span className="font-extrabold text-[#3E3431] tabular-nums">
              {totalPrice.toLocaleString('vi-VN')}đ
            </span>
          </div>

          <div className="flex items-center gap-1 font-bold">
            <span className="text-[#8D6E63] font-medium text-[10px]">Ngân sách:</span>
            <span className="text-[#3E3431] tabular-nums">
              {budget.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        {/* 3 Qualitative Match Hints (No exact score) */}
        <div className="grid grid-cols-3 gap-1 pt-1 border-t border-[#F2E1CF]/70 text-[9.5px] font-bold">
          {hints.map((hint, idx) => {
            const isMatch = hint.status === 'match';
            const isWarn = hint.status === 'warning';
            return (
              <div
                key={idx}
                className={`flex items-center justify-center gap-0.5 px-1 py-1 rounded-md text-center truncate ${
                  isMatch
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : isWarn
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-slate-50 text-slate-600 border border-slate-200'
                }`}
                title={hint.message}
              >
                <span className="truncate">{hint.message}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Requirement 6: Button "CHO KHÁCH THỬ" - >= 44px thumb touch target */}
      <button
        onClick={onTryOutfit}
        disabled={!validation.isValid}
        className={`w-full h-11 sm:h-12 rounded-xl font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
          validation.isValid
            ? 'bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white active:scale-[0.98] shadow-[#D87C9B]/30'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        <span>
          {validation.isValid
            ? 'CHO KHÁCH THỬ ĐỒ'
            : items.length === 0
            ? 'BẤM "⚡ PHỐI NHANH" HOẶC CHỌN ĐỒ Ở DƯỚI'
            : validation.reason}
        </span>
      </button>
    </div>
  );
};
