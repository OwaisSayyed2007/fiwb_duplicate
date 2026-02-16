# FIWB AI - Quick Reference

## 🚀 Running Locally

### Start Everything:
```bash
# Terminal 1: Landing Page
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate"
npm run dev
# → http://localhost:8080

# Terminal 2: Beta App (Frontend + Backend)
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local"
./run_locally.sh
# → Frontend: http://localhost:3000
# → Backend: http://localhost:8001
```

## 📝 Add Beta User

```bash
# Edit the config file
nano "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-backend/app/beta_config.py"

# Add email to BETA_USERS list:
BETA_USERS = [
    "user@example.com",  # Add new users here
]

# Save and restart backend (auto-reloads)
```

## 🌐 Production URLs

- **Landing Page**: `https://fiwbai.xyz`
- **Beta App**: `https://beta.fiwbai.xyz`

## 📂 Important Files

- **Beta Button**: `/src/components/Navbar.tsx` (line 73-82)
- **Beta Access Control**: `/fiwb-local/fiwb-backend/app/api/auth.py` (line 99-105)
- **Beta User List**: `/fiwb-local/fiwb-backend/app/beta_config.py`

## 🔍 Check Logs

```bash
# Backend logs
tail -f "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-backend/backend.log"

# Frontend logs
tail -f "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-frontend/frontend.log"
```

## 🛑 Stop Services

```bash
# Stop backend & frontend (from run_locally.sh output)
kill 12136 12521

# Or kill all
pkill -f "uvicorn app.main:app"
pkill -f "next dev"
```

## 📚 Full Documentation

- `SETUP_SUMMARY.md` - Complete overview
- `DEPLOYMENT_GUIDE.md` - Deploy to production
- `BETA_USER_MANAGEMENT.md` - Manage beta users
