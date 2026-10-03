import React from 'react';
import { Product } from '../types/game';
import { ClothesIcon } from './ClothesIcon';

interface ProductIconProps {
  product: Product;
  size?: number;
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ product, size = 32, className = '' }) => {
  const iconName = product.subCategory || product.category;

  return (
    <ClothesIcon
      name={iconName}
      size={size}
      color={product.accentColor}
      fallbackEmoji={product.visualEmoji}
      className={className}
    />
  );
};

export default ProductIcon;
