import React, { useState, useMemo } from 'react';
import { Product } from '../types/game';
import { CATEGORY_LABELS, SUBCATEGORY_LABELS } from '../data/products';
import { playTapSound, playCoinSound, playAlertSound } from '../utils/audio';
import { ShoppingCart, Plus, Check, AlertCircle, Sparkles, AlertTriangle } from 'lucide-react';
import { ProductIcon } from './ProductIcon';

interface RestockModalProps {
  products: Product[];
  money: number;
  onRestockItem: (productId: string, quantity: number, totalCost: number) => boolean;
  onBatchRestock?: (purchases: Array<{ productId: string; quantity: number; cost: number }>) => boolean;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  products,
  money,
  onRestockItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'tops', label: 'Áo' },
    { id: 'bottoms', label: 'Quần' },
    { id: 'skirts', label: 'Chân váy' },
    { id: 'dresses', label: 'Đầm' },
    { id: 'jackets', label: 'Áo khoác' },
    { id: 'shoes', label: 'Giày' },
    { id: 'bags', label: 'Túi' },
    { id: 'accessories', label: 'Phụ kiện' },
  ];

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory('all');
  };

  // Available subCategories for current category tab
  const availableSubCategories = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'all') return [];
    const catProds = products.filter(p => p.category === selectedCategory);
    const subMap = new Map<string, string>();
    catProds.forEach(p => {
      if (p.subCategory) {
        subMap.set(p.subCategory, SUBCATEGORY_LABELS[p.subCategory] || p.subCategory);
      }
    });
    return Array.from(subMap.entries()).map(([id, label]) => ({ id, label }));
  }, [selectedCategory, products]);

  const showFeedback = (text: string, isError = false) => {
    setFeedbackMsg({ text, isError });
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 2800);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;
    return true;
  });

  const handleRestock = (product: Product, quantity: number) => {
    const maxStock = product.maxStock || 10;
    const availableSpace = Math.max(0, maxStock - product.stock);

    if (availableSpace <= 0) {
      playAlertSound();
      showFeedback(`Kho hàng của ${product.name} đã đầy tối đa!`, true);
      return;
    }

    const actualQty = Math.min(quantity, availableSpace);
    const totalCost = actualQty * product.cost;

    if (money < totalCost) {
      playAlertSound();
      showFeedback('Không đủ tiền trong quỹ để nhập hàng!', true);
      return;
    }

    const success = onRestockItem(product.id, actualQty, totalCost);
    if (success) {
      playCoinSound();
      showFeedback(`Đã nhập +${actualQty} ${product.name} (-${totalCost.toLocaleString('vi-VN')}đ)`);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-[#FFF8F4] select-none">
      {/* Top Banner with current funds */}
      <div className="p-3 bg-white border-b border-[#F2E1CF] shadow-2xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <ShoppingCart className="w-4 h-4 text-[#D87C9B]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#3E3431] font-heading">
              Trung Tâm Nhập Hàng
            </h2>
          </div>
          <div className="bg-[#FFF8F4] px-2.5 py-1 rounded-lg border border-[#F2E1CF] flex items-center gap-1 shadow-2xs">
            <span className="text-xs">💰</span>
            <span className="text-xs font-extrabold text-[#3E3431] tabular-nums">
              {money.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        {/* Feedback alert toast */}
        {feedbackMsg ? (
          <div
            className={`p-1.5 rounded-lg text-[10.5px] font-bold text-center border animate-gentle-bounce ${
              feedbackMsg.isError
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {feedbackMsg.text}
          </div>
        ) : (
          <div className="text-[10px] text-[#8D6E63] italic">
            💡 Nhập thêm hàng hóa khi số lượng sắp cạn để luôn sẵn sàng phục vụ khách!
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar border-b border-[#F2E1CF]/50 bg-[#FFF7F1]/80">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`h-6 px-2.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#D87C9B] text-white shadow-xs font-black'
                : 'bg-white text-[#6F554A] border border-[#F2E1CF] hover:bg-[#FFF0F5]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* SubCategory Pills */}
      {availableSubCategories.length > 0 && (
        <div className="flex items-center gap-1 px-3 py-1.5 overflow-x-auto no-scrollbar border-b border-[#F2E1CF]/40 bg-white/70">
          <button
            onClick={() => setSelectedSubCategory('all')}
            className={`h-5.5 px-2 rounded-full text-[9.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
              selectedSubCategory === 'all'
                ? 'bg-[#6F554A] text-white shadow-2xs font-black'
                : 'bg-[#FFF5EE] text-[#6F554A] border border-[#F2E1CF]'
            }`}
          >
            Tất cả
          </button>
          {availableSubCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubCategory(sub.id)}
              className={`h-5.5 px-2.5 rounded-full text-[9.5px] font-bold whitespace-nowrap shrink-0 transition-all ${
                selectedSubCategory === sub.id
                  ? 'bg-[#D87C9B] text-white shadow-2xs font-black'
                  : 'bg-white text-[#6F554A] border border-[#F2E1CF] hover:border-[#D87C9B]'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {/* Product Restock Items List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2.5 space-y-2">
        {filteredProducts.map((prod) => {
          const maxStock = prod.maxStock || 10;
          const isFull = prod.stock >= maxStock;
          const spaceLeft = maxStock - prod.stock;
          const isLowStock = prod.stock <= 2;

          return (
            <div
              key={prod.id}
              className={`p-2.5 rounded-xl border bg-white shadow-2xs transition-all ${
                isLowStock ? 'border-amber-300' : 'border-[#F2E1CF]'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                {/* Product Visual */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-[#F2E1CF]"
                  style={{ backgroundColor: `${prod.accentColor}18` }}
                >
                  <ProductIcon product={prod} size={36} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-[11.5px] font-bold text-[#3E3431] truncate" title={prod.name}>
                      {prod.name}
                    </h4>
                    <span
                      className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-full tabular-nums shrink-0 ${
                        isFull
                          ? 'bg-slate-100 text-slate-600'
                          : isLowStock
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {isFull ? 'Kho đầy' : `Tồn: ${prod.stock}/${maxStock}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#8D6E63] mt-0.5">
                    <span>
                      Giá nhập: <strong className="text-[#6F554A]">{prod.cost.toLocaleString('vi-VN')}đ</strong>
                    </span>
                    <span>
                      Giá bán: <strong className="text-[#D87C9B]">{prod.price.toLocaleString('vi-VN')}đ</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: +1, +5, MAX */}
              <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-[#F2E1CF]/60">
                {/* +1 Button */}
                <button
                  onClick={() => handleRestock(prod, 1)}
                  disabled={isFull || money < prod.cost}
                  className="h-7 rounded-lg bg-[#FFF0F5] hover:bg-[#FCE4EC] disabled:opacity-40 disabled:cursor-not-allowed border border-[#F4C7D9] text-[10px] font-bold text-[#D87C9B] transition-all active:scale-95 flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>+1 ({ (prod.cost / 1000).toLocaleString('vi-VN') }k)</span>
                </button>

                {/* +5 Button */}
                <button
                  onClick={() => handleRestock(prod, 5)}
                  disabled={isFull || money < prod.cost}
                  className="h-7 rounded-lg bg-[#FFF0F5] hover:bg-[#FCE4EC] disabled:opacity-40 disabled:cursor-not-allowed border border-[#F4C7D9] text-[10px] font-bold text-[#D87C9B] transition-all active:scale-95 flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>+5 ({ (Math.min(5, spaceLeft) * prod.cost / 1000).toLocaleString('vi-VN') }k)</span>
                </button>

                {/* MAX Button */}
                <button
                  onClick={() => handleRestock(prod, spaceLeft)}
                  disabled={isFull || money < prod.cost}
                  className="h-7 rounded-lg bg-[#D87C9B] hover:bg-[#c96c8a] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-[10px] font-extrabold transition-all active:scale-95 flex items-center justify-center shadow-2xs"
                >
                  <span>NHẬP ĐẦY ({spaceLeft})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
