import React from 'react';
import { Bug, Plus, RefreshCw, UserCheck, Crown, Sparkles, Trash2, Target, Trophy, Sun } from 'lucide-react';

interface DebugPanelProps {
  onClose: () => void;
  onAddMoney: (amount: number) => void;
  onAddExp: (amount: number) => void;
  onSpawnVip: () => void;
  onNextCustomer: () => void;
  onResetPatience: () => void;
  onRefillStock: () => void;
  onCompleteAllMissions?: () => void;
  onUnlockNextAchievement?: () => void;
  onSwitchEvent?: () => void;
  onResetGame: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  onClose,
  onAddMoney,
  onAddExp,
  onSpawnVip,
  onNextCustomer,
  onResetPatience,
  onRefillStock,
  onCompleteAllMissions,
  onUnlockNextAchievement,
  onSwitchEvent,
  onResetGame,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="w-full max-w-xs max-h-[90vh] overflow-y-auto bg-[#2B2320] border-2 border-[#D9A441] rounded-2xl p-4 shadow-2xl text-white select-none">
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-[#D9A441] font-bold text-xs">
            <Bug className="w-4 h-4" />
            <span>DEVELOPER DEBUG PANEL</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <button
            onClick={() => onAddMoney(1000000)}
            className="w-full h-9 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 px-3 flex items-center justify-between font-bold"
          >
            <span>💰 Cộng +1.000.000đ</span>
            <Plus className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onAddExp(100)}
            className="w-full h-9 rounded-lg bg-pink-700/80 hover:bg-pink-600 px-3 flex items-center justify-between font-bold"
          >
            <span>⭐ Cộng +100 EXP</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onSpawnVip}
            className="w-full h-9 rounded-lg bg-amber-700/80 hover:bg-amber-600 px-3 flex items-center justify-between font-bold"
          >
            <span>👑 Triệu hồi Khách VIP</span>
            <Crown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onNextCustomer}
            className="w-full h-9 rounded-lg bg-blue-700/80 hover:bg-blue-600 px-3 flex items-center justify-between font-bold"
          >
            <span>👤 Đổi khách ngẫu nhiên</span>
            <UserCheck className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onResetPatience}
            className="w-full h-9 rounded-lg bg-purple-700/80 hover:bg-purple-600 px-3 flex items-center justify-between font-bold"
          >
            <span>⏳ Hồi đầy thanh kiên nhẫn</span>
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onRefillStock}
            className="w-full h-9 rounded-lg bg-teal-700/80 hover:bg-teal-600 px-3 flex items-center justify-between font-bold"
          >
            <span>📦 Nạp đầy kho hàng (10/10)</span>
            <Plus className="w-3.5 h-3.5" />
          </button>

          {onCompleteAllMissions && (
            <button
              onClick={onCompleteAllMissions}
              className="w-full h-9 rounded-lg bg-indigo-700/80 hover:bg-indigo-600 px-3 flex items-center justify-between font-bold"
            >
              <span>🎯 Hoàn thành 3 Nhiệm vụ</span>
              <Target className="w-3.5 h-3.5" />
            </button>
          )}

          {onUnlockNextAchievement && (
            <button
              onClick={onUnlockNextAchievement}
              className="w-full h-9 rounded-lg bg-yellow-700/80 hover:bg-yellow-600 px-3 flex items-center justify-between font-bold"
            >
              <span>🏆 Mở khóa 1 Thành tựu</span>
              <Trophy className="w-3.5 h-3.5" />
            </button>
          )}

          {onSwitchEvent && (
            <button
              onClick={onSwitchEvent}
              className="w-full h-9 rounded-lg bg-orange-700/80 hover:bg-orange-600 px-3 flex items-center justify-between font-bold"
            >
              <span>☀️ Đổi Sự Kiện Ngày</span>
              <Sun className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onResetGame}
            className="w-full h-9 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-rose-200 px-3 flex items-center justify-between font-bold"
          >
            <span>⚠️ Xóa dữ liệu Save & Reset</span>
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full h-9 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all text-white/80"
        >
          Đóng Debug
        </button>
      </div>
    </div>
  );
};
