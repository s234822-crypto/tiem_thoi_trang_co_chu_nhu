import React, { useState } from 'react';
import { DecorCategory, DecorItem } from '../types/game';
import { playCoinSound, playTapSound, playAlertSound } from '../utils/audio';
import { Palette, Check, Sparkles, AlertCircle } from 'lucide-react';

interface DecorModalProps {
  decors: DecorItem[];
  money: number;
  maxDecorSlots: number;
  onBuyDecor: (decorId: string, price: number) => boolean;
  onToggleEquipDecor: (decorId: string) => boolean;
}

export const DecorModal: React.FC<DecorModalProps> = ({
  decors,
  money,
  maxDecorSlots,
  onBuyDecor,
  onToggleEquipDecor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  const categories = ['all', 'Furniture', 'Floor', 'Wall', 'Lighting', 'Decoration'];

  const categoryLabels: Record<string, string> = {
    all: 'Tất cả',
    Furniture: 'Nội thất',
    Floor: 'Sàn tiệm',
    Wall: 'Tường',
    Lighting: 'Ánh sáng',
    Decoration: 'Trang trí',
  };

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  };

  const equippedCount = decors.filter((d) => d.equipped).length;

  const filteredDecors = decors.filter((d) => {
    if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
    return true;
  });

  const handleBuy = (item: DecorItem) => {
    if (money < item.price) {
      playAlertSound();
      showFeedback('Không đủ ngân quỹ mua món trang trí này!');
      return;
    }
    const success = onBuyDecor(item.id, item.price);
    if (success) {
      playCoinSound();
      showFeedback(`Đã sắm thành công ${item.name}!`);
    }
  };

  const handleEquip = (item: DecorItem) => {
    if (!item.equipped && equippedCount >= maxDecorSlots) {
      playAlertSound();
      showFeedback(`Đã đạt giới hạn tối đa ${maxDecorSlots} slot decor! Hãy gỡ bớt món khác.`);
      return;
    }
    playTapSound();
    onToggleEquipDecor(item.id);
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-[#FFF8F4] select-none">
      {/* Top Banner */}
      <div className="p-3 bg-white border-b border-[#F2E1CF] shadow-2xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[#D87C9B]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#3E3431] font-heading">
              Trang Trí Boutique
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-bold text-[#8D6E63]">
              Slot: <strong className="text-[#D87C9B]">{equippedCount}/{maxDecorSlots}</strong>
            </span>
            <div className="bg-[#FFF8F4] px-2 py-0.5 rounded-lg border border-[#F2E1CF] flex items-center gap-1">
              <span className="text-xs">💰</span>
              <span className="text-[11px] font-extrabold text-[#3E3431] tabular-nums">
                {money.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </div>

        {feedback && (
          <div className="mt-1 p-1 rounded-lg text-[10.5px] font-bold text-center bg-[#FFF3E0] text-[#D9A441] border border-[#FFE082] animate-gentle-bounce">
            {feedback}
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar border-b border-[#F2E1CF]/50 bg-[#FFF7F1]/80">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`h-6 px-2.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#D87C9B] text-white shadow-xs'
                : 'bg-white text-[#6F554A] border border-[#F2E1CF] hover:bg-[#FFF0F5]'
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* Decor Cards Grid */}
      <div className="flex-1 overflow-y-auto p-2.5 grid grid-cols-2 gap-2">
        {filteredDecors.map((item) => {
          const isAffordable = money >= item.price;

          return (
            <div
              key={item.id}
              className={`p-2.5 rounded-2xl border flex flex-col justify-between transition-all ${
                item.equipped
                  ? 'border-2 border-[#D87C9B] bg-[#FFF0F5] shadow-xs'
                  : item.owned
                  ? 'border-[#F2E1CF] bg-white shadow-2xs'
                  : 'border-[#E0D0BE] bg-white/80 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[9px] text-[#8D6E63] font-semibold">
                    {categoryLabels[item.category] || item.category}
                  </span>
                  {item.equipped && (
                    <span className="text-[8.5px] font-black text-white bg-[#D87C9B] px-1.5 py-0.2 rounded-full">
                      ĐANG DÙNG
                    </span>
                  )}
                </div>

                {/* Visual Icon */}
                <div className="w-full h-14 rounded-xl bg-[#FFF8F4] border border-[#F4C7D9]/50 flex items-center justify-center text-3xl mb-1.5 shadow-2xs">
                  {item.visualEmoji}
                </div>

                <h4 className="text-[11px] font-bold text-[#3E3431] leading-tight line-clamp-1 mb-1" title={item.name}>
                  {item.name}
                </h4>

                {/* Bonus Badge */}
                <div className="inline-flex items-center gap-1 text-[9.5px] font-black text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200 mb-2">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  <span>{item.bonusLabel}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1.5 border-t border-[#F2E1CF]/60">
                {item.owned ? (
                  <button
                    onClick={() => handleEquip(item)}
                    className={`w-full h-7 rounded-lg text-[10px] font-extrabold transition-all active:scale-95 flex items-center justify-center gap-1 ${
                      item.equipped
                        ? 'bg-white border border-[#D87C9B] text-[#D87C9B] hover:bg-rose-50'
                        : 'bg-[#D87C9B] hover:bg-[#c96c8a] text-white shadow-2xs'
                    }`}
                  >
                    {item.equipped ? 'Gỡ Bỏ' : 'Trang Bị'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!isAffordable}
                    className={`w-full h-7 rounded-lg text-[10px] font-extrabold transition-all active:scale-95 flex items-center justify-center gap-1 ${
                      isAffordable
                        ? 'bg-[#3E3431] hover:bg-[#2b2422] text-white shadow-2xs'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Mua { (item.price / 1000).toLocaleString('vi-VN') }k</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
