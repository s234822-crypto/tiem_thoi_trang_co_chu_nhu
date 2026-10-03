import React, { useEffect, useState } from 'react';
import { Customer, Outfit, OutfitScoreResult } from '../types/game';
import { getOutfitItems, getOutfitTotalPrice } from '../utils/scoring';
import { playCoinSound, playSuccessFanfare, playAlertSound } from '../utils/audio';
import { Star, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface FittingModalProps {
  customer: Customer;
  outfit: Outfit;
  scoreResult: OutfitScoreResult;
  onFinishSale: () => void;
}

export const FittingModal: React.FC<FittingModalProps> = ({
  customer,
  outfit,
  scoreResult,
  onFinishSale,
}) => {
  const items = getOutfitItems(outfit);
  const totalPrice = getOutfitTotalPrice(outfit);

  // Play sound effect on mount
  useEffect(() => {
    if (scoreResult.isSuccess) {
      playSuccessFanfare();
      playCoinSound();
    } else {
      playAlertSound();
    }
  }, [scoreResult.isSuccess]);

  // Requirement 7: Snappy auto-proceed timer (2.2s) or tap to continue immediately
  const [countdownPercent, setCountdownPercent] = useState<number>(100);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingRatio = Math.max(0, 1 - elapsed / duration);
      setCountdownPercent(remainingRatio * 100);

      if (elapsed >= duration) {
        clearInterval(interval);
        onFinishSale();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onFinishSale]);

  return (
    <div
      onClick={onFinishSale}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4 cursor-pointer select-none animate-fade-in"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onFinishSale();
        }}
        className="w-full max-w-sm bg-[#FFF8F4] border-2 border-[#D87C9B] rounded-3xl p-4 shadow-2xl flex flex-col items-center text-center animate-gentle-bounce"
      >
        {/* Customer Avatar & Stars */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D87C9B] shadow-md mb-2">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {customer.isVip && (
            <div className="absolute top-0 right-0 w-5 h-5 bg-[#D9A441] rounded-full flex items-center justify-center text-white text-[10px] shadow-xs">
              👑
            </div>
          )}
        </div>

        {/* Big Score & Stars (Requirement 7) */}
        <div className="flex items-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-6 h-6 transition-all ${
                s <= scoreResult.stars
                  ? 'text-[#D9A441] fill-[#D9A441] scale-110 drop-shadow-xs'
                  : 'text-slate-300'
              }`}
            />
          ))}
        </div>

        <div className="text-3xl font-black text-[#D87C9B] font-heading mb-1 tabular-nums">
          {scoreResult.totalScore}{' '}
          <span className="text-xs font-bold text-[#8D6E63]">/ 100 điểm</span>
        </div>

        {/* Customer Reaction Quote */}
        <div className="bg-white/95 rounded-xl px-3 py-2 border border-[#F2E1CF] text-[11.5px] italic text-[#3E3431] font-medium leading-relaxed shadow-2xs mb-3 w-full">
          {scoreResult.reactionDialogue}
        </div>

        {/* Sales Outcome Pill (Money & EXP) */}
        {scoreResult.isSuccess ? (
          <div className="w-full bg-emerald-50/95 border border-emerald-300 rounded-2xl p-2.5 shadow-xs mb-3 text-left">
            <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-xs mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>BÁN HÀNG THÀNH CÔNG!</span>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span>Thu về:</span>
              <span className="text-sm font-black text-emerald-700 tabular-nums">
                +{scoreResult.totalRevenue.toLocaleString('vi-VN')}đ
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-[#8D6E63] mt-0.5">
              <span>Kinh nghiệm:</span>
              <span className="text-[#D87C9B] font-bold">
                +{scoreResult.expEarned} EXP
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full bg-rose-50/95 border border-rose-300 rounded-2xl p-2.5 shadow-xs mb-3 text-left">
            <div className="flex items-center gap-1.5 text-rose-800 font-extrabold text-xs mb-1">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>KHÁCH CHƯA ƯNG Ý</span>
            </div>
            <p className="text-[10.5px] text-rose-700 leading-snug">
              Khách chưa hài lòng về set đồ nên từ chối mua lần này. Quần áo trong kho được giữ nguyên!
            </p>
          </div>
        )}

        {/* Auto Progress Countdown Indicator */}
        <div className="w-full bg-[#F2E1CF]/70 h-1.5 rounded-full overflow-hidden mb-2.5">
          <div
            className="h-full bg-[#D87C9B] transition-all duration-75"
            style={{ width: `${countdownPercent}%` }}
          />
        </div>

        {/* 1-Tap Continue Button (Requirement 7) */}
        <button
          onClick={onFinishSale}
          className={`w-full h-11 rounded-2xl font-black text-xs text-white shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5 ${
            scoreResult.isSuccess
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500'
              : 'bg-[#6F554A] hover:bg-[#5a443b]'
          }`}
        >
          <span>CHẠM ĐỂ TIẾP TỤC ĐÓN KHÁCH</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
