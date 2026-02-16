# FIWB AI - Deployment Guide

## Domain Structure

Your domain `fiwbai.xyz` will host two applications:

1. **Main Landing Page**: `https://fiwbai.xyz`
   - Repository: `ignite-your-idea-01`
   - Purpose: Public-facing landing page with waitlist
   
2. **Beta Application**: `https://beta.fiwbai.xyz`
   - Repository: `FIWB-A-LOCAL`
   - Purpose: Full application for selected beta users only

---

## Deployment Steps

### 1. Deploy Landing Page (First Repo)

**Platform: Vercel (Recommended)**

```bash
# Navigate to the landing page repo
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate"

# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to Vercel
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set project name: fiwb-landing
# - Framework preset: Vite
# - Build command: npm run build
# - Output directory: dist
```

**Domain Configuration:**
- In Vercel dashboard, go to Project Settings → Domains
- Add custom domain: `fiwbai.xyz`
- Add DNS records as instructed by Vercel

---

### 2. Deploy Beta Application (Second Repo)

**Platform: Vercel (Frontend) + Railway/Render (Backend)**

#### Backend Deployment (Railway/Render):

```bash
# Navigate to backend
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-backend"

# Option A: Railway
# 1. Go to railway.app
# 2. Create new project from GitHub repo
# 3. Select FIWB-A-LOCAL repo
# 4. Set root directory: fiwb-backend
# 5. Add environment variables (see below)

# Option B: Render
# 1. Go to render.com
# 2. Create new Web Service
# 3. Connect GitHub repo: FIWB-A-LOCAL
# 4. Set root directory: fiwb-backend
# 5. Build command: pip install -r requirements.txt
# 6. Start command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Backend Environment Variables:**
```env
DATABASE_URL=<your-postgres-database-url>
SECRET_KEY=<generate-a-secure-secret-key>
GOOGLE_CLIENT_ID=<your-google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<your-google-oauth-secret>
OPENAI_API_KEY=<your-openai-api-key>
FRONTEND_URL=https://beta.fiwbai.xyz
```

#### Frontend Deployment (Vercel):

```bash
# Navigate to frontend
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-frontend"

# Deploy to Vercel
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set project name: fiwb-beta
# - Framework preset: Next.js
# - Build command: npm run build
# - Output directory: .next
```

**Frontend Environment Variables (in Vercel):**
```env
NEXT_PUBLIC_API_URL=<your-backend-url-from-railway-or-render>
```

**Domain Configuration:**
- In Vercel dashboard for fiwb-beta project
- Go to Project Settings → Domains
- Add custom domain: `beta.fiwbai.xyz`
- Add DNS records as instructed by Vercel

---

## DNS Configuration

In your domain registrar (where you bought `fiwbai.xyz`):

### For Main Domain (fiwbai.xyz):
```
Type: A Record
Name: @
Value: <Vercel IP from landing page project>

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For Beta Subdomain (beta.fiwbai.xyz):
```
Type: CNAME
Name: beta
Value: cname.vercel-dns.com
```

---

## Access Control for Beta Users

To restrict beta access to selected users, you have several options:

### Option 1: Simple Password Protection
Add a password gate to the beta app's login page.

### Option 2: Email Whitelist
Modify the backend authentication to only allow specific email addresses:

```python
# In fiwb-backend/app/auth.py or similar
BETA_USERS = [
    "user1@example.com",
    "user2@example.com",
    # Add more beta users
]

def verify_beta_access(email: str):
    if email not in BETA_USERS:
        raise HTTPException(status_code=403, detail="Beta access not granted")
```

### Option 3: Invitation Codes
Generate unique invitation codes for beta users.

---

## Testing Locally

Before deploying, test both apps locally:

```bash
# Terminal 1: Landing page
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate"
npm run dev
# Runs on http://localhost:8080

# Terminal 2: Beta backend
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-backend"
source venv/bin/activate
uvicorn app.main:app --reload --port 8001

# Terminal 3: Beta frontend
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-frontend"
npm run dev
# Runs on http://localhost:3000
```

---

## Post-Deployment Checklist

- [ ] Landing page accessible at `https://fiwbai.xyz`
- [ ] Beta app accessible at `https://beta.fiwbai.xyz`
- [ ] Beta button on landing page redirects correctly
- [ ] SSL certificates active (HTTPS working)
- [ ] Backend API connected to frontend
- [ ] Database connected and migrations run
- [ ] Google OAuth configured with correct redirect URIs
- [ ] Environment variables set correctly
- [ ] Beta access control implemented
- [ ] Error monitoring setup (Sentry recommended)

---

## Maintenance

### Update Landing Page:
```bash
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate"
git pull
vercel --prod
```

### Update Beta App:
```bash
# Frontend
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-frontend"
git pull
vercel --prod

# Backend - push to GitHub, Railway/Render will auto-deploy
cd "/Users/owaissayyed/Github Repos/FIWB Duplicate/fiwb-local/fiwb-backend"
git pull
# Railway/Render will automatically redeploy
```

---

## Support

For issues:
- Landing page: Check Vercel deployment logs
- Beta frontend: Check Vercel deployment logs
- Beta backend: Check Railway/Render logs
- DNS issues: Check domain registrar settings

---

## Cost Estimate

- **Vercel**: Free tier (both projects)
- **Railway**: ~$5-20/month (backend + database)
- **Domain**: ~$10-15/year
- **Total**: ~$10-25/month + domain cost
