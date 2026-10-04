import React from 'react';
import { GameIcon } from './GameIcon';

export type ActiveTab = 'shop' | 'inventory' | 'restock' | 'upgrade' | 'decor';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  lowStockCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  lowStockCount = 0,
}) => {
  const tabs: Array<{
    id: ActiveTab;
    label: string;
    badge?: number;
  }> = [
      { id: 'shop', label: 'Tiệm' },
      { id: 'inventory', label: 'Kho hàng', badge: lowStockCount > 0 ? lowStockCount : undefined },
      { id: 'restock', label: 'Nhập hàng' },
      { id: 'upgrade', label: 'Nâng cấp' },
      { id: 'decor', label: 'Trang trí' },
    ];

  return (
    <nav className="w-full bg-[#FFF8F4] border-t border-[#F2E1CF] px-2 py-1.5 flex items-center justify-around shadow-lg z-30 select-none shrink-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-col items-center justify-center min-w-[52px] py-1 rounded-xl transition-all active:scale-95 ${isActive
              ? 'text-[#D87C9B] font-extrabold scale-105'
              : 'text-[#8D6E63] font-medium hover:text-[#3E3431]'
              }`}
          >
            <div className="relative">
              {/* Active state: coloured SVG icon at 24px; inactive: slightly muted at 22px */}
              <GameIcon
                name={tab.id}
                size={isActive ? 26 : 22}
                className={`transition-all duration-150 ${isActive ? '' : 'opacity-60'}`}
              />

              {/* Low-stock badge */}
              {tab.badge && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[8px] font-black rounded-full px-1 py-0.5 leading-tight min-w-[14px] text-center">
                  {tab.badge}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] mt-0.5 tracking-tight transition-colors ${isActive ? 'text-[#D87C9B] font-black' : 'text-[#8D6E63]'
                }`}
            >
              {tab.label}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D87C9B] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
