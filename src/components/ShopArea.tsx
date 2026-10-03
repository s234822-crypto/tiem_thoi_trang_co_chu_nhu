import React from 'react';
import { Customer, DecorItem, OwnerState } from '../types/game';
import { OWNER_PORTRAIT, OWNER_FULLBODY, SHOP_INTERIOR, formatCustomerRequestTags, fixImagePath, getCustomerFullBodyAvatar } from '../data/customers';
import { Sparkles, Crown, Users, Moon, Sun, Play } from 'lucide-react';

interface ShopAreaProps {
  currentCustomer: Customer | null;
  waitingQueue: Customer[];
  ownerState: OwnerState;
  equippedDecors?: DecorItem[];
  isShopOpen?: boolean;
  ownerAvatar?: string;
  customerAnimState?: 'entering' | 'arrived' | 'exiting';
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
  customerAnimState = 'arrived',
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

  const getCustomerShortGreeting = (cust: Customer) => {
    if (cust.isVip || cust.specialRole === 'vip') {
      return 'Chào Như! Phối giúp mình set đồ sang xịn mịn nha~ 👑';
    }
    if (cust.specialRole === 'influencer') {
      return 'Hi Như! Mình cần set đồ đẹp để quay video OOTD nè! 📸';
    }
    if (cust.specialRole === 'reviewer') {
      return 'Chào Như! Mình ghé tiệm xem gợi ý outfit hôm nay nhé! ⭐';
    }
    switch (cust.type) {
      case 'student':
        return 'Chào Như! Chọn giúp mình set đồ xinh xắn nha~ ✨';
      case 'office':
        return 'Chào Như! Mình muốn nhờ bạn tư vấn outfit thanh lịch nhé! 💼';
      default:
        return 'Chào Như, mình muốn nhờ bạn phối đồ nhé! 🌸';
    }
  };

