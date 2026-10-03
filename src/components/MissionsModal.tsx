import React from 'react';
import { DailyMission } from '../types/game';
import { Target, Gift, CheckCircle2, Sparkles, X, Trophy } from 'lucide-react';
import { playCoinSound, playChimeSound, playMissionCompleteSound, playTapSound } from '../utils/audio';

interface MissionsModalProps {
  missions: DailyMission[];
  day: number;
  onClaimReward: (missionId: string) => void;
  onClose: () => void;
}

export const MissionsModal: React.FC<MissionsModalProps> = ({
  missions,
  day,
  onClaimReward,
  onClose,
}) => {
  const completedUnclaimedCount = missions.filter((m) => m.completed && !m.claimed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F4] border-2 border-[#F4C7D9] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden select-none">
        {/* Header */}
        <div className="relative px-4 py-3 bg-gradient-to-r from-[#FFF0F5] to-[#FCE4EC] border-b border-[#F2E1CF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D87C9B] text-white flex items-center justify-center shadow-xs">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#3E3431] font-heading flex items-center gap-1.5">
                <span>Nhiệm Vụ Ngày {day}</span>
                {completedUnclaimedCount > 0 && (
                  <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full animate-bounce">
                    {completedUnclaimedCount} sẵn sàng
                  </span>
                )}
              </h2>
              <p className="text-[10px] text-[#6F554A]">Hoàn thành mục tiêu để nhận thưởng thêm!</p>
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

        {/* Missions List */}
        <div className="p-3.5 space-y-3 overflow-y-auto flex-1">
          {missions.map((mission) => {
            const percent = Math.min(100, Math.round((mission.progress / mission.target) * 100));
            const isCompleted = mission.completed;
            const isClaimed = mission.claimed;

            const formatVal = (val: number) => {
              if (mission.type === 'revenue' || mission.type === 'profit') {
                return `${val.toLocaleString('vi-VN')}đ`;
              }
              return `${val}`;
            };

            return (
              <div
                key={mission.id}
                className={`relative rounded-2xl p-3 border transition-all ${
                  isClaimed
                    ? 'bg-[#F2E1CF]/30 border-[#E0D0BE] opacity-75'
                    : isCompleted
                    ? 'bg-gradient-to-br from-[#FFF5F8] to-[#FFF0F5] border-[#D87C9B] shadow-sm'
                    : 'bg-white border-[#F2E1CF] shadow-2xs'
                }`}
              >
                {/* Top: Icon + Title + Reward badge */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl filter drop-shadow-xs">{mission.icon}</span>
                    <div>
                      <h3 className="text-xs font-bold text-[#3E3431] leading-tight">
                        {mission.title}
                      </h3>
                      <p className="text-[10.5px] text-[#6F554A] leading-snug mt-0.5">
                        {mission.description}
                      </p>
                    </div>
                  </div>
                  {/* Reward chip */}
                  <div className="shrink-0 flex items-center gap-1 bg-[#FFF8F4] border border-[#F4C7D9] rounded-lg px-2 py-0.8 text-[10px] font-bold text-[#D87C9B] shadow-2xs">
                    <Gift className="w-3 h-3 text-[#D87C9B]" />
                    <span>
                      {mission.rewardType === 'money'
                        ? `+${mission.rewardValue.toLocaleString('vi-VN')}đ`
                        : `+${mission.rewardValue} EXP`}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 mb-2.5">
                  <div className="flex items-center justify-between text-[10px] text-[#8D6E63] font-medium mb-1">
                    <span>Tiến độ</span>
                    <span className="font-bold text-[#3E3431]">
                      {formatVal(mission.progress)} / {formatVal(mission.target)} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F2E1CF]/70 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                          : 'bg-gradient-to-r from-[#F4C7D9] to-[#D87C9B]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <div>
                  {isClaimed ? (
                    <div className="w-full py-1 text-center rounded-xl bg-gray-100 text-gray-400 text-[10.5px] font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
                      <span>Đã nhận thưởng</span>
                    </div>
                  ) : isCompleted ? (
                    <button
                      onClick={() => {
                        playMissionCompleteSound();
                        onClaimReward(mission.id);
                      }}
                      className="w-full py-1.5 rounded-xl bg-gradient-to-r from-[#D87C9B] to-[#F48FB1] hover:from-[#c96c8a] hover:to-[#e57b9f] text-white text-[11px] font-black shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Nhận Thưởng Ngay</span>
                    </button>
                  ) : (
                    <div className="w-full py-1 text-center rounded-xl bg-[#FFF8F4] text-[#8D6E63] text-[10.5px] font-medium border border-[#F2E1CF]">
                      Đang thực hiện...
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
            ✨ 3 nhiệm vụ mới sẽ tự động xuất hiện khi mở ngày tiếp theo.
          </p>
        </div>
      </div>
    </div>
  );
};
