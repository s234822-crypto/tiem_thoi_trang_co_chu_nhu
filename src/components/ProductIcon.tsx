/**
 * ProductIcon — Renders the original emoji icon for a product.
 * Uses product.visualEmoji directly as originally designed in the game.
 */

import React from 'react';
import { Product } from '../types/game';

interface ProductIconProps {
  product: Product;
  size?: number;
  className?: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ product, size = 32, className = '' }) => {
  const emoji = product.visualEmoji || '👚';

  return (
    <span
      className={`inline-flex items-center justify-center leading-none select-none transition-transform ${className}`}
      style={{
        fontSize: `${Math.round(size * 0.72)}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      role="img"
      aria-label={product.name}
    >
      {emoji}
    </span>
  );
};

export default ProductIcon;
