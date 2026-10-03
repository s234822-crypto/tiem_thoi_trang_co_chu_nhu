import React, { useState } from 'react';
import { OwnerSkin } from '../types/game';
import { Sparkles, Check, Lock, X, Shirt, Crown } from 'lucide-react';
import { playTapSound, playChimeSound, playSuccessFanfare } from '../utils/audio';

interface WardrobeModalProps {
  skins: OwnerSkin[];
  onEquipSkin: (skinId: string) => void;
  onClose: () => void;
}

export const WardrobeModal: React.FC<WardrobeModalProps> = ({
  skins,
  onEquipSkin,
  onClose,
}) => {
  const equippedSkin = skins.find((s) => s.isEquipped) || skins[0];
  const [previewSkin, setPreviewSkin] = useState<OwnerSkin>(equippedSkin);

  const handleSelectSkin = (skin: OwnerSkin) => {
    playTapSound();
    setPreviewSkin(skin);
  };

  const handleApplyEquip = () => {
    if (!previewSkin.isUnlocked) return;
    playSuccessFanfare();
    onEquipSkin(previewSkin.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-2xs p-3 animate-fade-in select-none">
      <div className="w-full max-w-sm rounded-3xl bg-[#FFF8F4] border-2 border-[#F4C7D9] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#FFF0F5] to-[#FCE4EC] border-b border-[#F2E1CF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#D87C9B] text-white flex items-center justify-center shadow-xs">
              <Shirt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#3E3431] font-heading">
                Tủ Đồ Cô Chủ Như
              </h2>
              <p className="text-[10px] text-[#6F554A]">Thay đổi trang phục & diện mạo chủ tiệm</p>
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

        {/* Live Interactive Preview Box */}
        <div className="p-3.5 bg-gradient-to-b from-[#FFF5F8] to-[#FFF8F4] border-b border-[#F2E1CF] flex items-center gap-3">
          {/* Avatar Preview */}
          <div className="relative w-20 h-20 rounded-full border-3 border-[#D87C9B] bg-white overflow-hidden shadow-md shrink-0 animate-gentle-bounce">
            <img
              src={previewSkin.avatar}
              alt={previewSkin.name}
              className={`w-full h-full object-cover object-top transition-all ${
                !previewSkin.isUnlocked ? 'filter grayscale contrast-125' : ''
              }`}
              referrerPolicy="no-referrer"
            />
            {previewSkin.isEquipped && (
              <div className="absolute bottom-0 inset-x-0 bg-[#D87C9B] text-white text-[8px] font-black text-center py-0.5 leading-none">
                ĐANG MẶC
              </div>
            )}
          </div>

          {/* Skin details & Equip Button */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-base">{previewSkin.badgeEmoji}</span>
              <h3 className="text-xs font-black text-[#3E3431] truncate">
                {previewSkin.name}
              </h3>
            </div>
            <p className="text-[10px] text-[#6F554A] leading-snug line-clamp-2 mb-2">
              {previewSkin.description}
            </p>

            {/* Equip button */}
            {previewSkin.isEquipped ? (
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10.5px] font-bold">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đang sử dụng</span>
              </div>
            ) : previewSkin.isUnlocked ? (
              <button
                onClick={handleApplyEquip}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#D87C9B] to-[#F48FB1] hover:from-[#c96c8a] hover:to-[#e57b9f] text-white text-[11px] font-black shadow-xs active:scale-95 transition-all flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Mặc Outfit Này</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-medium">
                <Lock className="w-3 h-3 text-gray-400" />
                <span className="truncate">{previewSkin.unlockCondition}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skins Selection Grid */}
        <div className="p-3 space-y-2 overflow-y-auto flex-1">
          <div className="text-[10.5px] font-bold text-[#8D6E63] px-1">
            DANH SÁCH TRANG PHỤC ({skins.length})
          </div>

          <div className="grid grid-cols-1 gap-2">
            {skins.map((skin) => {
              const isSelected = previewSkin.id === skin.id;

              return (
                <div
                  key={skin.id}
                  onClick={() => handleSelectSkin(skin)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-[#FFF0F5] border-[#D87C9B] shadow-xs ring-1 ring-[#D87C9B]'
                      : 'bg-white border-[#F2E1CF] hover:border-[#F4C7D9] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-11 h-11 rounded-full border border-[#F2E1CF] overflow-hidden shrink-0 bg-[#FFF8F4]">
                      <img
                        src={skin.avatar}
                        alt={skin.name}
                        className={`w-full h-full object-cover object-top ${
                          !skin.isUnlocked ? 'filter grayscale opacity-60' : ''
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      {!skin.isUnlocked && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Lock className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{skin.badgeEmoji}</span>
                        <h4 className="text-xs font-bold text-[#3E3431] truncate">
                          {skin.name}
                        </h4>
                      </div>
                      <p className="text-[9.5px] text-[#8D6E63] truncate">
                        {skin.isUnlocked ? skin.description : `Khóa: ${skin.unlockCondition}`}
                      </p>
                    </div>
                  </div>

                  {/* Status chip */}
                  <div className="shrink-0 text-right">
                    {skin.isEquipped ? (
                      <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Đang mặc
                      </span>
                    ) : skin.isUnlocked ? (
                      <span className="text-[9.5px] font-bold text-[#D87C9B] bg-[#FFF0F5] border border-[#F4C7D9] px-2 py-0.5 rounded-full">
                        Đã mở
                      </span>
                    ) : (
                      <span className="text-[9px] font-medium text-gray-400 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Khóa</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FFF8F4] border-t border-[#F2E1CF] text-center">
          <p className="text-[10px] text-[#8D6E63]">
            🌸 Trang phục mới sẽ làm sáng bừng phong thái của Cô Chủ Như trong tiệm!
          </p>
        </div>
      </div>
    </div>
  );
};
