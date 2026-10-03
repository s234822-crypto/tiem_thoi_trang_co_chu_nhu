import React from 'react';
import { StoryChapter } from '../types/game';
import { BookOpen, CheckCircle2, Lock, X, Play, Sparkles } from 'lucide-react';
import { playTapSound } from '../utils/audio';

interface StoryArchiveModalProps {
  chapters: StoryChapter[];
  onReadChapter: (chapter: StoryChapter) => void;
  onClose: () => void;
}

export const StoryArchiveModal: React.FC<StoryArchiveModalProps> = ({
  chapters,
  onReadChapter,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-2xs p-3 animate-fade-in select-none">
      <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F4] border-2 border-[#F4C7D9] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#FFF0F5] to-[#FCE4EC] border-b border-[#F2E1CF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D84315] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#3E3431] font-heading">
                Biên Niên Sử Boutique
              </h2>
              <p className="text-[10px] text-[#6F554A]">Hành trình xây dựng thương hiệu thời trang</p>
            </div>
          </div>
          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-white/80 hover:bg-white border border-[#F2E1CF] flex items-center justify-center text-[#6F554A] active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chapters List */}
        <div className="p-3.5 space-y-2.5 overflow-y-auto flex-1">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className={`p-3 rounded-2xl border transition-all ${
                ch.unlocked
                  ? 'bg-white border-[#F2E1CF] hover:border-[#F4C7D9] shadow-2xs'
                  : 'bg-gray-100/80 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9.5px] font-black uppercase text-[#D84315] bg-[#FFF0E6] px-1.5 py-0.2 rounded-md">
                      Chương {ch.number}
                    </span>
                    {ch.unlocked ? (
                      <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Đã mở</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-medium text-gray-500 flex items-center gap-0.5">
                        <Lock className="w-3 h-3 text-gray-400" />
                        <span>Chưa mở</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-[#3E3431] mt-1">
                    {ch.title}
                  </h3>
                  <p className="text-[10px] text-[#8D6E63] italic">
                    {ch.subtitle}
                  </p>
                </div>

                {ch.unlocked ? (
                  <button
                    onClick={() => {
                      playTapSound();
                      onReadChapter(ch);
                    }}
                    className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#D87C9B] to-[#F48FB1] text-white text-[10.5px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 shrink-0"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Đọc lại</span>
                  </button>
                ) : (
                  <span className="text-[9.5px] text-gray-400 italic shrink-0">
                    {ch.unlockCondition}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FFF8F4] border-t border-[#F2E1CF] text-center">
          <p className="text-[10px] text-[#8D6E63]">
            📖 Từng chương truyện sẽ tự động xuất hiện khi bạn đạt cột mốc mới trong game!
          </p>
        </div>
      </div>
    </div>
  );
};
