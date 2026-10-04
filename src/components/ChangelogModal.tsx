import React from 'react';
import { Sparkles, Palette, Wrench, Bug, X, Shirt, CheckCircle2 } from 'lucide-react';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GAME_VERSION = 'v1.0.1';

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in select-none">
      <div className="bg-[#FFF8F4] w-full max-w-md rounded-3xl border-2 border-[#F2E1CF] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#FFF0F5] via-[#FFF5F8] to-[#FFF0F5] border-b border-[#F2E1CF] p-4 flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#D87C9B]/15 border border-[#D87C9B]/30 flex items-center justify-center text-[#D87C9B]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-[#3E3431] tracking-tight">
                  Bản cập nhật 1.0.1
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#D87C9B] text-white text-[10px] font-black shadow-2xs">
                  {GAME_VERSION}
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#8D6E63]">
                Tiệm Thời Trang Cô Chủ Như
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#F2E1CF] text-[#6F554A] hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-[#3E3431]">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-purple-500/10 border border-[#D87C9B]/30 p-3 rounded-2xl flex items-center gap-3">
            <span className="text-2xl">🛍️</span>
            <div>
              <h3 className="font-extrabold text-[#D87C9B] text-xs">
                Chào mừng bạn đến với v1.0.1!
              </h3>
              <p className="text-[11px] text-[#6F554A] leading-snug">
                Bản cập nhật mang đến hệ thống thời trang chuẩn hóa sắc nét và tối ưu giao diện tiệm tốt hơn!
              </p>
            </div>
          </div>

          {/* Section 1: ✨ Nội dung mới */}
          <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#D87C9B] font-black text-xs border-b border-pink-50 pb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>✨ Nội dung mới</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>Mở rộng hệ thống danh mục thời trang với chuẩn <strong>141 subCategory</strong> chuyên sâu.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>Bổ sung đầy đủ nhóm trang phục & phụ kiện: Áo, Quần, Chân váy, Đầm, Áo khoác, Giày, Túi xách, Phụ kiện.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: 🎨 Hình ảnh */}
          <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#8E24AA] font-black text-xs border-b border-purple-50 pb-1.5">
              <Palette className="w-4 h-4" />
              <span>🎨 Hình ảnh</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>Cập nhật bộ icon PNG trong suốt 256x256 sắc nét cho toàn bộ sản phẩm.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>Tối ưu icon chân váy sạch sẽ: cắt bỏ hoàn toàn bảng tên/chữ thừa phía dưới icon.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>Căn giữa hình ảnh sản phẩm gọn gàng, đồng nhất trên mọi màn hình.</span>
              </li>
            </ul>
          </div>

          {/* Section 3: 🛠 Cải thiện */}
          <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#1E88E5] font-black text-xs border-b border-blue-50 pb-1.5">
              <Wrench className="w-4 h-4" />
              <span>🛠 Cải thiện</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span>Làm sạch catalog, chỉ giữ lại sản phẩm thuộc danh sách whitelist chính thức.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span>Chuẩn hóa lại tên, category và subCategory nhất quán.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span>Cải thiện giao diện hiển thị trong Catalog, Kho hàng, Nhập hàng và Phối đồ.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: 🐞 Sửa lỗi */}
          <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#E65100] font-black text-xs border-b border-orange-50 pb-1.5">
              <Bug className="w-4 h-4" />
              <span>🐞 Sửa lỗi</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-orange-400 font-bold">•</span>
                <span>Khắc phục lỗi icon chân váy bị dính nhãn chữ phía dưới.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-orange-400 font-bold">•</span>
                <span>Sửa triệt để các lỗi đường dẫn hình ảnh hỏng (404 asset).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-orange-400 font-bold">•</span>
                <span>Tối ưu tương thích dữ liệu save `localStorage` cũ an toàn.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#FFF5EE] border-t border-[#F2E1CF] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#8D6E63]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Phiên bản hiện tại: {GAME_VERSION}</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#D87C9B] to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer"
          >
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};
