import React from 'react';
import { Customer, DecorItem, OwnerState } from '../types/game';
import { OWNER_PORTRAIT, SHOP_INTERIOR, formatCustomerRequestTags } from '../data/customers';
import { Sparkles, Crown, Users, Moon, Sun, Play } from 'lucide-react';

interface ShopAreaProps {
  currentCustomer: Customer | null;
  waitingQueue: Customer[];
  ownerState: OwnerState;
  equippedDecors?: DecorItem[];
  isShopOpen?: boolean;
  ownerAvatar?: string;
  onCustomerClick: () => void;
  onOwnerClick: () => void;
  onOpenShop?: () => void;
}

export const ShopArea: React.FC<ShopAreaProps> = ({
  currentCustomer,
  waitingQueue,
  ownerState,
  equippedDecors = [],
  isShopOpen = true,
  ownerAvatar = OWNER_PORTRAIT,
  onCustomerClick,
  onOwnerClick,
  onOpenShop,
}) => {
  const getOwnerDialogue = () => {
    if (!isShopOpen) {
      return 'Tiệm đã đóng cửa nghỉ ngơi. Nhập thêm hàng rồi mở ngày mới nha! 🌙';
    }
    switch (ownerState) {
      case 'greet':
        return 'Dạ Như chào bạn! Cứ thong thả ngắm đồ nha~ ✨';
      case 'help':
        return 'Để Như gợi ý set đồ chuẩn gu nhất cho bạn!';
      case 'happy':
        return 'Oa, bộ này bạn diện lên tôn dáng xỉu luôn á! 🥰';
      case 'celebrate':
        return 'Cảm ơn bạn yêu! Nhớ ghé ủng hộ Như tiếp nha~ 🎉';
      case 'tired':
        return 'Phù, tiệm hôm nay đông vui quá chừng!';
      default:
        return 'Chào mừng bạn đến với Tiệm Thời Trang Như! 🌸';
    }
  };

  return (
    <div className="relative w-full h-[165px] sm:h-[190px] overflow-hidden rounded-2xl border border-[#F2E1CF] shadow-xs select-none shrink-0">
      {/* Background image & warm overlay */}
      <img
        src={SHOP_INTERIOR}
        alt="Boutique Shop"
        className={`absolute inset-0 w-full h-full object-cover object-center filter transition-all ${
          isShopOpen ? 'brightness-[0.97]' : 'brightness-[0.75] contrast-[0.9]'
        }`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = 'none';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFF7F1]/95 via-[#FFF7F1]/40 to-transparent pointer-events-none" />

      {/* Equipped Visual Decors Overlay */}
      {equippedDecors.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
          {equippedDecors.map((dec) => {
            if (dec.id === 'decor-monstera') {
              return (
                <div key={dec.id} className="absolute bottom-2 left-1 text-2xl drop-shadow-sm filter">
                  🪴
                </div>
              );
            }
            if (dec.id === 'decor-neon-sign') {
              return (
                <div key={dec.id} className="absolute top-2 right-2 bg-pink-500/80 text-white font-extrabold text-[8px] px-2 py-0.5 rounded-full border border-pink-300 shadow-sm animate-pulse">
                  💖 Nhu Boutique
                </div>
              );
            }
            if (dec.id === 'decor-crystal-lamp') {
              return (
                <div key={dec.id} className="absolute top-1 left-1/2 -translate-x-1/2 text-2xl filter drop-shadow-md">
                  🏮
                </div>
              );
            }
            if (dec.id === 'decor-tulip-vase') {
              return (
                <div key={dec.id} className="absolute bottom-3 left-20 text-xl filter drop-shadow-xs">
                  🌷
                </div>
              );
            }
            if (dec.id === 'decor-gold-mirror') {
              return (
                <div key={dec.id} className="absolute top-8 right-2 text-2xl filter drop-shadow-xs">
                  🪞
                </div>
              );
            }
            if (dec.id === 'decor-gold-mannequin') {
              return (
                <div key={dec.id} className="absolute bottom-2 right-20 text-2xl filter drop-shadow-xs">
                  👸
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Floating Waiting Queue (Top Left) */}
      {isShopOpen && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-full border border-[#F2E1CF] shadow-xs">
          <Users className="w-3.5 h-3.5 text-[#D87C9B]" />
          <span className="text-[10px] font-bold text-[#6F554A]">Hàng chờ:</span>
          <div className="flex items-center -space-x-1.5">
            {waitingQueue.length > 0 ? (
              waitingQueue.map((cust) => (
                <div
                  key={cust.id}
                  className="w-5 h-5 rounded-full border border-white overflow-hidden bg-[#F4C7D9] relative"
                  title={`${cust.name} (${cust.typeLabel})`}
                >
                  <img
                    src={cust.avatar}
                    alt={cust.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {cust.isVip && (
                    <span className="absolute -top-0.5 -right-0.5 text-[7px] text-[#D9A441]">👑</span>
                  )}
                </div>
              ))
            ) : (
              <span className="text-[9px] text-[#8D6E63] italic pl-1">Trống</span>
            )}
          </div>
        </div>
      )}

      {/* Characters Stage Container */}
      <div className="relative z-10 w-full h-full flex items-end justify-between px-3 pb-2 pt-6">
        {/* Cô Chủ Như (Shop Owner) - Left Side */}
        <div
          onClick={onOwnerClick}
          className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform shrink-0"
        >
          {/* Owner Speech Bubble */}
          <div className="mb-1 bg-white/95 text-[#6F554A] text-[9.5px] font-semibold px-2 py-0.5 rounded-lg border border-[#F4C7D9] shadow-xs max-w-[140px] text-center leading-snug animate-gentle-bounce">
            {getOwnerDialogue()}
          </div>

          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#D87C9B] bg-[#FFF8F4] overflow-hidden shadow-md group-hover:border-[#F4C7D9] transition-colors">
            <img
              src={ownerAvatar}
              alt="Cô Chủ Như"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#D87C9B]/90 text-white text-[8px] font-bold text-center py-0.5 leading-none">
              Cô Chủ Như
            </div>
          </div>
        </div>

        {/* Right Side: Active Customer Avatar & Request Bubble (Symmetrical to Owner) */}
        {isShopOpen ? (
          currentCustomer ? (
            <div
              onClick={onCustomerClick}
              className="flex flex-col items-center cursor-pointer group active:scale-95 transition-transform animate-float-chibi shrink-0"
            >
              {/* Customer Request Speech Bubble Above Head */}
              <div className="mb-1 bg-white/95 text-[#6F554A] text-[9.5px] font-semibold px-2 py-1 rounded-xl border border-[#F4C7D9] shadow-xs max-w-[165px] text-center leading-snug animate-gentle-bounce flex flex-col items-center gap-0.5">
                <div className="text-[9px] font-black text-[#D87C9B] w-full break-words">
                  💬 "{currentCustomer.dialogue}"
                </div>
                <div className="flex items-center justify-center gap-1 text-[8.5px] font-extrabold text-[#3E3431] flex-wrap">
                  <span className="text-[#D87C9B] bg-[#FFF0F5] px-1.5 py-0.2 rounded-md border border-[#F4C7D9]">
                    {formatCustomerRequestTags(currentCustomer).styleTag}
                  </span>
                  <span className="bg-[#3E3431] text-white px-1.5 py-0.2 rounded-md tabular-nums">
                    {formatCustomerRequestTags(currentCustomer).budgetTag}
                  </span>
                </div>
              </div>

              {/* Customer Avatar Circle (Matching Owner Icon Layout) */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#F4C7D9] bg-[#FFF8F4] overflow-hidden shadow-md group-hover:border-[#D87C9B] transition-colors">
                <img
                  src={currentCustomer.avatar}
                  alt={currentCustomer.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                {(currentCustomer.isVip || currentCustomer.specialRole === 'vip') && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-[#D9A441] text-white rounded-full flex items-center justify-center text-[9px] shadow-xs z-10" title="Khách VIP">
                    👑
                  </div>
                )}
                {currentCustomer.specialRole === 'influencer' && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-[#8E24AA] text-white rounded-full flex items-center justify-center text-[9px] shadow-xs z-10" title="Influencer">
                    📸
                  </div>
                )}
                {currentCustomer.specialRole === 'reviewer' && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-[#1E88E5] text-white rounded-full flex items-center justify-center text-[9px] shadow-xs z-10" title="Reviewer">
                    ⭐
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-[#3E3431]/90 text-white text-[8px] font-bold text-center py-0.5 leading-none truncate px-1">
                  {currentCustomer.name}
                </div>
              </div>
            </div>
          ) : (
            /* Waiting Customer Placeholder Symmetrical Avatar */
            <div className="flex flex-col items-center shrink-0">
              <div className="mb-1 bg-white/90 text-[#8D6E63] text-[9.5px] font-medium px-2 py-0.5 rounded-lg border border-dashed border-[#F4C7D9] shadow-xs max-w-[145px] text-center leading-snug animate-pulse">
                Đang đón khách mới... ✨
              </div>
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-dashed border-[#F4C7D9] bg-white/60 flex items-center justify-center text-2xl shadow-xs">
                🛍️
                <div className="absolute bottom-0 inset-x-0 bg-[#8D6E63]/70 text-white text-[8px] font-bold text-center py-0.5 leading-none">
                  Khách Mới
                </div>
              </div>
            </div>
          )
        ) : (
          /* Shop Closed Call to Action */
          <div className="flex flex-col items-center justify-center p-2.5 bg-white/95 rounded-2xl border-2 border-[#D87C9B] text-center shadow-lg animate-soft-pulse max-w-[150px] shrink-0">
            <div className="flex items-center gap-1 text-[10.5px] font-black text-[#6F554A] mb-0.5">
              <Moon className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>Tiệm Đang Đóng Cửa</span>
            </div>
            <p className="text-[8.5px] text-[#8D6E63] mb-1.5 leading-tight">
              Nhập hàng & nâng cấp trước khi mở ngày mới!
            </p>
            {onOpenShop && (
              <button
                onClick={onOpenShop}
                className="w-full h-7 rounded-xl bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-[10px] font-extrabold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <Sun className="w-3 h-3" />
                <span>Mở Cửa Ngay</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


