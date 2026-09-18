# Backend Integration Guide

Complete guide to get Trade Trace backend + frontend running locally and deployed.

## Local Development (5 minutes)

### Step 1: Start PostgreSQL

```bash
# Option A: Docker (recommended)
docker run -d \
  --name trade-trace-db \
  -e POSTGRES_DB=trade_trace \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:15-alpine

# Option B: Local PostgreSQL
createdb trade_trace
```

### Step 2: Start Backend (Deno)

```bash
cd backend

# Create .env
cat > .env << 'EOF'
PORT=8000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/trade_trace
JWT_SECRET=dev-secret-change-in-production
FRONTEND_URL=http://localhost:5173
SEED_DB=true
EOF

# Start dev server (auto-reloads on changes)
deno task dev

# You should see:
# ✅ Database initialized
# ✅ Created demo users
# ✅ Created demo tradesmen
# ✨ Database seeded successfully!
# 🚀 Server starting on http://localhost:8000
```

### Step 3: Start Frontend (React/Vite)

```bash
cd frontend

# Create .env.local
echo "VITE_API_URL=http://localhost:8000" > .env.local

# Install dependencies (one-time)
npm install

# Start dev server
npm run dev

# Opens http://localhost:5173
```

### Step 4: Test It Works

**Backend health check**:
```bash
curl http://localhost:8000/health
# {"status":"ok","version":"0.1.0","timestamp":"..."}
```

**List tradesmen** (with demo data):
```bash
curl http://localhost:8000/api/tradesmen
# Returns 4 tradesmen with ratings, verified status, etc.
```

**Register user**:
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser@example.com",
    "password":"testpass123",
    "fullName":"Test User"
  }'
# Returns: {user: {id, email, fullName}, token: "eyJ..."}
```

**Login and use token**:
```bash
TOKEN=$(curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"testpass123"}' \
  | jq -r '.token')

curl http://localhost:8000/api/tradesmen \
  -H "Authorization: Bearer $TOKEN"
```

## Frontend Integration

The React frontend is fully integrated with the backend:

### Authentication Flow
```typescript
// src/api/client.ts already has login/register methods
await apiClient.login("user@example.com", "password")
// Automatically stores token in localStorage
// All subsequent requests include Authorization header
```

### API Methods Available

**Tradesmen**:
- `getTradesmen()` - List all
- `getTradesman(id)` - Get one
- `createTradesman(data)` - Create (authenticated)
- `updateTradesman(id, data)` - Update (authenticated)
- `getGraph(tradesman_id)` - Get relationships

**Reviews**:
- `getReviewsForTradesman(tradesman_id)` - List for tradesman
- `submitReview(data)` - Create (authenticated)
- `updateReview(id, data)` - Update (authenticated)
- `deleteReview(id)` - Delete (authenticated)

**Auth**:
- `login(email, password)` - Login
- `register(email, password, fullName)` - Register

### Example Usage in Components

```typescript
import { apiClient } from '@/api/client'

export function TradesmenList() {
  const [tradesmen, setTradesmen] = useState([])

  useEffect(() => {
    apiClient.getTradesmen().then(data => 
      setTradesmen(data.tradesmen)
    )
  }, [])

  return tradesmen.map(t => (
    <div key={t.id}>
      <h3>{t.name}</h3>
      <p>Rating: {t.rating}/5</p>
      <p>Type: {t.trade_type}</p>
    </div>
  ))
}
```

## Deployment

### Backend Deployment (Deno Deploy)

1. **Push to GitHub** (already done)
   ```bash
   git push origin main
   ```

2. **Deploy to Deno Deploy**:
   - Go to https://dash.deno.com
   - Connect GitHub account
   - Select `milesburton/trade-trace` repository
   - Select `backend/src/main.ts` as entry point
   - Add environment variables:
     ```
     DATABASE_URL=postgresql://...prod...
     JWT_SECRET=<generate: openssl rand -hex 32>
     FRONTEND_URL=https://yourdomain.com
     PORT=8000
     ```
   - Deploy

3. **Update Frontend**:
   - Set `VITE_API_URL` to Deno Deploy URL (e.g., `https://trade-trace.deno.dev`)

