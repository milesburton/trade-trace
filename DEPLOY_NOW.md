# Deploy Trade Trace in 10 Minutes

This guide automates deployment to Deno Deploy + Vercel + Vercel Postgres.

## Prerequisites

- Vercel account (free) → https://vercel.com
- Deno Deploy account (free) → https://deno.com/deploy
- GitHub access to https://github.com/milesburton/trade-trace

---

## Step 1: Create Vercel Postgres Database (2 min)

1. Go to https://vercel.com/storage/postgres
2. Click **Create Database**
3. Name: `trade-trace`
4. Region: Choose closest to you
5. **COPY** the connection string that looks like:
   ```
   postgresql://default:XXXXX@XXXXX.postgres.vercel-storage.com:5432/verceldb
   ```

**⚠️ KEEP THIS SECRET - You'll need it in Step 3**

---

## Step 2: Deploy Frontend to Vercel (3 min)

### Option A: GUI (Easiest)

1. Go to https://vercel.com/new
2. Import `milesburton/trade-trace` repository
3. Framework: **Vite**
4. Root directory: `frontend/`
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**
8. **Wait for deployment to complete** (~2 min)
9. Copy the deployment URL (e.g., `https://trade-trace-xyz.vercel.app`)

### Option B: CLI

```bash
npm install -g vercel
cd frontend
vercel --prod
# Follow prompts, use same settings as above
```

---

## Step 3: Deploy Backend to Deno Deploy (3 min)

1. Go to https://dash.deno.com
2. Click **New Project**
3. Import from GitHub: `milesburton/trade-trace`
4. Entry point: `backend/src/main.ts`
5. Click **Deploy**
6. **Environment Variables** (click to add):
   ```
   DATABASE_URL = postgresql://...from-step-1...
   JWT_SECRET = openssl rand -hex 32
   FRONTEND_URL = https://your-vercel-url.vercel.app
   SEED_DB = true
   PORT = 8000
   ```
   
   Generate JWT_SECRET:
   ```bash
   openssl rand -hex 32
   # Copy output into Deno Deploy
   ```

7. Click **Save**
8. **Wait for deployment** (~1 min)
9. Copy the deployment URL (e.g., `https://trade-trace-xyz.deno.dev`)

---

## Step 4: Connect Frontend to Backend (2 min)

Go back to Vercel project:

1. Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL = https://trade-trace-xyz.deno.dev
   ```
3. Redeploy: Click **Deployments** → Recent → **Redeploy**

---

## Step 5: Test It Works (1 min)

```bash
# Backend health
curl https://your-backend-url.deno.dev/health
# Should return: {"status":"ok",...}

# Frontend
Open https://your-vercel-app.vercel.app
# Should load the app with data from backend

# Test login
Email: john@example.com
Password: demo123
```

---

## Full URLs After Deployment

| Service | URL |
|---------|-----|
| Frontend | https://your-vercel-app.vercel.app |
| Backend API | https://your-backend.deno.dev |
| Database | Vercel Postgres (internal) |
| GitHub | https://github.com/milesburton/trade-trace |

---

## Environment Variables Summary

**Backend (Deno Deploy)**:
```
DATABASE_URL=postgresql://...
JWT_SECRET=<generated>
FRONTEND_URL=https://your-vercel-app.vercel.app
SEED_DB=true
PORT=8000
```

**Frontend (Vercel)**:
```
VITE_API_URL=https://your-backend.deno.dev
```

---

## Troubleshooting

### "Cannot connect to database"
- ✓ DATABASE_URL copied correctly?
- ✓ No typos in connection string?
- ✓ Vercel Postgres database created?

### "CORS error in frontend"
- ✓ FRONTEND_URL in backend matches exactly (including https://)
- ✓ Redeploy frontend after changing VITE_API_URL?

### "Login doesn't work"
- ✓ Backend deployed with SEED_DB=true?
- ✓ Check database has tables: SELECT * FROM users;
- ✓ Try demo credentials: john@example.com / demo123

### "Blank page on frontend"
- ✓ Check browser console for errors
- ✓ Is VITE_API_URL set correctly?
- ✓ Redeploy frontend after env var change

---

## After Deployment

✅ **Verify**:
- [ ] Frontend loads at vercel URL
- [ ] Backend responds to /health
- [ ] Can login with demo account
- [ ] Dashboard shows tradesmen data
- [ ] Reviews page works
- [ ] Can create new review (requires login)

✅ **Monitor**:
- Vercel Dashboard: https://vercel.com
- Deno Deploy Dashboard: https://dash.deno.com
- Database: Vercel console

✅ **Next**:
- Set custom domain
- Enable analytics
- Configure error tracking
- Set up monitoring alerts

---

## Complete Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Frontend: React + Vite                                       │
│ Deployed: Vercel CDN                                         │
│ URL: https://your-vercel-app.vercel.app                      │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTPS
                   ↓
┌─────────────────────────────────────────────────────────────┐
│ Backend: Deno + Oak                                          │
│ Deployed: Deno Deploy                                        │
│ URL: https://your-backend.deno.dev                           │
└──────────────────┬──────────────────────────────────────────┘
                   │ PostgreSQL
                   ↓
┌─────────────────────────────────────────────────────────────┐
│ Database: PostgreSQL 14                                      │
│ Hosted: Vercel Postgres                                      │
│ Tables: users, tradesmen, reviews, blockchain, relationships│
└─────────────────────────────────────────────────────────────┘
```

---

## Support

- Backend docs: `backend/README.md`
- Integration guide: `BACKEND_INTEGRATION.md`
- Architecture: `INDEX.md`
- Issues: https://github.com/milesburton/trade-trace/issues

---

**Ready? Follow the 5 steps above and you'll be live in 10 minutes!** 🚀
