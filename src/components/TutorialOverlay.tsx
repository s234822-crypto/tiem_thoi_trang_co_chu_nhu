import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, FastForward, Heart, HelpCircle, Tag, Eye, Shirt, DollarSign } from 'lucide-react';
import { playTapSound, playSuccessFanfare } from '../utils/audio';

interface TutorialOverlayProps {
  onCompleteTutorial: () => void;
}

interface PracticalStep {
  step: number;
  title: string;
  desc: string;
  icon: string;
  tip: string;
}

const PRACTICAL_STEPS: PracticalStep[] = [
  {
    step: 1,
    title: '1. Đọc nhanh yêu cầu khách',
    desc: 'Mỗi vị khách vào tiệm đều có thẻ yêu cầu ngắn gọn: Style • Màu • Dịp • Ngân sách. Hãy liếc nhanh các tiêu chí này nhé!',
    icon: '🏷️',
    tip: 'Ví dụ: Casual • Pink • Coffee • ≤500K',
  },
  {
    step: 2,
    title: '2. Sử dụng Tab "Gợi Ý"',
    desc: 'Tiệm đã tự động chọn sẵn 3–6 món đồ hợp phong cách và vừa túi tiền nhất của khách trong tab "Gợi ý" ⭐.',
    icon: '⭐',
    tip: 'Bạn có thể chọn đồ từ gợi ý hoặc tự do khám phá các danh mục khác!',
  },
  {
    step: 3,
    title: '3. Phối đồ 1 chạm cực nhanh',
    desc: 'Chạm 1 lần để mặc món đồ. Nếu chọn Đầm liền, tiệm sẽ tự động bỏ Áo + Quần/Váy để tránh xung đột.',
    icon: '👗',
    tip: 'Thanh gợi ý bên dưới sẽ báo ngay: ✓ Hợp phong cách, ✓ Trong ngân sách.',
  },
  {
    step: 4,
    title: '4. Bấm "CHO KHÁCH THỬ"',
    desc: 'Khi bộ đồ đã đủ (Áo + Quần/Váy hoặc Đầm), nút "CHO KHÁCH THỬ" ở cuối màn hình sẽ sáng lên để bạn bấm 1 chạm.',
    icon: '🪞',
    tip: 'Khách sẽ chấm điểm dựa trên độ hợp gu, phối màu và ngân sách!',
  },
  {
    step: 5,
    title: '5. Thu tiền & đón khách tiếp',
    desc: 'Sau khi khách thử xong, tiền và EXP tự cộng vào quỹ tiệm. Khách mới sẽ tự động bước vào ngay lập tức!',
    icon: '🎉',
    tip: 'Một ngày chơi kéo dài khoảng 3–5 phút. Chúc bạn mở tiệm đông khách!',
  },
];

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onCompleteTutorial }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const stepData = PRACTICAL_STEPS[currentStepIndex];
  const isLast = currentStepIndex === PRACTICAL_STEPS.length - 1;

  const handleNext = () => {
    playTapSound();
    if (isLast) {
      playSuccessFanfare();
      onCompleteTutorial();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    playTapSound();
    onCompleteTutorial();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-2xs p-4 animate-fade-in select-none">
      <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F4] border-2 border-[#D87C9B] shadow-2xl p-4 flex flex-col animate-gentle-bounce">
        {/* Header Ribbon with Skip Button (Requirement 18) */}
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#F2E1CF]">
          <div className="flex items-center gap-1.5 text-[#D87C9B]">
            <HelpCircle className="w-4 h-4" />
            <span className="text-[11px] font-black tracking-wide uppercase">
              HƯỚNG DẪN THỰC CHIẾN ({stepData.step}/{PRACTICAL_STEPS.length})
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1 text-[10.5px] font-bold text-[#8D6E63] hover:text-[#3E3431] px-2 py-0.5 rounded-full bg-white border border-[#F2E1CF] active:scale-95 transition-all shadow-2xs"
          >
            <span>BỎ QUA HƯỚNG DẪN</span>
            <FastForward className="w-3 h-3" />
          </button>
        </div>

        {/* Step Visual & Content */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#F2E1CF] shadow-xs mb-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] border border-[#F4C7D9] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
            {stepData.icon}
          </div>
          <div>
            <h3 className="text-xs font-black text-[#3E3431] font-heading leading-tight mb-1">
              {stepData.title}
            </h3>
            <p className="text-[11px] text-[#6F554A] leading-relaxed">
              {stepData.desc}
            </p>
          </div>
        </div>

        {/* Practical Pro Tip Box */}
        <div className="bg-[#FFF9E6] border border-[#FFE082] rounded-xl p-2.5 mb-3 text-[10.5px] text-[#B78119] flex items-center gap-2">
          <span className="text-base">💡</span>
          <span className="font-bold">{stepData.tip}</span>
        </div>

        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          {PRACTICAL_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'w-6 bg-[#D87C9B]'
                  : idx < currentStepIndex
                  ? 'w-2 bg-[#D87C9B]/50'
                  : 'w-2 bg-[#F2E1CF]'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full h-11 rounded-2xl bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] hover:from-[#c96c8a] hover:to-[#b65b79] text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-1.5 active:scale-98 transition-all"
        >
          <span>{isLast ? 'BẮT ĐẦU MỞ TIỆM NGAY' : 'BƯỚC TIẾP THEO'}</span>
          {isLast ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
