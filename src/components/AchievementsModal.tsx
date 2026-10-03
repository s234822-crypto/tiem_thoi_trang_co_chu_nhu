import React, { useState } from 'react';
import { Achievement } from '../types/game';
import { Trophy, Gift, CheckCircle2, Sparkles, X, Lock } from 'lucide-react';
import { playAchievementSound, playTapSound } from '../utils/audio';

interface AchievementsModalProps {
  achievements: Achievement[];
  onClaimReward: (achievementId: string) => void;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  achievements,
  onClaimReward,
  onClose,
}) => {
  const [filter, setFilter] = useState<'all' | 'claimable' | 'completed'>('all');

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const claimableCount = achievements.filter((a) => a.unlocked && !a.claimed).length;

  const filteredAchievements = achievements.filter((a) => {
    if (filter === 'claimable') return a.unlocked && !a.claimed;
    if (filter === 'completed') return a.unlocked;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F4] border-2 border-[#F4C7D9] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden select-none">
        {/* Header */}
        <div className="relative px-4 py-3 bg-gradient-to-r from-[#FFF0F5] to-[#FCE4EC] border-b border-[#F2E1CF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D9A441] text-white flex items-center justify-center shadow-xs">
              <Trophy className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#3E3431] font-heading flex items-center gap-1.5">
                <span>Thành Tựu Boutique</span>
                <span className="bg-[#D9A441] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                  {unlockedCount}/{achievements.length}
                </span>
              </h2>
              <p className="text-[10px] text-[#6F554A]">Ghi dấu chặng đường phát triển thương hiệu</p>
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
            Tất cả ({achievements.length})
          </button>
          <button
            onClick={() => {
              playTapSound();
              setFilter('claimable');
            }}
            className={`px-3 py-1 rounded-full text-[10.5px] font-bold transition-all flex items-center gap-1 ${
              filter === 'claimable'
                ? 'bg-[#D87C9B] text-white shadow-2xs'
                : 'bg-white text-[#6F554A] border border-[#F2E1CF]'
            }`}
          >
            <span>Nhận thưởng</span>
            {claimableCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center">
                {claimableCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              playTapSound();
              setFilter('completed');
            }}
            className={`px-3 py-1 rounded-full text-[10.5px] font-bold transition-all ${
              filter === 'completed'
                ? 'bg-[#D87C9B] text-white shadow-2xs'
                : 'bg-white text-[#6F554A] border border-[#F2E1CF]'
            }`}
          >
            Đã đạt ({unlockedCount})
          </button>
        </div>

        {/* Achievements List */}
        <div className="p-3.5 space-y-2.5 overflow-y-auto flex-1">
          {filteredAchievements.map((ach) => {
            const percent = Math.min(100, Math.round((ach.progress / ach.target) * 100));
            const isUnlocked = ach.unlocked;
            const isClaimed = ach.claimed;

            const formatVal = (val: number) => {
              if (ach.type === 'totalRevenue') {
                return `${(val / 1000).toLocaleString('vi-VN')}k`;
              }
              if (ach.type === 'shopRating') {
                return `${val.toFixed(1)}⭐`;
              }
              return `${val}`;
            };

            return (
              <div
                key={ach.id}
                className={`relative rounded-2xl p-3 border transition-all ${
                  isClaimed
                    ? 'bg-[#F2E1CF]/30 border-[#E0D0BE] opacity-80'
                    : isUnlocked
                    ? 'bg-gradient-to-br from-[#FFF9E6] to-[#FFF0F5] border-[#D9A441] shadow-xs'
                    : 'bg-white border-[#F2E1CF] shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl shadow-2xs border ${
                        isUnlocked
                          ? 'bg-[#FFF8E7] border-[#D9A441]/40'
                          : 'bg-[#F5EBE1] border-[#E0D0BE] grayscale opacity-70'
                      }`}
                    >
                      {ach.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#3E3431] flex items-center gap-1 leading-tight">
                        <span>{ach.name}</span>
                        {!isUnlocked && <Lock className="w-2.5 h-2.5 text-[#8D6E63]" />}
                      </h3>
                      <p className="text-[10px] text-[#6F554A] leading-snug mt-0.5">
                        {ach.description}
                      </p>
                    </div>
                  </div>

                  {/* Reward badge */}
                  <div className="shrink-0 flex items-center gap-1 bg-[#FFF8F4] border border-[#F4C7D9] rounded-lg px-2 py-0.8 text-[9.5px] font-bold text-[#D87C9B]">
                    <Gift className="w-3 h-3 text-[#D87C9B]" />
                    <span>
                      {ach.rewardType === 'money'
                        ? `+${ach.rewardValue.toLocaleString('vi-VN')}đ`
                        : `+${ach.rewardValue} EXP`}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 mb-2">
                  <div className="flex items-center justify-between text-[9.5px] text-[#8D6E63] font-medium mb-1">
                    <span>Tiến trình</span>
                    <span className="font-bold text-[#3E3431]">
                      {formatVal(ach.progress)} / {formatVal(ach.target)} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F2E1CF]/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-[#D9A441] to-[#F1C40F]'
                          : 'bg-gradient-to-r from-[#F4C7D9] to-[#D87C9B]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <div>
                  {isClaimed ? (
                    <div className="w-full py-1 text-center rounded-xl bg-gray-100 text-gray-400 text-[10px] font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-gray-400" />
                      <span>Đã nhận thưởng</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        playAchievementSound();
                        onClaimReward(ach.id);
                      }}
                      className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#D9A441] to-[#E67E22] hover:from-[#c89230] hover:to-[#d35400] text-white text-[10.5px] font-black shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Nhận Phần Thưởng</span>
                    </button>
                  ) : (
                    <div className="w-full py-1 text-center rounded-xl bg-[#FFF8F4] text-[#8D6E63] text-[10px] font-medium border border-[#F2E1CF]">
                      Đang tích lũy...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FFF8F4] border-t border-[#F2E1CF] text-center">
          <p className="text-[10px] text-[#8D6E63]">
            🏆 Các thành tựu được lưu vĩnh viễn và không bị reset qua từng ngày.
          </p>
        </div>
      </div>
    </div>
  );
};
