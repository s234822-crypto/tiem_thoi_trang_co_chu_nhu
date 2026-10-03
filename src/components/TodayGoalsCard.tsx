import React from 'react';
import { ShopStats } from '../types/game';
import { Target, Star, DollarSign, Users, Award, ChevronRight } from 'lucide-react';

interface TodayGoalsCardProps {
  stats: ShopStats;
  targetRevenue?: number;
  targetFiveStars?: number;
  onOpenMissions?: () => void;
}

export const TodayGoalsCard: React.FC<TodayGoalsCardProps> = ({
  stats,
  targetRevenue = Math.max(1000000, stats.day * 500000),
  targetFiveStars = 3,
  onOpenMissions,
}) => {
  const servedCount = stats.successfulSalesToday || 0;
  const maxCust = stats.maxCustomersToday || 5;
  const custPercent = Math.min(100, Math.round((servedCount / maxCust) * 100));

  const fiveStars = stats.fiveStarToday || 0;
  const starPercent = Math.min(100, Math.round((fiveStars / targetFiveStars) * 100));

  const revenue = stats.todayRevenue || 0;
  const revPercent = Math.min(100, Math.round((revenue / targetRevenue) * 100));

  return (
    <div className="w-full bg-[#FFF8F4] border-2 border-[#F4C7D9] rounded-2xl p-3 shadow-xs select-none">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-black text-[#D87C9B] font-heading uppercase tracking-wide">
          <Target className="w-4 h-4 text-[#D87C9B]" />
          <span>MỤC TIÊU HÔM NAY (NGÀY {stats.day})</span>
        </div>
        {onOpenMissions && (
          <button
            onClick={onOpenMissions}
            className="flex items-center gap-0.5 text-[10px] font-bold text-[#8D6E63] hover:text-[#D87C9B] transition-colors"
          >
            <span>Tất cả nhiệm vụ</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Goal 1: Serviced Customers */}
        <div className="bg-white p-2 rounded-xl border border-[#F2E1CF] flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#6F554A] mb-1">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-[#D87C9B]" />
              <span className="truncate">Phục vụ</span>
            </div>
            <span className="text-[#3E3431] font-extrabold tabular-nums">
              {servedCount}/{maxCust}
            </span>
          </div>
          <div className="w-full bg-[#F2E1CF]/60 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F4C7D9] to-[#D87C9B] rounded-full transition-all duration-300"
              style={{ width: `${custPercent}%` }}
            />
          </div>
        </div>

        {/* Goal 2: 4-5 Star Outfits */}
        <div className="bg-white p-2 rounded-xl border border-[#F2E1CF] flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#6F554A] mb-1">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#D9A441] fill-[#D9A441]" />
              <span className="truncate">Outfit ≥4★</span>
            </div>
            <span className="text-[#3E3431] font-extrabold tabular-nums">
              {fiveStars}/{targetFiveStars}
            </span>
          </div>
          <div className="w-full bg-[#F2E1CF]/60 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F50057] to-[#D9A441] rounded-full transition-all duration-300"
              style={{ width: `${starPercent}%` }}
            />
          </div>
        </div>

        {/* Goal 3: Revenue Target */}
        <div className="bg-white p-2 rounded-xl border border-[#F2E1CF] flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#6F554A] mb-1">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-600" />
              <span className="truncate">Doanh thu</span>
            </div>
            <span className="text-emerald-700 font-extrabold text-[9px] tabular-nums truncate">
              {(revenue / 1000).toFixed(0)}k/{(targetRevenue / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="w-full bg-[#F2E1CF]/60 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${revPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
