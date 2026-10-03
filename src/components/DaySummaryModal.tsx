import React, { useEffect, useState } from 'react';
import { DailyEvent, DailyMission, DaySummaryData } from '../types/game';
import { playSuccessFanfare, playCoinSound } from '../utils/audio';
import { Moon, Star, TrendingUp, Users, CheckCircle2, XCircle, Clock, Sparkles, Target } from 'lucide-react';

interface DaySummaryModalProps {
  summary: DaySummaryData;
  event?: DailyEvent;
  missions?: DailyMission[];
  onNextDay: () => void;
}

export const DaySummaryModal: React.FC<DaySummaryModalProps> = ({
  summary,
  event,
  missions,
  onNextDay,
}) => {
  const [animProfit, setAnimProfit] = useState<number>(0);

  const completedMissionsCount = missions ? missions.filter((m) => m.completed).length : 0;

  useEffect(() => {
    playSuccessFanfare();
    let current = 0;
    const target = summary.profit;
    const step = Math.max(10000, Math.floor(Math.abs(target) / 20));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setAnimProfit(target);
        clearInterval(timer);
        playCoinSound();
      } else {
        setAnimProfit(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [summary.profit]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm max-h-[92vh] bg-[#FFF8F4] border-2 border-[#D9A441] rounded-3xl p-4 shadow-2xl flex flex-col select-none overflow-hidden animate-soft-pulse">
        {/* Header */}
        <div className="text-center pb-2 border-b border-[#F2E1CF]">
          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#2A2322] text-[#F4C7D9] text-[10px] font-black tracking-wide uppercase mb-1 shadow-2xs">
            <Moon className="w-3 h-3 text-[#FFE082]" />
            <span>KẾT TOÁN CUỐI NGÀY</span>
          </div>
          <h2 className="text-base font-black text-[#3E3431] font-heading">
            NGÀY {summary.day} HOÀN THÀNH
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-2.5 space-y-2.5 pr-1">
          {/* Big Profit Box */}
          <div className="bg-gradient-to-b from-white to-[#FFF5F8] p-3 rounded-2xl border border-[#F4C7D9] text-center shadow-xs">
            <div className="text-[10.5px] font-bold text-[#8D6E63] mb-0.5">
              LỢI NHUẬN THỰC TẾ HÔM NAY
            </div>
            <div
              className={`text-2xl font-black tabular-nums font-heading ${
                summary.profit >= 0 ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              {summary.profit >= 0 ? '+' : ''}
              {animProfit.toLocaleString('vi-VN')}đ
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-[#F2E1CF] text-[10.5px]">
              <div>
                <span className="text-[#8D6E63] block text-[9.5px]">Doanh thu:</span>
                <strong className="text-[#3E3431] tabular-nums">
                  +{summary.revenue.toLocaleString('vi-VN')}đ
                </strong>
              </div>
              <div className="w-[1px] h-6 bg-[#F2E1CF]" />
              <div>
                <span className="text-[#8D6E63] block text-[9.5px]">Chi phí nhập hàng:</span>
                <strong className="text-rose-600 tabular-nums">
                  -{summary.restockCost.toLocaleString('vi-VN')}đ
                </strong>
              </div>
            </div>
          </div>

          {/* Customer Service Report */}
          <div className="bg-white/95 rounded-2xl p-2.5 border border-[#F2E1CF] shadow-2xs space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between font-bold text-[#6F554A] border-b border-[#F2E1CF]/70 pb-1 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#D87C9B]" />
                <span>Lượt khách phục vụ:</span>
              </span>
              <span className="text-xs text-[#3E3431] tabular-nums">
                {summary.totalCustomers} khách
              </span>
            </div>

            <div className="flex items-center justify-between text-[#3E3431]">
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Bán hàng thành công:</span>
              </span>
              <strong className="tabular-nums">{summary.successfulSales} đơn</strong>
            </div>

            <div className="flex items-center justify-between text-[#3E3431]">
              <span className="flex items-center gap-1 text-[#8D6E63]">
                <XCircle className="w-3 h-3 text-slate-400" />
                <span>Khách chưa ưng ý (từ chối):</span>
              </span>
              <strong className="tabular-nums">{summary.failedSales}</strong>
            </div>

            <div className="flex items-center justify-between text-[#3E3431]">
              <span className="flex items-center gap-1 text-rose-700">
                <Clock className="w-3 h-3 text-rose-500" />
                <span>Khách bỏ đi (hết kiên nhẫn):</span>
              </span>
              <strong className="tabular-nums text-rose-600">{summary.walkouts}</strong>
            </div>

            <div className="flex items-center justify-between text-[#D9A441] pt-1 border-t border-[#F2E1CF]/70 font-bold">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#D9A441]" />
                <span>Đơn hàng 5 sao:</span>
              </span>
              <strong className="tabular-nums">{summary.fiveStarCount} đơn</strong>
            </div>
          </div>

          {/* Event & Missions Summary */}
          {(event || missions) && (
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {event && (
                <div className="bg-white/95 p-2 rounded-xl border border-[#F2E1CF] shadow-2xs">
                  <div className="text-[9px] text-[#8D6E63] font-medium">Sự kiện ngày:</div>
                  <div className="flex items-center gap-1 font-bold text-[#3E3431] mt-0.5 truncate">
                    <span>{event.icon}</span>
                    <span className="truncate">{event.title}</span>
                  </div>
                </div>
              )}
              {missions && (
                <div className="bg-white/95 p-2 rounded-xl border border-[#F2E1CF] shadow-2xs">
                  <div className="text-[9px] text-[#8D6E63] font-medium">Nhiệm vụ ngày:</div>
                  <div className="flex items-center gap-1 font-bold text-[#D87C9B] mt-0.5">
                    <Target className="w-3.5 h-3.5 text-[#D87C9B]" />
                    <span>{completedMissionsCount}/3 Hoàn thành</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reputation & EXP summary */}
          <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
            <div className="bg-white p-2 rounded-xl border border-[#F2E1CF] shadow-2xs">
              <div className="text-[9.5px] text-[#8D6E63]">Đánh giá tiệm:</div>
              <div className="flex items-center justify-center gap-1 font-black text-sm text-[#3E3431] mt-0.5">
                <Star className="w-3.5 h-3.5 text-[#D9A441] fill-[#D9A441]" />
                <span className="tabular-nums">{summary.finalRating.toFixed(1)} ⭐</span>
              </div>
            </div>

            <div className="bg-white p-2 rounded-xl border border-[#F2E1CF] shadow-2xs">
              <div className="text-[9.5px] text-[#8D6E63]">Kinh nghiệm nhận:</div>
              <div className="flex items-center justify-center gap-1 font-black text-sm text-[#D87C9B] mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="tabular-nums">+{summary.expEarned} EXP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Day Button */}
        <button
          onClick={onNextDay}
          className="mt-2 w-full h-11 rounded-2xl bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-xs font-black shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>BƯỚC SANG NGÀY TIẾP THEO</span>
        </button>
      </div>
    </div>
  );
};