  return (
    <div className="relative w-full h-[210px] sm:h-[235px] overflow-hidden rounded-3xl border-2 border-[#F2E1CF] shadow-md select-none shrink-0 bg-[#FFF7F1]">
      {/* Background image & warm overlay */}
      <img
        src={fixImagePath(SHOP_INTERIOR)}
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
                <div key={dec.id} className="absolute bottom-3 left-24 text-xl filter drop-shadow-xs">
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
                <div key={dec.id} className="absolute bottom-2 right-24 text-2xl filter drop-shadow-xs">
                  👸
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Floating Waiting Queue (Top Center to prevent overlap with characters) */}
      {isShopOpen && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#F4C7D9] shadow-sm">
          <Users className="w-3.5 h-3.5 text-[#D87C9B]" />
          <span className="text-[10px] font-bold text-[#6F554A]">Hàng chờ:</span>
          <div className="flex items-center -space-x-1.5">
            {waitingQueue.length > 0 ? (
              waitingQueue.map((cust) => (
                <div
                  key={cust.id}
                  className="w-5 h-5 rounded-full border border-white overflow-hidden bg-[#F4C7D9] relative shadow-2xs"
                  title={`${cust.name} (${cust.typeLabel})`}
                >
                  <img
                    src={fixImagePath(cust.avatar)}
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
      <div className="relative z-10 w-full h-full flex items-end justify-between px-3 sm:px-5 pb-2 pt-8">
        {/* Cô Chủ Như (Shop Owner) - Full Body Character */}
        <div
          onClick={onOwnerClick}
          className="relative flex flex-col items-center cursor-pointer group shrink-0 h-[145px] sm:h-[165px] justify-end"
          title="Bấm để đổi trang phục Cô Chủ Như"
        >
          {/* Owner Speech Bubble */}
          <div className="absolute -top-7 sm:-top-8 z-20 bg-white/95 text-[#6F554A] text-[9.5px] font-bold px-2 py-0.5 rounded-xl border border-[#F4C7D9] shadow-sm max-w-[130px] sm:max-w-[150px] text-center leading-snug animate-gentle-bounce">
            {getOwnerDialogue()}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#F4C7D9] rotate-45" />
          </div>

          {/* Full Body Standing Image */}
          <div className="relative h-full w-auto flex items-end justify-center">
            <img
              src={fixImagePath(OWNER_FULLBODY)}
              alt="Cô Chủ Như"
              className="h-[130px] sm:h-[150px] w-auto object-contain object-bottom filter drop-shadow-md transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = fixImagePath(ownerAvatar);
              }}
            />
            {/* Soft Floor Shadow Base */}
            <div className="absolute -bottom-1 w-14 h-3 bg-black/25 rounded-full blur-[3px] pointer-events-none z-0" />
          </div>

          {/* Name Badge */}
          <div className="z-10 bg-[#D87C9B] text-white text-[8.5px] font-black px-2 py-0.5 rounded-full shadow-xs border border-white/80 -mt-1 flex items-center gap-0.5">
            <span>🌸 Cô Chủ Như</span>
          </div>
        </div>

        {/* Right Side: Active Customer Full Body Character */}
        {isShopOpen ? (
          currentCustomer ? (
            <div
              onClick={onCustomerClick}
              className={`relative flex flex-col items-center cursor-pointer group shrink-0 h-[145px] sm:h-[165px] justify-end ${
                customerAnimState === 'entering'
                  ? 'animate-customer-walk-in'
                  : customerAnimState === 'exiting'
                  ? 'animate-customer-walk-out'
                  : 'animate-float-chibi active:scale-95 transition-transform'
              }`}
              title={`Bấm để xem chi tiết ${currentCustomer.name}`}
            >
              {/* Customer Short Greeting Speech Bubble Above Head */}
              {customerAnimState === 'arrived' && (
                <div className="absolute -top-7 sm:-top-8 z-20 bg-white/95 text-[#6F554A] text-[9.5px] font-bold px-2 py-0.5 rounded-xl border border-[#F4C7D9] shadow-sm max-w-[130px] sm:max-w-[150px] text-center leading-snug animate-gentle-bounce">
                  <span>{getCustomerShortGreeting(currentCustomer)}</span>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-[#F4C7D9] rotate-45" />
                </div>
              )}

              {/* Customer Full Body Standing Image */}
              <div className="relative h-full w-auto flex items-end justify-center">
                <img
                  src={getCustomerFullBodyAvatar(currentCustomer)}
                  alt={currentCustomer.name}
                  className="h-[130px] sm:h-[150px] w-auto object-contain object-bottom filter drop-shadow-md transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fixImagePath(currentCustomer.avatar);
                  }}
                />
                {/* Soft Floor Shadow Base */}
                <div className="absolute -bottom-1 w-14 h-3 bg-black/25 rounded-full blur-[3px] pointer-events-none z-0" />

                {/* Role Icon Badge */}
                {(currentCustomer.isVip || currentCustomer.specialRole === 'vip') && (
                  <div className="absolute top-1 right-0 w-5 h-5 bg-[#D9A441] text-white rounded-full flex items-center justify-center text-[10px] shadow-sm z-10 animate-bounce" title="Khách VIP">
                    👑
                  </div>
                )}
                {currentCustomer.specialRole === 'influencer' && (
                  <div className="absolute top-1 right-0 w-5 h-5 bg-[#8E24AA] text-white rounded-full flex items-center justify-center text-[10px] shadow-sm z-10 animate-pulse" title="Influencer">
                    📸
                  </div>
                )}
                {currentCustomer.specialRole === 'reviewer' && (
                  <div className="absolute top-1 right-0 w-5 h-5 bg-[#1E88E5] text-white rounded-full flex items-center justify-center text-[10px] shadow-sm z-10 animate-pulse" title="Reviewer">
                    ⭐
                  </div>
                )}
              </div>

              {/* Customer Name Tag Pill */}
              <div className="z-10 bg-[#3E3431]/90 text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-white/40 -mt-1 max-w-[120px] truncate">
                {currentCustomer.name}
              </div>
            </div>
          ) : (
            /* Door Entrance Spot when waiting for customer */
            <div className="flex flex-col items-center justify-end shrink-0 h-[145px] sm:h-[165px] animate-pulse">
              <div className="mb-1 bg-white/90 text-[#8D6E63] text-[9.5px] font-bold px-2 py-1 rounded-xl border border-dashed border-[#F4C7D9] shadow-xs text-center">
                🚪 Cửa đón khách mới...
              </div>
              <div className="text-4xl opacity-80 filter drop-shadow-sm pb-2">
                🛍️
              </div>
            </div>
          )
        ) : (
          /* Shop Closed Call to Action */
          <div className="flex flex-col items-center justify-center p-3 bg-white/95 rounded-2xl border-2 border-[#D87C9B] text-center shadow-lg animate-soft-pulse max-w-[150px] shrink-0 mb-2">
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
                className="w-full h-7 rounded-xl bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-[10px] font-extrabold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
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



