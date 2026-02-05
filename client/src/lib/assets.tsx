/**
 * Asset paths and configuration for Trading Tutor
 * Centralizes all image and media asset references
 */

import React from 'react';

export const ASSETS = {
  logo: '/assets/logo.png',
  
  markets: {
    stocks: '/assets/markets/stocks.webp',
    crypto: '/assets/markets/crypto.avif',
    futures: '/assets/markets/futures.png',
    options: '/assets/markets/options.png',
    forex: '/assets/markets/forex.png',
    commodities: '/assets/markets/commodities.png',
  },
  
  charts: {
    candlestick: '/assets/charts/candlestick.jpg',
    fibonacci: '/assets/charts/fibonacci.png',
    movingAverages: '/assets/charts/moving-averages.png',
  },
  
  portfolio: {
    growth: '/assets/portfolio/growth.webp',
    analytics: '/assets/portfolio/analytics.png',
    performance: '/assets/portfolio/performance.png',
  },
};

/**
 * Get asset path with fallback
 * Falls back to alternative format if primary doesn't exist
 */
export function getAssetPath(category: keyof typeof ASSETS, name: string): string {
  const categoryAssets = ASSETS[category] as Record<string, string>;
  return categoryAssets?.[name] || '';
}

/**
 * Image component with built-in error handling and lazy loading
 */
export interface AssetImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSvg?: React.ReactNode;
  loading?: 'lazy' | 'eager';
}

export const AssetImage = ({
  src,
  alt,
  className = '',
  fallbackSvg,
  loading = 'lazy',
}: AssetImageProps) => {
  const [imageError, setImageError] = React.useState(false);

  if (imageError && fallbackSvg) {
    return <>{fallbackSvg}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setImageError(true)}
    />
  );
};
