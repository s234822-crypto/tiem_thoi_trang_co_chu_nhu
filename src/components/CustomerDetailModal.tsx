import React from 'react';
import { Customer } from '../types/game';
import { STYLE_LABELS, OCCASION_LABELS, COLOR_LABELS } from '../data/products';
import { Crown, Sparkles, Heart, DollarSign, Clock, ShieldCheck, Camera, Star, Award, AlertTriangle } from 'lucide-react';

interface CustomerDetailModalProps {
  customer: Customer | null;
  onClose: () => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  onClose,
}) => {
  if (!customer) return null;

  const colorMeta = COLOR_LABELS[customer.preferredColor] || { name: customer.preferredColor, hex: '#F48FB1' };

  const getRoleBadge = () => {
    switch (customer.specialRole) {
      case 'vip':
        return (
          <span className="text-[9.5px] font-black bg-[#FFF3E0] text-[#D9A441] border border-[#FFE082] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Crown className="w-3 h-3 fill-[#D9A441]" />
            <span>KHÁCH VIP</span>
          </span>
        );
      case 'influencer':
        return (
          <span className="text-[9.5px] font-black bg-[#F3E5F5] text-[#8E24AA] border border-[#E1BEE7] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Camera className="w-3 h-3" />
            <span>INFLUENCER</span>
          </span>
        );
      case 'reviewer':
        return (
          <span className="text-[9.5px] font-black bg-[#E3F2FD] text-[#1E88E5] border border-[#BBDEFB] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Star className="w-3 h-3 fill-[#1E88E5]" />
            <span>REVIEWER</span>
          </span>
        );
      case 'returning':
        return (
          <span className="text-[9.5px] font-black bg-[#FFEBEE] text-[#E91E63] border border-[#FFCDD2] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Heart className="w-3 h-3 fill-[#E91E63]" />
            <span>KHÁCH QUEN</span>
          </span>
        );
      case 'picky':
        return (
          <span className="text-[9.5px] font-black bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <AlertTriangle className="w-3 h-3" />
            <span>KHÁCH KHÓ TÍNH</span>
          </span>
        );
      default:
        return (
          <span className="text-[9.5px] font-bold bg-white text-[#6F554A] border border-[#F2E1CF] px-2 py-0.5 rounded-full">
            {customer.typeLabel}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#FFF8F4] border-2 border-[#F4C7D9] rounded-2xl p-4 shadow-xl select-none animate-gentle-bounce">
        {/* Header with avatar & name */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#F2E1CF]">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D87C9B] shadow-xs">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {customer.isVip && (
              <div className="absolute top-0 right-0 w-5 h-5 bg-[#D9A441] rounded-full flex items-center justify-center text-white text-[10px]">
                👑
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm font-extrabold text-[#3E3431] font-heading">
                {customer.name}
              </h3>
              {getRoleBadge()}
            </div>
            <div className="text-[11px] text-[#6F554A] font-medium mt-0.5">
              {customer.typeLabel} · {customer.age} tuổi
            </div>
            <div className="text-[10px] text-[#D87C9B] font-semibold mt-0.5">
              Hệ số tip: x{customer.tipMultiplier.toFixed(2)}
              {customer.minScoreRequired && customer.minScoreRequired > 60 && (
                <span className="ml-2 text-rose-500 font-bold">
                  (Yêu cầu ≥ {customer.minScoreRequired}đ)
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#F2E1CF] text-[#6F554A] font-bold flex items-center justify-center hover:bg-rose-50"
          >
            ✕
          </button>
        </div>

        {/* Special Trait Note */}
        {customer.specialTrait && (
          <div className="mb-3 p-2.5 bg-[#FFF0F5] border border-[#F4C7D9] rounded-xl text-[11px] text-[#6F554A] flex items-start gap-1.5 leading-snug">
            <Sparkles className="w-3.5 h-3.5 text-[#D87C9B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#D87C9B]">Đặc điểm: </strong>
              {customer.specialTrait}
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
          <div className="bg-white p-2 rounded-xl border border-[#F2E1CF]">
            <span className="text-[9.5px] text-[#8D6E63] block">Gu thời trang</span>
            <strong className="text-[#3E3431]">
              {STYLE_LABELS[customer.preferredStyle] || customer.preferredStyle}
            </strong>
          </div>

          <div className="bg-white p-2 rounded-xl border border-[#F2E1CF]">
            <span className="text-[9.5px] text-[#8D6E63] block">Dịp mặc</span>
            <strong className="text-[#3E3431]">
              {OCCASION_LABELS[customer.occasion] || customer.occasion}
            </strong>
          </div>

          <div className="bg-white p-2 rounded-xl border border-[#F2E1CF]">
            <span className="text-[9.5px] text-[#8D6E63] block">Màu yêu thích</span>
            <div className="flex items-center gap-1 font-bold text-[#3E3431]">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                style={{ backgroundColor: colorMeta.hex }}
              />
              <span>{colorMeta.name}</span>
            </div>
          </div>

          <div className="bg-white p-2 rounded-xl border border-[#F2E1CF]">
            <span className="text-[9.5px] text-[#8D6E63] block">Ngân sách tối đa</span>
            <strong className="text-[#D87C9B] tabular-nums">
              {customer.budget.toLocaleString('vi-VN')}đ
            </strong>
          </div>
        </div>

        {/* Current Patience */}
        <div className="bg-white p-2.5 rounded-xl border border-[#F2E1CF] mb-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#6F554A] mb-1">
            <span>Thời gian kiên nhẫn còn lại:</span>
            <span className="font-bold tabular-nums text-[#D87C9B]">
              {Math.ceil(customer.currentPatience)}s / {customer.maxPatience}s
            </span>
          </div>
          <div className="w-full bg-[#F2E1CF] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#D87C9B] h-full rounded-full transition-all duration-300"
              style={{
                width: `${(customer.currentPatience / customer.maxPatience) * 100}%`,
              }}
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-[#D87C9B] hover:bg-[#c96c8a] text-white text-xs font-bold transition-all shadow-xs"
        >
          Trở lại phục vụ khách
        </button>
      </div>
    </div>
  );
};
