import React, { useState } from 'react';
import { ShopStats, ShopTier, ShopUpgradeItem } from '../types/game';
import { SHOP_TIERS } from '../data/upgrades';
import { playCoinSound, playVipFanfare, playAlertSound } from '../utils/audio';
import { Wrench, Crown, ArrowUpCircle, Check, Sparkles, Star, ChevronRight, Lock } from 'lucide-react';

interface ShopUpgradeModalProps {
  stats: ShopStats;
  upgrades: ShopUpgradeItem[];
  onUpgradeItem: (upgradeId: string, cost: number) => boolean;
  onUpgradeShopTier: (targetTier: ShopTier) => boolean;
}

export const ShopUpgradeModal: React.FC<ShopUpgradeModalProps> = ({
  stats,
  upgrades,
  onUpgradeItem,
  onUpgradeShopTier,
}) => {
  const [activeTab, setActiveTab] = useState<'facilities' | 'tiers'>('facilities');
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentTier = SHOP_TIERS.find((t) => t.level === stats.shopTierLevel) || SHOP_TIERS[0];
  const nextTier = SHOP_TIERS.find((t) => t.level === stats.shopTierLevel + 1);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  };

  const getUpgradeCost = (item: ShopUpgradeItem) => {
    return Math.round((item.baseCost * Math.pow(1.65, item.level - 1)) / 10000) * 10000;
  };

  const handleUpgradeFacility = (item: ShopUpgradeItem) => {
    if (item.level >= item.maxLevel) {
      showFeedback('Trang bị này đã nâng cấp tối đa!');
      return;
    }
    const cost = getUpgradeCost(item);
    if (stats.money < cost) {
      playAlertSound();
      showFeedback('Không đủ tiền trong ngân quỹ!');
      return;
    }
    const success = onUpgradeItem(item.id, cost);
    if (success) {
      playCoinSound();
      showFeedback(`Đã nâng cấp ${item.name} lên Lv.${item.level + 1}!`);
    }
  };

  const handleTierUpgrade = (tier: ShopTier) => {
    if (stats.level < tier.minPlayerLevel) {
      playAlertSound();
      showFeedback(`Cần đạt Cấp độ người chơi ${tier.minPlayerLevel}!`);
      return;
    }
    if (stats.rating < tier.minRating) {
      playAlertSound();
      showFeedback(`Cần đánh giá tiệm tối thiểu ${tier.minRating} ⭐!`);
      return;
    }
    if (stats.money < tier.upgradeCost) {
      playAlertSound();
      showFeedback('Không đủ ngân quỹ nâng cấp quy mô tiệm!');
      return;
    }

    const success = onUpgradeShopTier(tier);
    if (success) {
      playVipFanfare();
      showFeedback(`🎉 Nâng cấp thành công lên ${tier.title}!`);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-[#FFF8F4] select-none">
      {/* Top Banner: current funds and tab selector */}
      <div className="p-3 bg-white border-b border-[#F2E1CF] shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-[#D87C9B]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#3E3431] font-heading">
              Nâng Cấp Cửa Hàng
            </h2>
          </div>
          <div className="bg-[#FFF8F4] px-2.5 py-1 rounded-lg border border-[#F2E1CF] flex items-center gap-1 shadow-2xs">
            <span className="text-xs">💰</span>
            <span className="text-xs font-extrabold text-[#3E3431] tabular-nums">
              {stats.money.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FFF0F5] rounded-xl border border-[#F4C7D9]/60">
          <button
            onClick={() => setActiveTab('facilities')}
            className={`py-1 rounded-lg text-[11px] font-bold transition-all ${
              activeTab === 'facilities'
                ? 'bg-white text-[#D87C9B] shadow-xs'
                : 'text-[#6F554A] hover:text-[#3E3431]'
            }`}
          >
            🛋️ Trang Thiết Bị
          </button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`py-1 rounded-lg text-[11px] font-bold transition-all ${
              activeTab === 'tiers'
                ? 'bg-white text-[#D87C9B] shadow-xs'
                : 'text-[#6F554A] hover:text-[#3E3431]'
            }`}
          >
            👑 Cấp Bậc Tiệm
          </button>
        </div>

        {feedback && (
          <div className="mt-2 p-1.5 rounded-lg text-[10.5px] font-bold text-center bg-[#FFF3E0] text-[#D9A441] border border-[#FFE082] animate-gentle-bounce">
            {feedback}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2.5 space-y-2">
        {activeTab === 'facilities' ? (
          // Facilities List
          upgrades.map((item) => {
            const cost = getUpgradeCost(item);
            const isMax = item.level >= item.maxLevel;
            const canAfford = stats.money >= cost;

            return (
              <div
                key={item.id}
                className="p-2.5 rounded-xl border border-[#F2E1CF] bg-white shadow-2xs flex items-center gap-2.5"
              >
                <div className="w-11 h-11 rounded-lg bg-[#FFF0F5] border border-[#F4C7D9] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-[11.5px] font-bold text-[#3E3431] truncate">
                      {item.name}
                    </h4>
                    <span className="text-[9.5px] font-black text-[#D87C9B] bg-[#FFF0F5] px-1.5 py-0.2 rounded-full border border-[#F4C7D9] shrink-0">
                      Cấp {item.level}/{item.maxLevel}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#6F554A] leading-snug line-clamp-1 mb-1.5">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#8D6E63] font-semibold">
                      {isMax ? (
                        <span className="text-emerald-700 font-bold">✓ TỐI ĐA</span>
                      ) : (
                        <span>Giá: <strong className="text-[#3E3431] tabular-nums">{cost.toLocaleString('vi-VN')}đ</strong></span>
                      )}
                    </span>

                    <button
                      onClick={() => handleUpgradeFacility(item)}
                      disabled={isMax || !canAfford}
                      className={`h-6 px-2.5 rounded-lg text-[10px] font-extrabold transition-all active:scale-95 flex items-center gap-1 shadow-2xs ${
                        isMax
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : canAfford
                          ? 'bg-[#D87C9B] hover:bg-[#c96c8a] text-white'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ArrowUpCircle className="w-3 h-3" />
                      <span>{isMax ? 'Đã Max' : 'Nâng Cấp'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Shop Tiers List
          SHOP_TIERS.map((tier) => {
            const isCurrent = tier.level === stats.shopTierLevel;
            const isUnlocked = tier.level <= stats.shopTierLevel;
            const canUpgradeToThis =
              tier.level === stats.shopTierLevel + 1 &&
              stats.level >= tier.minPlayerLevel &&
              stats.rating >= tier.minRating &&
              stats.money >= tier.upgradeCost;

            return (
              <div
                key={tier.level}
                className={`p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'border-2 border-[#D9A441] bg-gradient-to-r from-amber-50/50 to-white shadow-xs'
                    : 'border-[#F2E1CF] bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Crown className={`w-4 h-4 ${isCurrent ? 'text-[#D9A441] fill-[#D9A441]' : 'text-slate-400'}`} />
                    <h3 className="text-xs font-black text-[#3E3431] font-heading">
                      Cấp {tier.level}: {tier.title}
                    </h3>
                  </div>
                  {isCurrent && (
                    <span className="text-[9.5px] font-black bg-[#FFF3E0] text-[#D9A441] px-2 py-0.5 rounded-full border border-[#FFE082]">
                      HIỆN TẠI
                    </span>
                  )}
                </div>

                {/* Tier specs */}
                <div className="grid grid-cols-2 gap-1.5 text-[10.5px] bg-[#FFF8F4] p-2 rounded-xl border border-[#F2E1CF] mb-2">
                  <div>
                    <span className="text-[#8D6E63]">Khách hàng chờ: </span>
                    <strong className="text-[#3E3431]">{tier.maxWaitingCustomers} khách</strong>
                  </div>
                  <div>
                    <span className="text-[#8D6E63]">Slot trang trí: </span>
                    <strong className="text-[#3E3431]">{tier.decorSlots} vị trí</strong>
                  </div>
                  {tier.patienceBonusPercent > 0 && (
                    <div>
                      <span className="text-[#8D6E63]">Kiên nhẫn: </span>
                      <strong className="text-emerald-700">+{Math.round(tier.patienceBonusPercent * 100)}%</strong>
                    </div>
                  )}
                  {tier.tipBonusPercent > 0 && (
                    <div>
                      <span className="text-[#8D6E63]">Thưởng Tip: </span>
                      <strong className="text-emerald-700">+{Math.round(tier.tipBonusPercent * 100)}%</strong>
                    </div>
                  )}
                </div>

                {/* Requirements / Action */}
                {!isUnlocked && (
                  <div className="pt-1.5 border-t border-[#F2E1CF]/70 flex items-center justify-between text-[10px]">
                    <div className="space-y-0.5 text-[#8D6E63]">
                      <div>Yêu cầu: Cấp {tier.minPlayerLevel} · {tier.minRating}⭐</div>
                      <div>Phí mở rộng: <strong className="text-[#D87C9B]">{tier.upgradeCost.toLocaleString('vi-VN')}đ</strong></div>
                    </div>

                    <button
                      onClick={() => handleTierUpgrade(tier)}
                      disabled={!canUpgradeToThis}
                      className={`h-7 px-3 rounded-lg text-[10.5px] font-bold transition-all shadow-xs ${
                        canUpgradeToThis
                          ? 'bg-[#D9A441] hover:bg-[#c49237] text-white active:scale-95'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Mở Rộng
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
