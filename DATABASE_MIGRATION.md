# Database Migration Guide

## Quick Start (SQLite for Testing)

Run these commands in PowerShell from the `Trade-Tutor` directory:

```powershell
# Set environment variables
$env:DATABASE_URL = "sqlite:///trade_tutor.db"
$env:SECRET_KEY = "dev-secret-key-change-in-production"
$env:FLASK_APP = "run.py"

# Initialize database (first time only)
flask db init

# Create migration for new fields
flask db migrate -m "Add user tier and RTT fields"

# Apply migration
flask db upgrade

# Start Flask server
python run.py
```

## What Changed in the Database

### User Model Updates
Added these fields to the `users` table:
- `tier` (String) - User subscription level: 'free', 'gold', 'premium'
- `rtt_enabled` (Boolean) - Whether RTT mode is currently active
- `rtt_points` (Integer) - Accumulated points from RTT coaching

### Migration SQL Preview
```sql
ALTER TABLE users ADD COLUMN tier VARCHAR(20) DEFAULT 'free' NOT NULL;
ALTER TABLE users ADD COLUMN rtt_enabled BOOLEAN DEFAULT 0;
ALTER TABLE users ADD COLUMN rtt_points INTEGER DEFAULT 0;
```

## Testing After Migration

### 1. Check existing users
```python
# In Flask shell (run: flask shell)
from app.models.user import User
users = User.query.all()
for u in users:
    print(f"{u.email}: tier={u.tier}, points={u.rtt_points}")
```

### 2. Create test users with different tiers
```python
from app.models.user import User
from app.models.portfolio import Portfolio
from app.extensions import db, bcrypt

# Free user
free_user = User(
    email="free@test.com",
    password_hash=bcrypt.generate_password_hash("password").decode('utf-8'),
    first_name="Free",
    last_name="User",
    tier="free"
)
db.session.add(free_user)
db.session.commit()

# Create portfolio
portfolio = Portfolio(user_id=free_user.id, balance=1000.0)
db.session.add(portfolio)
db.session.commit()

# Gold user
gold_user = User(
    email="gold@test.com",
    password_hash=bcrypt.generate_password_hash("password").decode('utf-8'),
    first_name="Gold",
    last_name="User",
    tier="gold",
    rtt_enabled=True
)
db.session.add(gold_user)
db.session.commit()

portfolio = Portfolio(user_id=gold_user.id, balance=100000.0)
db.session.add(portfolio)
db.session.commit()

# Premium user
premium_user = User(
    email="premium@test.com",
    password_hash=bcrypt.generate_password_hash("password").decode('utf-8'),
    first_name="Premium",
    last_name="User",
    tier="premium",
    rtt_enabled=True,
    rtt_points=150
)
db.session.add(premium_user)
db.session.commit()

portfolio = Portfolio(user_id=premium_user.id, balance=1000000.0)
db.session.add(portfolio)
db.session.commit()

print("✅ Test users created!")
print("Free: free@test.com / password")
print("Gold: gold@test.com / password")
print("Premium: premium@test.com / password")
```

## Production PostgreSQL Setup

When deploying to production (Vercel):

### Environment Variables
```bash
DATABASE_URL=postgresql://username:password@host:5432/database_name
SECRET_KEY=your-actual-secret-key-here
FLASK_ENV=production
```

### Migration Command
```bash
flask db upgrade
```

## Rollback (if needed)

If something goes wrong:
```bash
# Rollback one migration
flask db downgrade

# Or rollback to specific version
flask db downgrade <revision_id>
```

## Verify Migration Success

### Check tables exist
```python
from app.extensions import db
print(db.engine.table_names())
# Should include: users, portfolios, trades, lessons, lesson_progress, payments
```

### Check user tier field
```python
from app.models.user import User
user = User.query.first()
print(f"User tier: {user.tier}")  # Should print: 'free'
print(f"RTT enabled: {user.rtt_enabled}")  # Should print: False
print(f"RTT points: {user.rtt_points}")  # Should print: 0
```

## Troubleshooting

### Error: "flask: command not found"
```powershell
# Make sure you're in the virtual environment (if using one)
# Or use python -m flask instead:
python -m flask db upgrade
```

### Error: "Can't locate revision"
```powershell
# Delete migrations folder and start fresh
Remove-Item -Recurse -Force migrations
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### Error: "Column already exists"
This means the migration was partially applied. Options:
1. Drop the database and start fresh (dev only!)
2. Manually remove the existing column
3. Edit the migration file to skip existing columns

## Next Steps After Migration

1. **Start both servers:**
   ```powershell
   # Terminal 1 - Flask backend
   cd Trade-Tutor
   python run.py

   # Terminal 2 - React frontend
   cd client
   npm run dev
   ```

2. **Test the Market page:**
   - Visit http://localhost:5173/market
   - Should see 50 assets
   - Try searching, filtering by category
   - Check tier badges (all should show as accessible if logged in as premium)

3. **Test RTT Mode:**
   - Go to Simulator
   - Toggle RTT switch
   - Should see coaching signal appear
   - Wait 30 seconds → Signal refreshes

4. **Test tier restrictions:**
   - Login as free user → Only 2 assets accessible in Market
   - Try to trade locked asset → Alert shows
   - Upgrade to premium → All assets unlock

## Migration Checklist

- [ ] Backup existing database (if any)
- [ ] Set DATABASE_URL environment variable
- [ ] Run `flask db init` (first time only)
- [ ] Run `flask db migrate`
- [ ] Review migration file in `migrations/versions/`
- [ ] Run `flask db upgrade`
- [ ] Verify users table has new columns
- [ ] Test registration creates user with tier='free'
- [ ] Test Market page loads 50 assets
- [ ] Test RTT toggle in Simulator
- [ ] Commit migration files to git

---

**Ready to go!** 🚀 Once you run these migrations, everything will work end-to-end.
