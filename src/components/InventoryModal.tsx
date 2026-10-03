import React, { useState, useMemo } from 'react';
import { ClothingCategory, Product } from '../types/game';
import { CATEGORY_LABELS, SUBCATEGORY_LABELS } from '../data/products';
import { Package, AlertTriangle, AlertCircle, TrendingUp, DollarSign, PlusCircle } from 'lucide-react';
import { ProductIcon } from './ProductIcon';

interface InventoryModalProps {
  products: Product[];
  onOpenRestock: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  products,
  onOpenRestock,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

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

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;
    return true;
  });

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const outOfStockCount = products.filter((p) => p.stock <= 0).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 2).length;

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 bg-[#FFF8F4] select-none">
      {/* Top summary stats banner */}
      <div className="p-3 bg-white border-b border-[#F2E1CF] shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Package className="w-4 h-4 text-[#D87C9B]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#3E3431] font-heading">
              Tổng Quan Kho Hàng
            </h2>
          </div>
          <button
            onClick={onOpenRestock}
            className="h-7 px-2.5 rounded-lg bg-[#D87C9B] hover:bg-[#c96c8a] text-white text-[10.5px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
          >
            <PlusCircle className="w-3 h-3" />
            <span>Nhập hàng ngay</span>
          </button>
        </div>

        {/* 3 Metric cards */}
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <div className="bg-[#FFF8F4] p-1.5 rounded-lg border border-[#F2E1CF]">
            <div className="text-[9px] text-[#8D6E63]">Tổng tồn kho</div>
            <div className="text-xs font-black text-[#3E3431] tabular-nums">
              {totalStock} món
            </div>
          </div>
          <div className="bg-amber-50 p-1.5 rounded-lg border border-amber-200">
            <div className="text-[9px] text-amber-800">Sắp hết hàng</div>
            <div className="text-xs font-black text-amber-700 tabular-nums">
              {lowStockCount} món
            </div>
          </div>
          <div className="bg-rose-50 p-1.5 rounded-lg border border-rose-200">
            <div className="text-[9px] text-rose-800">Hết hàng</div>
            <div className="text-xs font-black text-rose-700 tabular-nums">
              {outOfStockCount} món
            </div>
          </div>
        </div>
      </div>

      {/* Category filter pills */}
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

      {/* SubCategory filter pills */}
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

      {/* Products Inventory List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2.5 space-y-2">
        {filteredProducts.map((prod) => {
          const profit = prod.price - prod.cost;
          const isOutOfStock = prod.stock <= 0;
          const isLowStock = prod.stock > 0 && prod.stock <= 2;
          const stockPercent = Math.min(100, Math.round((prod.stock / (prod.maxStock || 10)) * 100));

          return (
            <div
              key={prod.id}
              className={`p-2.5 rounded-xl border bg-white shadow-2xs transition-all ${
                isOutOfStock
                  ? 'border-rose-300 bg-rose-50/30'
                  : isLowStock
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-[#F2E1CF]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {/* Visual Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-[#F2E1CF]"
                  style={{ backgroundColor: `${prod.accentColor}18` }}
                >
                  <ProductIcon product={prod} size={38} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-[11.5px] font-bold text-[#3E3431] truncate" title={prod.name}>
                      {prod.name}
                    </h4>

                    {/* Stock Alert Badge */}
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-black bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded-full shrink-0">
                        <AlertCircle className="w-2.5 h-2.5" />
                        <span>HẾT HÀNG</span>
                      </span>
                    ) : isLowStock ? (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full shrink-0">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>SẮP HẾT</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Stock progress */}
                  <div className="flex items-center justify-between text-[10px] text-[#8D6E63] mb-1">
                    <span>{CATEGORY_LABELS[prod.category]}</span>
                    <span className="font-bold tabular-nums">
                      Kho: <strong className={isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-700' : 'text-[#3E3431]'}>{prod.stock}</strong> / {prod.maxStock || 10}
                    </span>
                  </div>

                  <div className="w-full bg-[#F2E1CF]/70 h-1.5 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOutOfStock ? 'bg-rose-500' : isLowStock ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${stockPercent}%` }}
                    />
                  </div>

                  {/* Financial Metrics: Cost, Price, Profit */}
                  <div className="grid grid-cols-3 gap-1 pt-1 border-t border-[#F2E1CF]/60 text-[9.5px]">
                    <div>
                      <span className="text-[#8D6E63] block">Giá nhập:</span>
                      <strong className="text-[#6F554A] tabular-nums">
                        {prod.cost.toLocaleString('vi-VN')}đ
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#8D6E63] block">Giá bán:</span>
                      <strong className="text-[#3E3431] tabular-nums">
                        {prod.price.toLocaleString('vi-VN')}đ
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#8D6E63] block">Lợi nhuận:</span>
                      <strong className="text-emerald-700 tabular-nums">
                        +{profit.toLocaleString('vi-VN')}đ
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
