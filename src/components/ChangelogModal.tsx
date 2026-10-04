import React, { useState } from 'react';
import { Sparkles, Palette, Wrench, Bug, X, Shirt, CheckCircle2, DollarSign, Lightbulb, ShoppingBag } from 'lucide-react';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { GAME_VERSION } from '../constants/version';
export { GAME_VERSION };

export const ChangelogModal: React.FC<ChangelogModalProps> = ({ isOpen, onClose }) => {
  const [selectedVersion, setSelectedVersion] = useState<'v1.0.2' | 'v1.0.1'>('v1.0.2');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in select-none">
      <div className="bg-[#FFF8F4] w-full max-w-md rounded-3xl border-2 border-[#F2E1CF] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#FFF0F5] via-[#FFF5F8] to-[#FFF0F5] border-b border-[#F2E1CF] p-3.5 flex items-center justify-between relative shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#D87C9B]/15 border border-[#D87C9B]/30 flex items-center justify-center text-[#D87C9B]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-[#3E3431] tracking-tight font-heading">
                  Nhật Ký Cập Nhật
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
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Version Switcher Tabs */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FFF7F1] border-b border-[#F2E1CF]/70 shrink-0">
          <button
            onClick={() => setSelectedVersion('v1.0.2')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${selectedVersion === 'v1.0.2'
                ? 'bg-gradient-to-r from-[#D87C9B] to-[#c96c8a] text-white shadow-xs'
                : 'bg-white text-[#8D6E63] border border-[#F2E1CF] hover:border-[#D87C9B]'
              }`}
          >
            <span>v1.0.2 — Mới nhất</span>
            {selectedVersion === 'v1.0.2' && <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />}
          </button>

          <button
            onClick={() => setSelectedVersion('v1.0.1')}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedVersion === 'v1.0.1'
                ? 'bg-[#6F554A] text-white shadow-xs font-black'
                : 'bg-white text-[#8D6E63] border border-[#F2E1CF] hover:border-[#6F554A]'
              }`}
          >
            <span>v1.0.1</span>
          </button>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="p-3.5 overflow-y-auto space-y-3 text-xs text-[#3E3431]">
          {selectedVersion === 'v1.0.2' ? (
            <>
              {/* Welcome Banner v1.0.2 */}
              <div className="bg-gradient-to-r from-pink-500/10 via-rose-500/5 to-amber-500/10 border border-[#D87C9B]/30 p-3 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-extrabold text-[#D87C9B] text-xs font-heading">
                    Bản cập nhật 1.0.2 — Nâng cấp Ngân sách & Gợi ý Outfit!
                  </h3>
                  <p className="text-[11px] text-[#6F554A] leading-snug">
                    Tối ưu hệ thống khách hàng, bổ sung gợi ý outfit thông minh, icon thời trang sắc nét & cân bằng gameplay!
                  </p>
                </div>
              </div>

              {/* Section 1: ✨ Cải thiện hệ thống khách hàng */}
              <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#D87C9B] font-black text-xs border-b border-pink-50 pb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>✨ CẢI THIỆN HỆ THỐNG KHÁCH HÀNG</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>Điều chỉnh ngân sách của khách hàng: <strong>Tối thiểu từ 2.000.000đ trở lên</strong> cho mọi khách.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>Phân loại rõ ràng ngân sách: <strong>Khách thường (2M–4M)</strong>, <strong>Khách khá (4M–7M)</strong>, <strong>Khách VIP (7M–12M)</strong>, <strong>Luxury (10M–20M)</strong>.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>Yêu cầu của khách hiển thị đầy đủ: <strong>Phong cách</strong>, <strong>Màu yêu thích</strong>, <strong>Dịp sử dụng</strong> và <strong>Ngân sách (VNĐ)</strong>.</span>
                  </li>
                </ul>
              </div>

              {/* Section 2: 💡 Hệ thống gợi ý Outfit */}
              <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#D9A441] font-black text-xs border-b border-amber-50 pb-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>💡 HỆ THỐNG GỢI Ý OUTFIT</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Bổ sung hệ thống tự động phân tích: Style, Occasion, Màu sắc, Ngân sách và Tình trạng còn hàng.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Hiển thị badge gợi ý trực quan trên sản phẩm: <span className="text-[#D87C9B] font-bold">✨ Gợi ý</span>, <span className="text-pink-600 font-bold">💗 Hợp gu</span>, <span className="text-emerald-600 font-bold">💰 Hợp ngân sách</span>.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Thêm section <strong>Combo gợi ý</strong> (1–3 set đồ hợp gu): Hỗ trợ người chơi tham khảo và chọn nhanh.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Gợi ý chỉ hỗ trợ tham khảo, <strong>không tự động chọn thay người chơi</strong>.</span>
                  </li>
                </ul>
              </div>

              {/* Section 3: 👗 Cải thiện Item Outfits */}
              <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#E91E63] font-black text-xs border-b border-pink-50 pb-1.5">
                  <Shirt className="w-4 h-4" />
                  <span>👗 CẢI THIỆN ITEM OUTFITS</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Chuẩn hóa bộ icon thời trang cho cả 8 nhóm: Áo, Quần, Chân váy, Đầm, Áo khoác, Giày, Túi xách & Phụ kiện.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Giảm tình trạng trùng icon, nâng cao độ sắc nét và làm sạch các chi tiết dính thừa.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-pink-500 font-bold">•</span>
                    <span>Tối ưu crop và padding đặc biệt cho nhóm <strong>Giày</strong> (không bị crop mất mũi, gót hoặc đế giày).</span>
                  </li>
                </ul>
              </div>

              {/* Section 4: 🎨 Hình ảnh */}
              <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#8E24AA] font-black text-xs border-b border-purple-50 pb-1.5">
                  <Palette className="w-4 h-4" />
                  <span>🎨 HÌNH ẢNH</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Đồng bộ phong cách icon theo dạng <em>glossy cartoon fashion sticker</em> tươi sáng.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Căn giữa sản phẩm chuẩn xác, giảm lỗi méo hình và hiển thị tối ưu trên màn hình mobile.</span>
                  </li>
                </ul>
              </div>

              {/* Section 5: 💰 Cân bằng giá & Chấm điểm */}
              <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#10B981] font-black text-xs border-b border-emerald-50 pb-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>💰 CÂN BẰNG GIÁ & CHẤM ĐIỂM</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Tinh chỉnh logic Budget score: Outfit tốt nhất không nhất thiết phải dùng hết tiền của khách.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>Đạt điểm tối đa (20/20) khi tổng giá nằm trong khoảng 60% – 100% ngân sách khách.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span><strong>Khóa chọn outfit vượt ngân sách:</strong> Không cho phép chốt bộ đồ có tổng giá vượt quá ví tiền khách hàng.</span>
                  </li>
                </ul>
              </div>

              {/* Section 6: 🛠 Sửa lỗi & Tối ưu */}
              <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#1E88E5] font-black text-xs border-b border-blue-50 pb-1.5">
                  <Wrench className="w-4 h-4" />
                  <span>🛠 SỬA LỖI & TỐI ƯU</span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#5D4037] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Sửa lỗi mapping icon sai loại và triệt để loại bỏ asset 404 broken image.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Tối ưu mượt mà giao diện Catalog, Kho hàng, Nhập hàng và Outfit Builder cho thiết bị mobile.</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* History v1.0.1 */}
              <div className="bg-white border border-[#F2E1CF] p-3 rounded-2xl shadow-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#D87C9B] font-black text-xs border-b border-pink-50 pb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>BẢN CẬP NHẬT 1.0.1</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-[#5D4037] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>Mở rộng hệ thống danh mục thời trang với chuẩn 141 subCategory chuyên sâu.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Cập nhật bộ icon PNG trong suốt 256x256 sắc nét cho toàn bộ sản phẩm.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Tối ưu icon chân váy sạch sẽ, cắt bỏ hoàn toàn bảng tên/chữ thừa phía dưới.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>Làm sạch catalog whitelist và loại bỏ các lỗi asset 404 broken image.</span>
                  </li>
                </ul>
              </div>
            </>
          )}
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
            ĐÃ HIỂU
          </button>
        </div>
      </div>
    </div>
  );
};
