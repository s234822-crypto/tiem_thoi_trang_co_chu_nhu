import React from 'react';
import { OWNER_PORTRAIT_DEFAULT } from '../data/skins';
import { Sparkles, Play, BookOpen, Star, Heart } from 'lucide-react';

interface StartScreenProps {
  onStartGame: () => void;
  onOpenGuide: () => void;
  hasSavedGame: boolean;
  equippedAvatar?: string;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStartGame,
  onOpenGuide,
  hasSavedGame,
  equippedAvatar = OWNER_PORTRAIT_DEFAULT,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#FFF8F4] via-[#FFEFEF] to-[#FCE4EC] text-center select-none overflow-hidden">
      {/* Decorative floating pastel stars */}
      <div className="absolute top-8 left-6 text-xl text-[#F4C7D9] animate-gentle-bounce">✨</div>
      <div className="absolute top-20 right-8 text-2xl text-[#F4C7D9] animate-gentle-bounce" style={{ animationDelay: '0.7s' }}>🌸</div>
      <div className="absolute bottom-28 left-8 text-lg text-[#F4C7D9] animate-gentle-bounce" style={{ animationDelay: '1.2s' }}>🎀</div>
      <div className="absolute bottom-36 right-7 text-xl text-[#F4C7D9] animate-gentle-bounce" style={{ animationDelay: '0.4s' }}>✨</div>

      {/* Title & Tagline */}
      <div className="pt-5 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#F4C7D9] shadow-xs mb-2.5 text-[11px] font-bold text-[#D87C9B]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mobile Fashion Boutique Game</span>
        </div>

        <h1 className="text-2xl xs:text-3xl font-black text-[#3E3431] font-heading tracking-wide uppercase leading-tight mb-1.5">
          Tiệm Thời Trang<br />
          <span className="text-[#D87C9B]">Cô Chủ Như</span>
        </h1>

        <p className="text-xs text-[#6F554A] font-medium italic">
          “Phong cách của bạn, câu chuyện của bạn.”
        </p>
      </div>

      {/* Main Chibi Mascot Visual */}
      <div className="my-auto relative flex flex-col items-center justify-center z-10">
        <div className="relative w-40 h-40 xs:w-44 xs:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#D87C9B] via-[#F4C7D9] to-white shadow-xl animate-float-chibi">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-[#FFF8F4]">
            <img
              src={equippedAvatar}
              alt="Cô Chủ Như"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="absolute -bottom-2 bg-white px-3 py-1 rounded-full border border-[#F4C7D9] shadow-md flex items-center gap-1 text-[11px] font-black text-[#3E3431]">
            <Star className="w-3 h-3 text-[#D9A441] fill-[#D9A441]" />
            <span>Cô Chủ Như</span>
          </div>
        </div>

        <div className="mt-4 text-[11.5px] text-[#8D6E63] font-medium max-w-[260px] leading-relaxed">
          Đón những vị khách đáng yêu, tư vấn phong cách sành điệu và phát triển tiệm thời trang trong mơ!
        </div>
      </div>

      {/* Action Buttons & Version */}
      <div className="space-y-2.5 w-full max-w-xs mx-auto z-10 pb-2">
        <button
          onClick={onStartGame}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-sm font-extrabold shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{hasSavedGame ? 'TIẾP TỤC CHƠI' : 'VÀO GAME'}</span>
        </button>

        <button
          onClick={onOpenGuide}
          className="w-full h-11 rounded-2xl bg-white/90 hover:bg-white text-[#6F554A] border border-[#F2E1CF] hover:border-[#D87C9B] text-xs font-bold shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#D87C9B]" />
          <span>HƯỚNG DẪN</span>
        </button>

        <div className="text-[10px] text-[#8D6E63] font-semibold tracking-wider pt-1">
          Phiên bản 1.0.0 · AI Studio Build
        </div>
      </div>
    </div>
  );
};
