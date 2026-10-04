import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  Target,
  Trophy,
  Volume2,
  VolumeX,
  Shirt,
  BookOpen,
  Scroll,
  Menu,
  X,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { ShopStats } from '../types/game';
import { PWAInstallButton } from './PWAInstallButton';
import { GAME_VERSION } from './ChangelogModal';

interface HeaderProps {
  stats: ShopStats;
  unclaimedMissionsCount?: number;
  unclaimedAchievementsCount?: number;
  unclaimedCollectionsCount?: number;
  hasUnreadStory?: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
  onCloseShop?: () => void;
  onOpenMissions: () => void;
  onOpenAchievements: () => void;
  onOpenWardrobe: () => void;
  onOpenCollections: () => void;
  onOpenStory: () => void;
  onOpenGuide: () => void;
  onOpenDebug: () => void;
  onOpenChangelog?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  unclaimedMissionsCount = 0,
  unclaimedAchievementsCount = 0,
  unclaimedCollectionsCount = 0,
  hasUnreadStory = false,
  isMuted = false,
  onToggleMute,
  onCloseShop,
  onOpenMissions,
  onOpenAchievements,
  onOpenWardrobe,
  onOpenCollections,
  onOpenStory,
  onOpenGuide,
  onOpenDebug,
  onOpenChangelog,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalNotifications =
    unclaimedMissionsCount +
    unclaimedAchievementsCount +
    unclaimedCollectionsCount +
    (hasUnreadStory ? 1 : 0);

  return (
    <header className="relative w-full bg-[#FFF8F4] border-b border-[#F2E1CF] px-3 py-2 shadow-xs select-none z-30">
      {/* Requirement 14: Header only displays essential indicators */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Day & Level */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-white border border-[#F2E1CF] px-2 py-1 rounded-xl shadow-2xs">
            <span className="text-[11px] font-black text-[#D87C9B]">
              Ngày {stats.day}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] font-extrabold text-[#3E3431]">
              Lv.{stats.level}
            </span>
          </div>
        </div>

        {/* Center: Rating */}
        <div className="flex items-center gap-1 bg-white border border-[#F2E1CF] px-2.5 py-1 rounded-xl shadow-2xs">
          <Star className="w-3.5 h-3.5 text-[#D9A441] fill-[#D9A441]" />
          <span className="text-xs font-black text-[#3E3431] tabular-nums">
            {stats.rating.toFixed(1)}
          </span>
        </div>

        {/* Right: Money & Quick Menu */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-white border border-[#F2E1CF] px-2.5 py-1 rounded-xl shadow-2xs">
            <span className="text-xs">💰</span>
            <span className="text-xs font-black text-[#3E3431] tabular-nums">
              {stats.money.toLocaleString('vi-VN')}đ
            </span>
          </div>

          {/* Quick Close Shop Button when Open */}
          {stats.isShopOpen && onCloseShop && (
            <button
              onClick={onCloseShop}
              className="px-2 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-[10px] font-black shadow-2xs active:scale-95 transition-all flex items-center gap-1"
              title="Đóng cửa tiệm nghỉ ngơi"
            >
              <span>🌙</span>
              <span className="hidden xs:inline">Đóng tiệm</span>
            </button>
          )}

          {/* Quick Menu Button with Notification Dot */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative w-8 h-8 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] active:scale-95 text-[#6F554A] flex items-center justify-center shadow-2xs transition-all"
            title="Mở menu tiệm"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            {totalNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center animate-bounce shadow-xs">
                {totalNotifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Slide-down Menu Drawer */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#FFF8F4] border-b-2 border-[#D87C9B] p-3 shadow-xl z-50 animate-fade-in space-y-2.5">
          {stats.isShopOpen && onCloseShop && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onCloseShop();
              }}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-98 transition-all"
            >
              <span className="text-sm">🌙</span>
              <span>ĐÓNG CỬA TIỆM (NGHỈ NGƠI)</span>
            </button>
          )}

          <div className="text-[10.5px] font-bold text-[#8D6E63] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Tiện Ích & Hoạt Động</span>
            <span className="text-[#3E3431]">{stats.shopName}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {/* Missions */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenMissions();
              }}
              className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] text-[#D87C9B] shadow-2xs active:scale-98 transition-all"
            >
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#D87C9B]" />
                <span>Nhiệm vụ ngày</span>
              </div>
              {unclaimedMissionsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                  {unclaimedMissionsCount}
                </span>
              )}
            </button>

            {/* Achievements */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenAchievements();
              }}
              className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] text-[#B78119] shadow-2xs active:scale-98 transition-all"
            >
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#D9A441]" />
                <span>Thành tựu</span>
              </div>
              {unclaimedAchievementsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                  {unclaimedAchievementsCount}
                </span>
              )}
            </button>

            {/* Collections */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenCollections();
              }}
              className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] text-[#1E88E5] shadow-2xs active:scale-98 transition-all"
            >
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#1E88E5]" />
                <span>Bộ sưu tập</span>
              </div>
              {unclaimedCollectionsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                  {unclaimedCollectionsCount}
                </span>
              )}
            </button>

            {/* Wardrobe */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenWardrobe();
              }}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] text-[#8E24AA] shadow-2xs active:scale-98 transition-all"
            >
              <Shirt className="w-4 h-4 text-[#8E24AA]" />
              <span>Tủ đồ Như</span>
            </button>

            {/* Story */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenStory();
              }}
              className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] text-[#D84315] shadow-2xs active:scale-98 transition-all"
            >
              <div className="flex items-center gap-1.5">
                <Scroll className="w-4 h-4 text-[#D84315]" />
                <span>Cốt truyện</span>
              </div>
              {hasUnreadStory && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[8px] font-bold">
                  Mới
                </span>
              )}
            </button>

            {/* Sound Toggle */}
            {onToggleMute && (
              <button
                onClick={onToggleMute}
                className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] text-[#6F554A] shadow-2xs active:scale-98 transition-all"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
                <span>{isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}</span>
              </button>
            )}

            {/* Guide */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenGuide();
              }}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] text-[#6F554A] shadow-2xs active:scale-98 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-[#D87C9B]" />
              <span>Cẩm nang chơi</span>
            </button>

            {/* Debug */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenDebug();
              }}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#F2E1CF] hover:border-[#D87C9B] text-[#8D6E63] shadow-2xs active:scale-98 transition-all"
            >
              <Settings className="w-4 h-4 text-[#8D6E63]" />
              <span>Bảng Debug</span>
            </button>

            {/* Patch Notes / Changelog Modal Trigger */}
            {onOpenChangelog && (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenChangelog();
                }}
                className="flex items-center gap-1.5 p-2 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 hover:border-pink-400 text-[#D87C9B] font-extrabold shadow-2xs active:scale-98 transition-all col-span-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D87C9B]" />
                <span>Nhật ký Cập nhật {GAME_VERSION}</span>
                <span className="ml-auto px-1.5 py-0.5 rounded-full bg-[#D87C9B] text-white text-[9px] font-black">
                  {GAME_VERSION}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#F2E1CF]/70">
            <PWAInstallButton />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-xs font-bold text-[#8D6E63] hover:text-[#3E3431] px-3 py-1 rounded-lg bg-white border border-[#F2E1CF]"
            >
              Đóng menu
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
