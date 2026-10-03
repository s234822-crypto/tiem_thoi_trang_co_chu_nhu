import React from 'react';
import { Customer } from '../types/game';
import { COLOR_LABELS } from '../data/products';
import { formatCustomerRequestTags } from '../data/customers';
import { Clock, Camera, Star, AlertTriangle, Crown, User, Tag } from 'lucide-react';

interface CustomerRequestBubbleProps {
  customer: Customer;
  onInspectCustomer?: () => void;
}

export const CustomerRequestBubble: React.FC<CustomerRequestBubbleProps> = ({
  customer,
  onInspectCustomer,
}) => {
  const patiencePercent = Math.max(0, Math.min(100, (customer.currentPatience / customer.maxPatience) * 100));

  const getPatienceColor = () => {
    if (patiencePercent > 60) return 'from-emerald-400 to-emerald-500';
    if (patiencePercent > 35) return 'from-amber-400 to-amber-500';
    if (patiencePercent > 15) return 'from-orange-500 to-orange-600';
    return 'from-rose-500 to-red-600 animate-pulse';
  };

  const { styleTag, colorTag, occasionTag, budgetTag } = formatCustomerRequestTags(customer);
  const colorHex = COLOR_LABELS[customer.preferredColor]?.hex || '#F48FB1';

  return (
    <div className="w-full select-none space-y-1.5 animate-fade-in">
      {/* Special Role Alert Pill */}
      {customer.specialRole === 'influencer' && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F3E5F5] border border-[#E1BEE7] rounded-xl text-[10px] font-bold text-[#8E24AA] shadow-2xs">
          <Camera className="w-3.5 h-3.5 shrink-0" />
          <span>KOL/TikToker — Đạt ≥90đ tiệm viral, 3 khách sau tip +20%!</span>
        </div>
      )}
      {customer.specialRole === 'reviewer' && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#E3F2FD] border border-[#BBDEFB] rounded-xl text-[10px] font-bold text-[#1E88E5] shadow-2xs">
          <Star className="w-3.5 h-3.5 shrink-0 fill-[#1E88E5]" />
          <span>Reviewer — Đánh giá ảnh hưởng lớn tới số sao của tiệm!</span>
        </div>
      )}
      {customer.specialRole === 'picky' && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FFF8E1] border border-[#FFE082] rounded-xl text-[10px] font-bold text-[#F57F17] shadow-2xs">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Khách khó tính — Cần ≥75 điểm mới mua (Tip x1.6)!</span>
        </div>
      )}
      {customer.specialRole === 'vip' && (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FFF8E7] border border-[#FFE082] rounded-xl text-[10px] font-bold text-[#B78119] shadow-2xs">
          <Crown className="w-3.5 h-3.5 shrink-0 fill-[#B78119]" />
          <span>Khách VIP Sang Chảnh — Ngân sách dồi dào, Tip x2.0!</span>
        </div>
      )}

      {/* Main Request Card */}
      <div
        onClick={onInspectCustomer}
        title="Bấm để xem chi tiết toàn bộ hồ sơ khách hàng"
        className="w-full bg-[#FFF8F4] border-2 border-[#F4C7D9] hover:border-[#D87C9B] rounded-2xl p-3 shadow-sm cursor-pointer active:scale-98 transition-all space-y-2"
      >
        {/* Row 1: Customer Name + Role Badge + Patience Timer Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-[#F2E1CF] pb-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-6 h-6 rounded-full bg-[#FFF0F5] border border-[#F4C7D9] flex items-center justify-center text-xs shrink-0">
              {customer.isVip || customer.specialRole === 'vip' ? '👑' : '🛍️'}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-[#3E3431] font-heading truncate">
                  {customer.name}
                </span>
                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md bg-[#F2E1CF]/80 text-[#6F554A] shrink-0">
                  {customer.typeLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Patience Bar */}
          <div className="flex items-center gap-1.5 shrink-0 bg-white px-2 py-1 rounded-full border border-[#F2E1CF]">
            <Clock className={`w-3.5 h-3.5 shrink-0 ${patiencePercent <= 20 ? 'text-rose-500 animate-spin' : 'text-[#8D6E63]'}`} />
            <div className="w-16 bg-[#F2E1CF]/70 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${getPatienceColor()} transition-all duration-300`}
                style={{ width: `${patiencePercent}%` }}
              />
            </div>
            <span className={`text-[10.5px] font-black tabular-nums ${patiencePercent <= 20 ? 'text-rose-600 animate-pulse' : 'text-[#3E3431]'}`}>
              {Math.ceil(customer.currentPatience)}s
            </span>
          </div>
        </div>

        {/* Row 2: Full Dialogue Speech Text (No Truncation) */}
        <div className="bg-white/90 p-2 rounded-xl border border-[#F2E1CF] text-xs font-bold text-[#6F554A] leading-relaxed text-wrap break-words">
          💬 "{customer.dialogue}"
        </div>

        {/* Row 3: All 4 Customer Requirements Tags */}
        <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5 pt-0.5 text-[10px] font-black">
          {/* 1. Phong cách */}
          <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-xl bg-[#FFF0F5] border border-[#F4C7D9] text-[#D87C9B] shadow-2xs">
            <span className="shrink-0">🌸</span>
            <span className="truncate">{styleTag}</span>
          </div>

          {/* 2. Màu sắc */}
          <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-xl bg-white border border-[#F4C7D9] text-[#3E3431] shadow-2xs">
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: colorHex }}
            />
            <span className="truncate">{colorTag}</span>
          </div>

          {/* 3. Dịp sử dụng */}
          <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-xl bg-white border border-[#F4C7D9] text-[#6F554A] shadow-2xs">
            <span className="shrink-0">🎈</span>
            <span className="truncate">{occasionTag}</span>
          </div>

          {/* 4. Ngân sách */}
          <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-xl bg-[#3E3431] text-white shadow-2xs tabular-nums">
            <span className="shrink-0">💰</span>
            <span className="truncate">{budgetTag}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
