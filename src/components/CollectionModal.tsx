import React, { useState } from 'react';
import { FashionCollection, Product } from '../types/game';
import { Sparkles, BookOpen, Gift, CheckCircle2, Lock, X, Star } from 'lucide-react';
import { playTapSound, playChimeSound, playSuccessFanfare } from '../utils/audio';
import { ProductIcon } from './ProductIcon';

interface CollectionModalProps {
  collections: FashionCollection[];
  products: Product[];
  playerLevel: number;
  onClaimReward: (collectionId: string) => void;
  onClose: () => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  collections,
  products,
  playerLevel,
  onClaimReward,
  onClose,
}) => {
  const [filter, setFilter] = useState<'all' | 'regular' | 'seasonal'>('all');

  const productMap = new Map<string, Product>();
  products.forEach((p) => productMap.set(p.id, p));

  const filteredCollections = collections.filter((c) => {
    if (filter === 'seasonal') return c.isSeasonal;
    if (filter === 'regular') return !c.isSeasonal;
    return true;
  });

  const completedCount = collections.filter((c) => {
    const allUnlocked = c.productIds.every((pid) => {
      const prod = productMap.get(pid);
      return prod && prod.unlockLevel <= playerLevel;
    });
    return allUnlocked;
  }).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-2xs p-3 animate-fade-in select-none">
      <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F4] border-2 border-[#F4C7D9] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#FFF0F5] to-[#FCE4EC] border-b border-[#F2E1CF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D87C9B] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#3E3431] font-heading flex items-center gap-1.5">
                <span>Bộ Sưu Tập Thời Trang</span>
                <span className="bg-[#D87C9B] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  {completedCount}/{collections.length}
                </span>
              </h2>
              <p className="text-[10px] text-[#6F554A]">Sưu tầm trọn bộ outfit theo chủ đề</p>
            </div>
          </div>
          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-white/80 hover:bg-white border border-[#F2E1CF] flex items-center justify-center text-[#6F554A] active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5 border-b border-[#F2E1CF] bg-[#FFF8F4]">
          <button
            onClick={() => {
              playTapSound();
              setFilter('all');
            }}
            className={`px-3 py-1 rounded-full text-[10.5px] font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#D87C9B] text-white shadow-2xs'
                : 'bg-white text-[#6F554A] border border-[#F2E1CF]'
            }`}
          >
            Tất cả ({collections.length})
          </button>
          <button
            onClick={() => {
              playTapSound();
              setFilter('regular');
            }}
            className={`px-3 py-1 rounded-full text-[10.5px] font-bold transition-all ${
              filter === 'regular'
                ? 'bg-[#D87C9B] text-white shadow-2xs'
                : 'bg-white text-[#6F554A] border border-[#F2E1CF]'
            }`}
          >
            Chủ đề tiệm ({collections.filter((c) => !c.isSeasonal).length})
          </button>
          <button
            onClick={() => {
              playTapSound();
              setFilter('seasonal');
            }}
            className={`px-3 py-1 rounded-full text-[10.5px] font-bold transition-all ${
              filter === 'seasonal'
                ? 'bg-[#D87C9B] text-white shadow-2xs'
                : 'bg-white text-[#6F554A] border border-[#F2E1CF]'
            }`}
          >
            Mùa lễ hội ({collections.filter((c) => c.isSeasonal).length})
          </button>
        </div>

        {/* Collections List */}
        <div className="p-3 space-y-3 overflow-y-auto flex-1">
          {filteredCollections.map((col) => {
            const unlockedProducts = col.productIds.filter((pid) => {
              const p = productMap.get(pid);
              return p && p.unlockLevel <= playerLevel;
            });

            const totalItems = col.productIds.length;
            const unlockedCount = unlockedProducts.length;
            const isCompleted = unlockedCount === totalItems;
            const percent = Math.round((unlockedCount / totalItems) * 100);

            return (
              <div
                key={col.id}
                className={`relative rounded-2xl p-3 border transition-all ${
                  col.claimed
                    ? 'bg-[#F2E1CF]/30 border-[#E0D0BE] opacity-85'
                    : isCompleted
                    ? 'bg-gradient-to-br from-[#FFF9E6] to-[#FFF0F5] border-[#D9A441] shadow-xs'
                    : 'bg-white border-[#F2E1CF] shadow-2xs'
                }`}
              >
                {/* Header of Collection Card */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl filter drop-shadow-xs">{col.icon}</span>
                    <div>
                      <h3 className="text-xs font-bold text-[#3E3431] flex items-center gap-1.5 leading-tight">
                        <span>{col.name}</span>
                        {isCompleted && (
                          <span className="text-[9px] font-black bg-[#D9A441] text-white px-1.5 py-0.2 rounded-full">
                            FULL ✨
                          </span>
                        )}
                      </h3>
                      <p className="text-[10px] text-[#6F554A] leading-snug mt-0.5">
                        {col.description}
                      </p>
                    </div>
                  </div>

                  {/* Reward label */}
                  <div className="shrink-0 flex items-center gap-1 bg-[#FFF8F4] border border-[#F4C7D9] rounded-lg px-2 py-0.8 text-[9.5px] font-bold text-[#D87C9B]">
                    <Gift className="w-3 h-3 text-[#D87C9B]" />
                    <span>{col.reward.label}</span>
                  </div>
                </div>

                {/* Products Album Row */}
                <div className="grid grid-cols-4 gap-1.5 my-2">
                  {col.productIds.map((pid) => {
                    const prod = productMap.get(pid);
                    const isUnlocked = prod && prod.unlockLevel <= playerLevel;

                    return (
                      <div
                        key={pid}
                        className={`rounded-xl p-1.5 flex flex-col items-center justify-center text-center border transition-all ${
                          isUnlocked
                            ? 'bg-[#FFF8F4] border-[#F4C7D9]/80 shadow-2xs'
                            : 'bg-gray-100/80 border-gray-200 grayscale opacity-60'
                        }`}
                      >
                        {prod ? (
                          <ProductIcon product={prod} size={28} className="mb-0.5" />
                        ) : (
                          <span className="text-xl mb-0.5">👗</span>
                        )}
                        <span className="text-[9px] font-bold text-[#3E3431] leading-tight line-clamp-1">
                          {isUnlocked ? prod?.name.split(' ')[0] : '🔒 Khóa'}
                        </span>
                        {!isUnlocked && prod && (
                          <span className="text-[8px] text-[#8D6E63] font-semibold">
                            Lv.{prod.unlockLevel}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Progress bar */}
                <div className="mt-2 mb-2">
                  <div className="flex items-center justify-between text-[9.5px] text-[#8D6E63] font-medium mb-1">
                    <span>Độ hoàn thiện album:</span>
                    <span className="font-bold text-[#3E3431]">
                      {unlockedCount}/{totalItems} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F2E1CF]/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-[#D9A441] to-[#F1C40F]'
                          : 'bg-gradient-to-r from-[#F4C7D9] to-[#D87C9B]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Claim / Status Action */}
                <div>
                  {col.claimed ? (
                    <div className="w-full py-1 text-center rounded-xl bg-gray-100 text-gray-400 text-[10px] font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
                      <span>Đã hoàn thành & nhận thưởng</span>
                    </div>
                  ) : isCompleted ? (
                    <button
                      onClick={() => {
                        playSuccessFanfare();
                        onClaimReward(col.id);
                      }}
                      className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#D9A441] to-[#E67E22] hover:from-[#c89230] hover:to-[#d35400] text-white text-[10.5px] font-black shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Nhận Thưởng Bộ Sưu Tập!</span>
                    </button>
                  ) : (
                    <div className="w-full py-1 text-center rounded-xl bg-[#FFF8F4] text-[#8D6E63] text-[9.5px] font-medium border border-[#F2E1CF]">
                      Còn thiếu {totalItems - unlockedCount} món để hoàn tất
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-[#FFF8F4] border-t border-[#F2E1CF] text-center">
          <p className="text-[10px] text-[#8D6E63]">
            💡 Lên cấp để mở khóa thêm nhiều mẫu quần áo mới lấp đầy các bộ sưu tập!
          </p>
        </div>
      </div>
    </div>
  );
};
