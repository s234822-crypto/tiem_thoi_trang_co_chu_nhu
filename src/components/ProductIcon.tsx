import React, { useState } from 'react';
import { Product } from '../types/game';
import { ClothesIcon } from './ClothesIcon';

interface ProductIconProps {
  product: Product;
  size?: number;
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ product, size = 32, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const iconName = product.subCategory || product.category;

  if (product.image && !imgError) {
    return (
      <div 
        className={`inline-flex items-center justify-center relative select-none shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
        />
      </div>
    );
  }

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
