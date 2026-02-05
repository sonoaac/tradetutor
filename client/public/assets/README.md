# Trading Tutor Assets

This folder contains all image and media assets for the Trading Tutor application.

## Folder Structure

```
assets/
├── charts/              # Chart and technical analysis imagery
│   ├── candlestick.jpg      # Candlestick pattern examples
│   ├── fibonacci.png        # Fibonacci retracement levels
│   └── moving-averages.png  # Moving average overlays
│
├── markets/             # Market type and asset class imagery
│   ├── stocks.webp      # Stock market imagery
│   ├── crypto.avif      # Cryptocurrency imagery
│   ├── futures.png      # Futures trading imagery
│   ├── options.png      # Options trading imagery
│   ├── forex.png        # Forex trading imagery
│   └── commodities.png  # Commodities trading imagery
│
├── portfolio/           # Portfolio and performance imagery
│   ├── growth.webp      # Portfolio growth charts
│   ├── analytics.png    # Analytics dashboard
│   └── performance.png  # Performance metrics
│
└── logo.png             # Brand logo

```

## Addition Guide

When adding new assets:

1. **Choose the right format:**
   - `.webp` - Best for web, good compression
   - `.avif` - Modern format, superior compression
   - `.png` - For logos and graphics with transparency
   - `.jpg` - For photographs

2. **Optimize before adding:**
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Aim for file sizes under 500KB for web images

3. **Naming Convention:**
   - Use lowercase with hyphens: `candlestick-chart.jpg`
   - Be descriptive but concise
   - Include the image content/purpose in the name

4. **Update the Landing page references:**
   - Edit `client/src/pages/Landing.tsx`
   - Import images at the top of the component
   - Reference in JSX with proper alt text

## Current Asset Usage

- **Market Cards**: `assets/markets/*` - Display market type visuals
- **Chart Sections**: `assets/charts/*` - Show technical analysis examples
- **Portfolio Section**: `assets/portfolio/*` - Display growth/analytics
- **Logo**: `assets/logo.png` - Brand identity

## Image Specifications

### Market Cards (6 cards)
- Size: 400x300px recommended
- Format: WebP or AVIF for best compression
- Purpose: Eye-catching, attractive trade imagery

### Charts Section
- Size: 600x400px recommended
- Format: JPG or PNG (often actual chart images)
- Purpose: Educational technical analysis visuals

### Portfolio Section
- Size: 600x500px recommended
- Format: WebP or PNG
- Purpose: Show portfolio growth and analytics

