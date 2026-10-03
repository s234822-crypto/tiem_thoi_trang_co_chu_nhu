import React from 'react';
import { Customer } from '../types/game';
import { COLOR_LABELS } from '../data/products';
import { formatCustomerRequestTags } from '../data/customers';
import { Clock, Camera, Star, AlertTriangle, Crown } from 'lucide-react';

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
    <div className="w-full select-none space-y-1.5">
      {/* Special Role Alert — compact single-line pill */}
      {customer.specialRole === 'influencer' && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F3E5F5] border border-[#E1BEE7] rounded-xl text-[10px] font-bold text-[#8E24AA]">
          <Camera className="w-3 h-3 shrink-0" />
          <span>KOL/TikToker — Đạt ≥90đ tiệm viral, 3 khách sau tip +20%!</span>
        </div>
      )}
      {customer.specialRole === 'reviewer' && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E3F2FD] border border-[#BBDEFB] rounded-xl text-[10px] font-bold text-[#1E88E5]">
          <Star className="w-3 h-3 shrink-0 fill-[#1E88E5]" />
          <span>Reviewer — Đánh giá ảnh hưởng lớn tới số sao của tiệm!</span>
        </div>
      )}
      {customer.specialRole === 'picky' && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFF8E1] border border-[#FFE082] rounded-xl text-[10px] font-bold text-[#F57F17]">
          <AlertTriangle className="w-3 h-3 shrink-0" />
          <span>Khách khó tính — Cần ≥75 điểm mới mua (Tip x1.6)!</span>
        </div>
      )}
      {customer.specialRole === 'vip' && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFF8E7] border border-[#FFE082] rounded-xl text-[10px] font-bold text-[#B78119]">
          <Crown className="w-3 h-3 shrink-0 fill-[#B78119]" />
          <span>Khách VIP Sang Chảnh — Ngân sách dồi dào, Tip x2.0!</span>
        </div>
      )}

      {/* Compact patience bar + request tags in one card */}
      <div
        onClick={onInspectCustomer}
        title="Bấm để xem chi tiết toàn bộ yêu cầu của khách hàng"
        className="w-full bg-[#FFF8F4] border border-[#F2E1CF] hover:border-[#D87C9B] rounded-2xl px-3 py-2 shadow-xs cursor-pointer active:scale-98 transition-all"
      >
        {/* Patience row */}
        <div className="flex items-center gap-2 mb-1.5">
          <Clock className={`w-3.5 h-3.5 shrink-0 ${patiencePercent <= 20 ? 'text-rose-500 animate-spin' : 'text-[#8D6E63]'}`} />
          <div className="flex-1 bg-[#F2E1CF]/70 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getPatienceColor()} transition-all duration-300`}
              style={{ width: `${patiencePercent}%` }}
            />
          </div>
          <span className={`text-[11px] font-black tabular-nums shrink-0 ${patiencePercent <= 20 ? 'text-rose-600 animate-pulse' : 'text-[#3E3431]'}`}>
            {Math.ceil(customer.currentPatience)}s
          </span>
        </div>

        {/* Request tags row — all on one line */}
        <div className="flex items-center gap-1.5 flex-wrap font-extrabold text-[10.5px]">
          <span className="px-2 py-0.5 rounded-lg bg-[#FFF0F5] border border-[#D87C9B] text-[#D87C9B] shadow-2xs">
            {styleTag}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-[#F4C7D9] text-[#3E3431] shadow-2xs">
            <span
              className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: colorHex }}
            />
            {colorTag}
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-white border border-[#F4C7D9] text-[#6F554A] shadow-2xs">
            {occasionTag}
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-[#3E3431] text-white shadow-2xs ml-auto tabular-nums">
            {budgetTag}
          </span>
        </div>
      </div>
    </div>
  );
};
