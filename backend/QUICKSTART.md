# Trade Trace Backend - Quick Start

## Prerequisites

- Node.js 20+ installed
- PostgreSQL database running
- Git

## Setup

1. **Clone/navigate to the project:**
   ```bash
   cd /home/miles/code/trade-trace/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your PostgreSQL connection details
   ```

   Example `.env`:
   ```
   PORT=8000
   DATABASE_URL=postgresql://user:password@localhost:5432/trade_trace
   JWT_SECRET=your-super-secret-key-change-in-production
   FRONTEND_URL=http://localhost:5173
   SEED_DB=false
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   The server should output:
   ```
   ✅ Database initialized
   🚀 Server starting on http://localhost:8000
   ```

## API Endpoints

### Health Check
- **GET** `/health` - Returns server status

### Authentication
- **POST** `/api/auth/register` - Register new user
  ```json
  { "email": "user@example.com", "password": "pass123", "fullName": "John Doe" }
  ```
- **POST** `/api/auth/login` - Login user
  ```json
  { "email": "user@example.com", "password": "pass123" }
  ```

### Tradesmen
- **GET** `/api/tradesmen` - List all tradesmen
- **GET** `/api/tradesmen/:id` - Get specific tradesman
- **POST** `/api/tradesmen` - Create tradesman (requires auth)
- **PUT** `/api/tradesmen/:id` - Update tradesman (requires auth)
- **GET** `/api/tradesmen/:id/graph` - Get tradesman relationship graph

### Reviews
- **GET** `/api/reviews/tradesman/:tradesman_id` - Get reviews for a tradesman
- **POST** `/api/reviews` - Create review (requires auth)
- **PUT** `/api/reviews/:id` - Update review (requires auth)
- **DELETE** `/api/reviews/:id` - Delete review (requires auth)

## Seeding Demo Data

Set `SEED_DB=true` in your `.env` file and restart the server to populate demo data:
- 2 demo users
- 4 demo tradesmen
- 5 demo reviews
- 4 demo relationships
- 4 blockchain records

## Testing Endpoints with cURL

```bash
# Health check
curl http://localhost:8000/health

# Register user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password123","fullName":"Test User"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password123"}'

# List tradesmen
curl http://localhost:8000/api/tradesmen
```

## Production Build

```bash
npm run build
npm start
```

## Troubleshooting

### Database connection error
- Ensure PostgreSQL is running
- Verify DATABASE_URL is correct
- Check credentials

### Port already in use
- Change PORT in .env
- Or kill the process: `lsof -ti:8000 | xargs kill`

### CORS errors
- Ensure FRONTEND_URL in .env matches your frontend
- Verify credentials: true in CORS config

## Migration from Deno

This backend was converted from Deno to Node.js/Express. See `MIGRATION_NOTES.md` for details.

All endpoints and database operations are identical to the Deno version.
