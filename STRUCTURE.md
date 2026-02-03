# Trade-Tutor Project Structure

## ✅ Clean Architecture (Updated: Feb 2026)

This project uses **Flask (Python)** for the backend and **React + Vite** for the frontend.

---

## 📁 Active Folders

### **Backend (Flask)**
```
app/
├── __init__.py          # Flask app factory
├── config.py            # Configuration (uses trade_tutor.db by default)
├── extensions.py        # Flask extensions (SQLAlchemy, etc.)
├── blueprints/          # API route modules
│   ├── api/            # Core API endpoints
│   ├── auth/           # Authentication routes
│   ├── core/           # Core functionality
│   ├── lessons/        # Lesson system
│   └── trading/        # Trading simulator
├── models/             # SQLAlchemy models
│   ├── user.py
│   ├── trade.py
│   ├── portfolio.py
│   ├── lesson.py
│   └── payment.py
└── services/           # Business logic
    ├── market_data.py
    └── seed_lessons.py
```

### **Frontend (React + Vite)**
```
client/
├── src/
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── components/          # React components
│   │   ├── OrderForm.tsx
│   │   ├── RTTCoach.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TradingChart.tsx
│   │   ├── TradeList.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # React Query hooks
│   │   ├── use-auth.ts
│   │   ├── use-market.ts
│   │   ├── use-trades.ts
│   │   ├── use-portfolio.ts
│   │   └── use-lessons.ts
│   ├── lib/                 # Utilities
│   │   ├── queryClient.ts
│   │   ├── auth-utils.ts
│   │   └── utils.ts
│   └── pages/               # Route pages
│       ├── Landing.tsx
│       ├── Auth.tsx
│       ├── Simulator.tsx
│       ├── Dashboard.tsx
│       ├── Market.tsx
│       ├── Lessons.tsx
│       └── Portfolio.tsx
├── index.html
└── package.json             # Frontend dependencies
```

### **Shared Types (TypeScript)**
```
shared/
├── routes.ts            # API route definitions & Zod schemas
├── schema.ts            # Database schemas (for TypeScript)
└── models/
    ├── auth.ts          # User type definitions
    └── chat.ts          # Chat types
```

### **Database**
```
instance/
└── trade_tutor.db       # Single SQLite database file
```

### **Deployment (Vercel)**
```
api/
└── index.py             # Serverless Flask entry point
```

---

## 📦 Root Files

- **`package.json`** - Convenience scripts (runs client commands)
- **`run.py`** - Flask development server
- **`requirements.txt`** - Python dependencies
- **`vite.config.ts`** - Vite configuration (points to client/)
- **`tsconfig.json`** - TypeScript config (client + shared)
- **`tailwind.config.ts`** - Tailwind CSS config
- **`components.json`** - shadcn/ui config

---

## 🗄️ Archived/Legacy

The following folders were moved to `legacy/` (not used):

```
legacy/
├── server/              # Old TypeScript backend (replaced by Flask)
├── script/              # Old build scripts
└── drizzle.config.ts    # Old database config
```

These are kept for reference but **not actively used**.

---

## 🚀 Development Workflow

### **Start Backend (Flask)**
```bash
python run.py
```
Runs on: `http://127.0.0.1:5000`

Default database: `instance/trade_tutor.db` (auto-configured)

### **Start Frontend (Vite)**
```bash
npm run dev
# or from root:
cd client && npm run dev
```
Runs on: `http://localhost:5174` (or 5173)

### **Install Frontend Dependencies**
```bash
npm run client:install
# or:
cd client && npm install
```

### **Build for Production**
```bash
npm run build
# Output: dist/public/
```

---

## 🔧 Configuration

### **Database**
- Flask automatically uses `instance/trade_tutor.db`
- Override with: `$env:DATABASE_URL="sqlite:///path/to/db"`

### **CORS**
- Flask backend allows:
  - `http://localhost:5173`
  - `http://localhost:5174`
  - `http://localhost:3000`

### **API Proxy**
- Vite proxies `/api/*` to `http://localhost:5000`
- Configured in `vite.config.ts`

---

## ✅ What Changed (Cleanup Feb 2026)

1. **Moved unused TypeScript backend** to `legacy/`
2. **Removed root node_modules** (only client/ has dependencies)
3. **Updated root package.json** to convenience scripts only
4. **Set default database** to `instance/trade_tutor.db`
5. **Removed duplicate database** (`instance/app.db`)
6. **Updated tsconfig.json** to exclude legacy folder

---

## 📝 Notes

- **`shared/` is actively used** by React hooks for TypeScript types
- **No duplicate backends** - Flask is the only backend
- **Clean separation** - Python backend, React frontend
- **Single database** - `trade_tutor.db` stores all data
