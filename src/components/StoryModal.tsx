import React, { useState } from 'react';
import { StoryChapter, StoryCharacterState } from '../types/game';
import { OWNER_PORTRAIT_DEFAULT } from '../data/skins';
import { Sparkles, ArrowRight, Check, FastForward, Heart, BookOpen } from 'lucide-react';
import { playTapSound, playChimeSound, playSuccessFanfare } from '../utils/audio';

interface StoryModalProps {
  chapter: StoryChapter;
  onFinishChapter: (chapterId: string) => void;
  onClose: () => void;
  characterAvatar?: string;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  chapter,
  onFinishChapter,
  onClose,
  characterAvatar = OWNER_PORTRAIT_DEFAULT,
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);

  const currentScene = chapter.scenes[sceneIndex] || chapter.scenes[0];
  const isLastScene = sceneIndex === chapter.scenes.length - 1;

  const handleNext = () => {
    playTapSound();
    if (isLastScene) {
      playSuccessFanfare();
      onFinishChapter(chapter.id);
    } else {
      setSceneIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    playTapSound();
    onFinishChapter(chapter.id);
  };

  const getEmotionBadge = (state: StoryCharacterState) => {
    switch (state) {
      case 'happy':
        return '🥰 Vui vẻ';
      case 'celebrate':
        return '🎉 Rạng rỡ';
      case 'surprised':
        return '😲 Ngạc nhiên';
      case 'thinking':
        return '💭 Tâm sự';
      default:
        return '🌸 Bình yên';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-2xs p-4 animate-fade-in select-none">
      <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F4] border-2 border-[#F4C7D9] shadow-2xl flex flex-col overflow-hidden animate-gentle-bounce">
        {/* Chapter Header Ribbon */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-[#FFF0F5] to-[#FCE4EC] border-b border-[#F2E1CF] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#D87C9B]">
            <BookOpen className="w-4 h-4" />
            <span className="text-[11px] font-black tracking-wider uppercase">
              CHƯƠNG {chapter.number}
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1 text-[10.5px] font-bold text-[#8D6E63] hover:text-[#3E3431] px-2 py-0.5 rounded-full bg-white/80 border border-[#F2E1CF] active:scale-95 transition-all"
            title="Bỏ qua phân cảnh"
          >
            <span>Bỏ qua</span>
            <FastForward className="w-3 h-3" />
          </button>
        </div>

        {/* Story Body */}
        <div className="p-4 space-y-3.5">
          {/* Chapter Title & Subtitle */}
          <div className="text-center">
            <h2 className="text-sm font-black text-[#3E3431] font-heading">
              {chapter.title}
            </h2>
            <p className="text-[10px] text-[#8D6E63] italic">
              {chapter.subtitle}
            </p>
          </div>

          {/* Character Stage & Dialogue Card */}
          <div className="flex flex-col items-center">
            {/* Character Avatar with Animation */}
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-full border-3 border-[#D87C9B] bg-[#FFF8F4] overflow-hidden shadow-md">
                <img
                  src={characterAvatar}
                  alt={currentScene.speaker}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* State Badge */}
              <div className="absolute -bottom-1 inset-x-0 flex justify-center">
                <span className="bg-[#3E3431]/90 text-white text-[9px] font-bold px-2 py-0.2 rounded-full border border-[#F4C7D9]/50 shadow-xs">
                  {getEmotionBadge(currentScene.characterState)}
                </span>
              </div>
            </div>

            {/* Speaker Name Tag */}
            <div className="text-xs font-black text-[#D87C9B] flex items-center gap-1 mb-1">
              <Sparkles className="w-3 h-3" />
              <span>{currentScene.speaker}</span>
            </div>

            {/* Dialogue Bubble */}
            <div className="w-full bg-white/95 rounded-2xl p-3.5 border border-[#F4C7D9] shadow-xs relative">
              <p className="text-[11.5px] text-[#3E3431] leading-relaxed italic font-medium min-h-[56px]">
                “{currentScene.text}”
              </p>

              {/* Scene progress dots */}
              <div className="flex items-center justify-center gap-1 mt-2">
                {chapter.scenes.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === sceneIndex
                        ? 'w-4 bg-[#D87C9B]'
                        : 'w-1.5 bg-[#F2E1CF]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Milestone Rewards Preview */}
          {(chapter.rewardMoney || chapter.rewardExp) && (
            <div className="flex items-center justify-center gap-3 py-1 px-2.5 rounded-xl bg-[#FFF0F5] border border-[#F4C7D9]/70 text-[10px] font-bold text-[#D87C9B]">
              <span>Phần thưởng mốc:</span>
              {chapter.rewardMoney && (
                <span>+{chapter.rewardMoney.toLocaleString('vi-VN')}đ</span>
              )}
              {chapter.rewardExp && (
                <span>+{chapter.rewardExp} EXP</span>
              )}
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleNext}
            className="w-full h-11 rounded-2xl bg-gradient-to-r from-[#D87C9B] to-[#F48FB1] hover:from-[#c96c8a] hover:to-[#e57b9f] text-white text-xs font-black shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            {isLastScene ? (
              <>
                <Check className="w-4 h-4" />
                <span>Hoàn Thành Chương</span>
              </>
            ) : (
              <>
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
