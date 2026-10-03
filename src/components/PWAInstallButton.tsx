import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="h-7 px-2.5 rounded-lg bg-[#FFF0F5] hover:bg-[#FCE4EC] border border-[#F4C7D9] text-[#D87C9B] text-[10px] font-extrabold shadow-2xs active:scale-95 transition-all flex items-center gap-1"
        title="Cài đặt game về màn hình chính"
      >
        <Download className="w-3 h-3 text-[#D87C9B]" />
        <span>Cài Game</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="h-7 px-2.5 rounded-lg bg-[#FFF0F5] hover:bg-[#FCE4EC] border border-[#F4C7D9] text-[#D87C9B] text-[10px] font-extrabold shadow-2xs active:scale-95 transition-all flex items-center gap-1"
          title="Thêm game vào màn hình chính iPhone / iPad"
        >
          <Smartphone className="w-3 h-3 text-[#D87C9B]" />
          <span>Cài iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4">
            <div className="w-full max-w-xs rounded-2xl bg-[#FFF8F4] border-2 border-[#F4C7D9] p-4 shadow-xl select-none animate-gentle-bounce text-left">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F2E1CF]">
                <h3 className="text-xs font-black text-[#3E3431] font-heading flex items-center gap-1">
                  <span>📲 Cài Đặt Game Trên iPhone / iPad</span>
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="w-6 h-6 rounded-full bg-white border border-[#F2E1CF] flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>
              <p className="text-[11px] text-[#6F554A] leading-relaxed mb-3">
                1. Nhấn nút <strong>Chia sẻ (Share ⎋)</strong> trên thanh công cụ Safari.<br />
                2. Cuộn xuống và chọn <strong>Thêm vào MH chính (Add to Home Screen)</strong>.<br />
                3. Bấm <strong>Thêm (Add)</strong> để chơi toàn màn hình mượt mà!
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full h-8 rounded-xl bg-[#D87C9B] hover:bg-[#c96c8a] text-white text-[11px] font-bold shadow-xs"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
