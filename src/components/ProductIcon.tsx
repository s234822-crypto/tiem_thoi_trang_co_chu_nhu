import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setImgError(false);
  }, [product.id, product.image]);

  if (product.image && !imgError) {
    return (
      <div
        className={`inline-flex items-center justify-center relative select-none shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={product.image}
          alt={product.name}
          onError={() => {
            console.warn(`[ProductIcon] Failed image load for product ${product.id} (${product.name}): ${product.image}`);
            setImgError(true);
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            padding: Math.max(2, size * 0.05),
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.12))',
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
