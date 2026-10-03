import React from 'react';
import { OWNER_PORTRAIT, fixImagePath } from '../data/customers';
import { Sparkles, Star, Award, CheckCircle2, Crown } from 'lucide-react';
import { Product } from '../types/game';
import { STYLE_LABELS } from '../data/products';
import { ProductIcon } from './ProductIcon';

interface LevelUpModalProps {
  level: number;
  newProductsUnlocked: Product[];
  newStylesUnlocked: string[];
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  level,
  newProductsUnlocked,
  newStylesUnlocked,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#FFF8F4] to-[#FFF0F5] border-2 border-[#D9A441] rounded-3xl p-5 shadow-2xl select-none text-center animate-gentle-bounce">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3E0] border border-[#FFE082] text-xs font-black text-[#D9A441] mb-2 shadow-2xs">
          <Crown className="w-3.5 h-3.5 fill-[#D9A441]" />
          <span>CHÚC MỪNG LÊN CẤP!</span>
        </div>

        <h2 className="text-2xl font-black text-[#3E3431] font-heading uppercase leading-tight mb-1">
          CÔ CHỦ NHƯ ĐẠT
        </h2>
        <div className="text-3xl font-black text-[#D87C9B] font-heading tracking-wider mb-3">
          CẤP ĐỘ {level}
        </div>

        {/* Mascot Visual */}
        <div className="relative w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#D9A441] via-[#F4C7D9] to-white shadow-lg mb-4">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
            <img
              src={fixImagePath(OWNER_PORTRAIT)}
              alt="Cô Chủ Như"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#D9A441] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-black shadow-xs">
            ⭐
          </div>
        </div>

        {/* Unlocked Highlights Box */}
        <div className="bg-white/90 rounded-2xl p-3 border border-[#F2E1CF] shadow-2xs mb-4 text-left space-y-2">
          <div className="text-[11px] font-bold text-[#6F554A] flex items-center gap-1 border-b border-[#F2E1CF]/70 pb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Phần Thưởng Mở Khóa Cấp {level}:</span>
          </div>

          {/* New styles */}
          {newStylesUnlocked.length > 0 && (
            <div className="text-[11px]">
              <span className="text-[#8D6E63] font-medium">✨ Phong cách mới: </span>
              <span className="font-extrabold text-[#D87C9B]">
                {newStylesUnlocked.map((s) => STYLE_LABELS[s] || s).join(', ')}
              </span>
            </div>
          )}

          {/* New clothes */}
          {newProductsUnlocked.length > 0 ? (
            <div>
              <span className="text-[11px] text-[#8D6E63] font-medium block mb-1">
                👗 Trang phục mới mở khóa ({newProductsUnlocked.length}):
              </span>
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto no-scrollbar">
                {newProductsUnlocked.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#FFF0F5] border border-[#F4C7D9] text-[#6F554A] px-2 py-1 rounded-lg"
                  >
                    <ProductIcon product={p} size={16} />
                    <span className="truncate max-w-[90px]">{p.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-[#6F554A] italic">
              Tiệm nâng cao uy tín, khách hàng ghé thăm ngày càng đông đúc hơn!
            </p>
          )}
        </div>

        {/* Claim Button */}
        <button
          onClick={onClose}
          className="w-full h-11 rounded-2xl bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-xs font-black shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>TUYỆT QUÁ, TIẾP TỤC!</span>
        </button>
      </div>
    </div>
  );
};
