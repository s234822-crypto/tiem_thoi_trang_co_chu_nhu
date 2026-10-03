import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { playTapSound, playAlertSound } from '../utils/audio';

interface ResetConfirmModalProps {
  onConfirmReset: () => void;
  onClose: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  onConfirmReset,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  const handleFirstStep = () => {
    playAlertSound();
    setStep(2);
  };

  const handleFinalConfirm = () => {
    onConfirmReset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-2xs p-4 animate-fade-in select-none">
      <div className="w-full max-w-xs rounded-3xl bg-[#2B2320] border-2 border-rose-500 shadow-2xl p-4 text-white animate-gentle-bounce">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>XÁC NHẬN RESET TIẾN TRÌNH</span>
          </div>
          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center font-bold"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {step === 1 ? (
          <div className="space-y-3 py-1">
            <p className="text-xs text-rose-200 leading-relaxed">
              Bạn có chắc chắn muốn xóa toàn bộ dữ liệu lưu (tiền, cấp độ, sản phẩm, tủ đồ và thành tựu) không?
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  playTapSound();
                  onClose();
                }}
                className="flex-1 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all text-white/90"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleFirstStep}
                className="flex-1 h-9 rounded-xl bg-rose-700 hover:bg-rose-600 text-xs font-bold transition-all flex items-center justify-center gap-1 text-white shadow-xs"
              >
                <span>Tiếp tục</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 py-1">
            <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-center">
              <span className="text-xl mb-1 block">⚠️</span>
              <p className="text-xs font-bold text-rose-300">
                CẢNH BÁO BƯỚC 2: Thao tác này KHÔNG THỂ khôi phục lại!
              </p>
            </div>
            <p className="text-[11px] text-white/70 text-center">
              Toàn bộ tiệm thời trang sẽ quay về Ngày 1 như mới bắt đầu.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  playTapSound();
                  onClose();
                }}
                className="flex-1 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all"
              >
                Giữ lại game
              </button>
              <button
                onClick={handleFinalConfirm}
                className="flex-1 h-9 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-black transition-all flex items-center justify-center gap-1 text-white shadow-md animate-pulse"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xác nhận xóa</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
