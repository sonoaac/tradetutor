# TradeTutor - Trading Simulator & Education Platform

TradeTutor is a professional-grade trading simulator designed to teach users the fundamentals of Stocks, Crypto, and Forex trading through risk-free "SimCash" practice and AI-powered coaching.

## Project Structure

- **`client/`**: React + Vite frontend using Shadcn UI and Tailwind CSS.
- **`server/`**: Express backend handling trading logic, portfolio management, and AI integrations.
  - `storage.ts`: Database interface for CRUD operations.
  - `routes.ts`: API endpoints for trades, onboarding, and lessons.
- **`shared/`**: Shared TypeScript types and Zod schemas.
  - `schema.ts`: Drizzle ORM models for Portfolios, Trades, and Lessons.
  - `routes.ts`: Type-safe API route definitions.

## Key Features

- **Replit Auth**: Secure login via Google, GitHub, or Email.
- **SimCash Portfolio**: Start with a $10,000 simulated balance.
- **Educational Tracks**: Structured lessons for different asset classes.
- **AI Trade Coach**: Feedback on your trade execution and risk management using OpenAI.
- **Risk Metrics**: Automatic calculation of Risk/Reward (R:R) ratios and dollar risk.

## Current Setup

- **Database**: PostgreSQL (Neon-backed) managed via Drizzle ORM.
- **AI**: OpenAI integration configured for "Coach" feedback.
- **Authentication**: Native Replit Auth integration.
- **Onboarding**: Backend support for track and experience selection.

## Roadmap & Missing Features

### 1. Frontend Onboarding
Implement the UI for the `POST /api/portfolio/onboard` flow where users select their track and experience level.

### 2. Trade Receipt Component
Enhance the trading terminal with a detailed confirmation screen showing:
- Fill Price
- Stop Loss / Take Profit levels
- Total Risk ($)
- Calculated R:R Ratio

### 3. Real-time Simulation
Mocked price movement on the frontend to simulate live trading PnL (unrealized profit/loss).

### 4. Advanced Coaching
Expand the AI prompts to analyze specific mistakes like "chasing the market" or "tight stop losses" based on market volatility.

## Getting Started

1. Run `npm run dev` to start the development server.
2. Visit the app and log in to begin the onboarding process.
3. Use the **Simulator** tab to place your first SimTrade.
