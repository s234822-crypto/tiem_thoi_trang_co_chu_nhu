import React from 'react';
import { ShopStats, DailyMission } from '../types/game';

interface TodayGoalsCardProps {
  stats: ShopStats;
  missions?: DailyMission[];
  targetRevenue?: number;
  targetFiveStars?: number;
  onOpenMissions?: () => void;
}

export const TodayGoalsCard: React.FC<TodayGoalsCardProps> = ({
  stats,
  missions = [],
  targetRevenue = Math.max(1000000, stats.day * 500000),
  targetFiveStars = 3,
  onOpenMissions,
}) => {
  const servedCount = stats.successfulSalesToday || 0;
  const maxCust = stats.maxCustomersToday || 5;
  const fiveStars = stats.fiveStarToday || 0;
  const revenue = stats.todayRevenue || 0;

  // Format revenue display e.g. 405k/1M or 405k/1000k
  const formatK = (val: number) => {
    if (val >= 1000000) {
      const m = val / 1000000;
      return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`;
    }
    return `${Math.round(val / 1000)}k`;
  };

  const revCurrentStr = formatK(revenue);
  const revTargetStr = formatK(targetRevenue);

  const goalsList = [
    {
      id: 'g-customers',
      title: `Phục vụ ${maxCust} khách`,
      currentStr: `${servedCount}/${maxCust}`,
      isCompleted: servedCount >= maxCust,
    },
    {
      id: 'g-outfits',
      title: 'Outfit từ 4★ trở lên',
      currentStr: `${fiveStars}/${targetFiveStars}`,
      isCompleted: fiveStars >= targetFiveStars,
    },
    {
      id: 'g-revenue',
      title: `Doanh thu ${(targetRevenue / 1000).toLocaleString('vi-VN')}k`,
      currentStr: `${revCurrentStr}/${revTargetStr}`,
      isCompleted: revenue >= targetRevenue,
    },
  ];

  return (
    <div
      onClick={onOpenMissions}
      className="w-full bg-[#FFFDF9] border-2 border-[#C8D6B9] rounded-2xl p-3.5 shadow-2xs select-none space-y-2 cursor-pointer transition-all hover:border-[#B5C7A3]"
    >
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black text-[#4A3E38] font-heading tracking-tight">
          Mục tiêu hôm nay
        </h3>
        <span className="text-[10px] font-bold text-[#8D7F75] hover:underline">
          Chi tiết ›
        </span>
      </div>

      {/* Rows of Goals */}
      <div className="space-y-1.5 pt-0.5">
        {goalsList.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center justify-between text-[11.5px] font-bold text-[#5A4D45] leading-snug"
          >
            {/* Left: Check / Circle Icon + Task Title */}
            <div className="flex items-center gap-2 min-w-0 pr-2">
              {goal.isCompleted ? (
                <div className="w-4 h-4 rounded-full bg-[#81C784] text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-2xs">
                  ✓
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-[#B0C59F] bg-white shrink-0" />
              )}
              <span className={`text-wrap break-words ${goal.isCompleted ? 'text-[#3E3431] font-extrabold' : 'text-[#5A4D45]'}`}>
                {goal.title}
              </span>
            </div>

            {/* Right: Progress */}
            <span
              className={`font-black tabular-nums shrink-0 text-right ${
                goal.isCompleted ? 'text-[#4CAF50]' : 'text-[#4A3E38]'
              }`}
            >
              {goal.currentStr}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
