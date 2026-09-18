# Trade Trace Backend

Production-ready Deno backend API for Trade Trace - a blockchain-based tradesman verification platform following VETA standards.

## Stack

- **Runtime**: Deno 2.x
- **Framework**: Oak (Express-like middleware)
- **Database**: PostgreSQL 14+
- **Auth**: JWT + bcrypt
- **CORS**: Enabled for frontend integration

## Quick Start

### Prerequisites

- Deno 2.x ([install](https://deno.land/manual/getting_started/installation))
- PostgreSQL 14+ running locally or via Docker
- Git

### Setup

1. **Clone and enter backend directory**:
```bash
cd trade-trace/backend
```

2. **Configure environment**:
```bash
cp .env.example .env
# Edit .env with your PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/trade_trace
JWT_SECRET=your-secure-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173
PORT=8000
SEED_DB=true  # Load demo data on first run
```

3. **Start PostgreSQL**:
```bash
# Via Docker (recommended)
docker run -d \
  -e POSTGRES_DB=trade_trace \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:15-alpine
```

4. **Run development server**:
```bash
deno task dev
# Server runs on http://localhost:8000
# Auto-reloads on file changes
```

## API Endpoints

### Health Check
- `GET /health` → `{ status: "ok", version: "0.1.0" }`

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Login and get JWT token

### Tradesmen
- `GET /api/tradesmen` - List all tradesmen
- `GET /api/tradesmen/:id` - Get tradesman details
- `POST /api/tradesmen` - Create new tradesman (authenticated)
- `PUT /api/tradesmen/:id` - Update tradesman (authenticated)
- `GET /api/tradesmen/:id/graph` - Get relationship graph

### Reviews
- `GET /api/reviews/tradesman/:tradesman_id` - Get reviews for tradesman
- `POST /api/reviews` - Submit review (authenticated)
- `PUT /api/reviews/:id` - Update review (authenticated)
- `DELETE /api/reviews/:id` - Delete review (authenticated)

## Authentication

All authenticated endpoints require `Authorization: Bearer <token>` header.

**Register**:
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secure123","fullName":"Test User"}'
```

**Login**:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secure123"}'
```

**Use token**:
```bash
curl -X GET http://localhost:8000/api/tradesmen \
  -H "Authorization: Bearer <your_token_here>"
```

## Database Schema

### Users
- id, email, password_hash, full_name, created_at, updated_at

### Tradesmen
- id, user_id, name, trade_type, description, rating, verified, compliance_status, location, contact_email, phone, created_at, updated_at

### Reviews
- id, tradesman_id, reviewer_id, rating, comment, verified, created_at, updated_at

### Blockchain Records
- id, tradesman_id, transaction_hash, block_number, status, data, created_at

### Relationships
- id, from_tradesman_id, to_tradesman_id, relationship_type, strength, created_at

## Commands

```bash
deno task dev        # Start dev server with auto-reload
deno task start      # Run production server
deno task test       # Run tests
deno task lint       # Lint code
deno task format     # Format code
deno task check      # Type check
```

## Security

- ✅ Password hashing with bcrypt (cost: 12)
- ✅ JWT authentication (HS512)
- ✅ CORS enabled with origin whitelist
- ✅ Environment-based secrets
- ✅ Database parameterized queries
- ⚠️ Change JWT_SECRET in production
- ⚠️ Use HTTPS in production
- ⚠️ Set secure DATABASE_URL in production

## Deployment

### Deno Deploy (Recommended)

```bash
deno run -A --allow-env=DATABASE_URL,JWT_SECRET,FRONTEND_URL,PORT src/main.ts
```

### Docker

```dockerfile
FROM denoland/deno:latest
WORKDIR /app
COPY . .
ENV ALLOW_ENV=DATABASE_URL,JWT_SECRET,FRONTEND_URL,PORT
CMD ["deno", "run", "-A", "--allow-env=DATABASE_URL,JWT_SECRET,FRONTEND_URL,PORT", "src/main.ts"]
```

### Environment Variables (Production)

```
DATABASE_URL=postgresql://prod-user:prod-pass@prod-db:5432/trade_trace
JWT_SECRET=<generate-with: openssl rand -hex 32>
FRONTEND_URL=https://yourdomain.com
PORT=8000
NODE_ENV=production
```

## Development

- Format code: `deno task format`
- Lint: `deno task lint`
- Type check: `deno task check`
- All dependencies managed in `deno.json`

## License

MIT
