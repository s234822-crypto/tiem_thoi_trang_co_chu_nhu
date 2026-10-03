import React, { useState } from 'react';
import { DailyEvent } from '../types/game';
import { Info, Sparkles, X } from 'lucide-react';
import { playTapSound } from '../utils/audio';

interface DailyEventBannerProps {
  event: DailyEvent;
}

export const DailyEventBanner: React.FC<DailyEventBannerProps> = ({ event }) => {
  const [showDetail, setShowDetail] = useState(false);

  const getEffectTag = () => {
    const tags: string[] = [];
    if (event.customerMultiplier > 1) {
      tags.push(`+${Math.round((event.customerMultiplier - 1) * 100)}% Khách`);
    } else if (event.customerMultiplier < 1) {
      tags.push(`${Math.round((event.customerMultiplier - 1) * 100)}% Khách`);
    }
    if (event.patienceMultiplier > 1) {
      tags.push(`+${Math.round((event.patienceMultiplier - 1) * 100)}% Kiên nhẫn`);
    }
    if (event.vipChanceBoost > 0) {
      tags.push(`+${Math.round(event.vipChanceBoost * 100)}% VIP`);
    }
    if (event.featuredStyle) {
      tags.push(`Hot: ${event.featuredStyle.toUpperCase()}`);
    }
    return tags.join(' · ') || 'Bình ổn';
  };

  return (
    <>
      {/* Compact Banner Ribbon */}
      <div
        onClick={() => {
          playTapSound();
          setShowDetail(true);
        }}
        className="w-full bg-gradient-to-r from-[#FFF5F8] via-[#FFF8F4] to-[#FFF0F5] border border-[#F4C7D9] rounded-xl px-2.5 py-1.5 flex items-center justify-between shadow-2xs cursor-pointer hover:border-[#D87C9B] transition-all select-none"
      >
        <div className="flex items-center gap-1.5 truncate">
          <span className="text-sm filter drop-shadow-2xs">{event.icon}</span>
          <span className="text-[11px] font-extrabold text-[#3E3431] font-heading truncate">
            {event.title}
          </span>
          <span className="hidden xs:inline-block text-[9.5px] font-bold text-[#D87C9B] bg-[#FFF0F5] px-1.5 py-0.2 rounded-md border border-[#F4C7D9]/70 shrink-0">
            {event.badge}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[9.5px] font-semibold text-[#8D6E63] tabular-nums">
            {getEffectTag()}
          </span>
          <Info className="w-3.5 h-3.5 text-[#D87C9B]" />
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-fade-in">
          <div className="w-full max-w-xs rounded-2xl bg-[#FFF8F4] border-2 border-[#F4C7D9] p-4 shadow-xl select-none animate-gentle-bounce text-left">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F2E1CF]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{event.icon}</span>
                <div>
                  <h3 className="text-xs font-black text-[#3E3431] font-heading">
                    {event.title}
                  </h3>
                  <span className="text-[9.5px] font-bold text-[#D87C9B]">
                    {event.badge}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  playTapSound();
                  setShowDetail(false);
                }}
                className="w-6 h-6 rounded-full bg-white border border-[#F2E1CF] flex items-center justify-center text-xs font-bold text-[#6F554A]"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-[#6F554A] leading-relaxed mb-3">
              {event.description}
            </p>

            {/* Effects list */}
            <div className="bg-[#FFF0F5] border border-[#F4C7D9] rounded-xl p-2.5 mb-3 space-y-1 text-[10.5px]">
              <div className="font-bold text-[#3E3431] flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-[#D87C9B]" />
                <span>Hiệu ứng ngày:</span>
              </div>
              <div className="text-[#6F554A] flex justify-between">
                <span>Lượng khách ghé:</span>
                <strong className="text-[#3E3431]">x{event.customerMultiplier}</strong>
              </div>
              <div className="text-[#6F554A] flex justify-between">
                <span>Thời gian kiên nhẫn:</span>
                <strong className="text-[#3E3431]">x{event.patienceMultiplier}</strong>
              </div>
              <div className="text-[#6F554A] flex justify-between">
                <span>Tỉ lệ khách VIP/KOL:</span>
                <strong className="text-[#3E3431]">+{Math.round(event.vipChanceBoost * 100)}%</strong>
              </div>
              {event.featuredStyle && (
                <div className="text-[#6F554A] flex justify-between">
                  <span>Gu thời trang hot:</span>
                  <strong className="text-[#D87C9B] font-bold uppercase">{event.featuredStyle}</strong>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                playTapSound();
                setShowDetail(false);
              }}
              className="w-full h-8 rounded-xl bg-[#D87C9B] hover:bg-[#c96c8a] text-white text-[11px] font-bold shadow-xs active:scale-95 transition-all"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
};
