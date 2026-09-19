import { Application, Router } from "oak";
import { oakCors } from "cors";

import { setupDatabase } from "./db/setup.ts";
import { seedDatabase } from "./db/seed.ts";
import tradesmemRouter from "./routes/tradesmen.ts";
import reviewsRouter from "./routes/reviews.ts";
import authRouter from "./routes/auth.ts";
import { config } from "./config.ts";

const app = new Application();
const PORT = config.port;

// CORS middleware
app.use(
  oakCors({
    origin: config.frontend_url,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

// Health check endpoint
const healthRouter = new Router();
healthRouter.get("/health", (ctx) => {
  ctx.response.body = {
    status: "ok",
    version: "0.1.0",
    timestamp: new Date().toISOString(),
  };
});

// API routes
const apiRouter = new Router({ prefix: "/api" });
apiRouter.use("/auth", authRouter.routes(), authRouter.allowedMethods());
apiRouter.use("/tradesmen", tradesmemRouter.routes(), tradesmemRouter.allowedMethods());
apiRouter.use("/reviews", reviewsRouter.routes(), reviewsRouter.allowedMethods());

app.use(healthRouter.routes(), healthRouter.allowedMethods());
app.use(apiRouter.routes(), apiRouter.allowedMethods());

// Error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = err.status || 500;
    ctx.response.body = {
      error: err.message || "Internal Server Error",
      status: ctx.response.status,
    };
  }
});

// Initialize database
try {
  await setupDatabase();
  console.log("✅ Database initialized");

  // Seed demo data if SEED_DB env var is set
  if (config.seed_db) {
    await seedDatabase();
  }
} catch (err) {
  console.error("❌ Database initialization failed:", err);
  Deno.exit(1);
}

console.log(`🚀 Server starting on http://localhost:${PORT}`);
await app.listen({ port: PORT });