### Frontend Deployment (Vercel/Netlify)

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
cd frontend
vercel --prod

# When prompted:
# - Project name: trade-trace
# - Root directory: frontend
# - Build command: npm run build
# - Output directory: dist
```

Set environment variables in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.deno.dev
```

#### Netlify

```bash
npm install -g netlify-cli

cd frontend
netlify deploy --prod --dir=dist
```

Build settings:
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: `VITE_API_URL=https://your-backend-url`

## Database Setup (Production)

### Using PostgreSQL Managed Service

**AWS RDS**:
```bash
# Create RDS PostgreSQL instance
# Get connection string: 
# postgresql://user:pass@your-db.rds.amazonaws.com:5432/trade_trace

# Run migrations (from backend directory)
SEED_DB=false deno run --allow-net --allow-env src/main.ts
# Sets up schema without demo data
```

**Vercel Postgres** (Easiest):
```bash
# Go to vercel.com → Storage → Create Database
# Copy connection string
# Add to Deno Deploy env vars as DATABASE_URL
```

## Environment Variables

### Backend (.env)

**Development**:
```env
PORT=8000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/trade_trace
JWT_SECRET=dev-secret-change-in-production
FRONTEND_URL=http://localhost:5173
SEED_DB=true
NODE_ENV=development
```

**Production**:
```env
PORT=8000
DATABASE_URL=postgresql://user:secure_pass@db.example.com:5432/trade_trace
JWT_SECRET=<generate: openssl rand -hex 32>
FRONTEND_URL=https://yourdomain.com
SEED_DB=false
NODE_ENV=production
```

### Frontend (.env.local / CI/CD)

**Development**:
```env
VITE_API_URL=http://localhost:8000
```

**Production**:
```env
VITE_API_URL=https://api.yourdomain.com
```

## Testing the Deployed Application

```bash
# Health check
curl https://api.yourdomain.com/health

# List tradesmen (public endpoint)
curl https://api.yourdomain.com/api/tradesmen

# Login
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"demo123"}'

# Create review (authenticated)
curl -X POST https://api.yourdomain.com/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "tradesman_id":"<id>",
    "rating":5,
    "comment":"Excellent work!"
  }'
```

## Troubleshooting

### "Cannot connect to database"
- ✅ PostgreSQL running? `pg_isready`
- ✅ DATABASE_URL correct? Check .env
- ✅ Database exists? `psql -l`
- ✅ Port 5432 open? Check firewall

### "CORS error in frontend"
- ✅ FRONTEND_URL set correctly in backend .env
- ✅ Origin matches exactly (http/https, port, domain)
- ✅ Backend running with `--allow-net`?

### "Invalid token" error
- ✅ Token expired? Re-login
- ✅ JWT_SECRET changed? Re-generate tokens
- ✅ Token format? Must be `Bearer <token>` in header

### "404 on /api/tradesmen"
- ✅ Backend running? Check http://localhost:8000/health
- ✅ Database has data? Run with SEED_DB=true first
- ✅ Frontend using correct API_URL? Check .env.local

## Next Steps

1. **Deploy backend** to Deno Deploy
2. **Deploy frontend** to Vercel/Netlify  
3. **Update frontend** .env with production API URL
4. **Test** the live application
5. **Monitor** with Deno Deploy & Vercel dashboards
6. **Set up GitHub Actions** for auto-deployment

## Quick Reference

| Service | Status | URL |
|---------|--------|-----|
| Backend API | ✅ Running | http://localhost:8000 |
| Frontend | ✅ Running | http://localhost:5173 |
| Database | ✅ Connected | postgresql://localhost:5432/trade_trace |
| Demo Data | ✅ Loaded | 4 tradesmen, 5 reviews |

## Support

- Backend README: `backend/README.md`
- Frontend docs: `frontend/` directory
- Full documentation: `docs/` (Astro site)
