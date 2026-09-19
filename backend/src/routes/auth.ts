import { Router } from "oak";
import { hash, compare } from "bcrypt";
import { create } from "djwt";
import { config } from "../config.ts";
import { query } from "../db/setup.ts";

const JWT_SECRET = config.jwt_secret;

const router = new Router();

router.post("/register", async (ctx) => {
  const body = await ctx.request.body().value;
  const { email, password, fullName } = body;

  if (!email || !password) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Email and password required" };
    return;
  }

  try {
    const hashedPassword = await hash(password);
    const result = await query(
      "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name",
      [email, hashedPassword, fullName || null]
    );

    const user = result[0];
    const token = await create(
      { alg: "HS512", typ: "JWT" },
      { sub: user.id, email: user.email },
      JWT_SECRET
    );

    ctx.response.body = {
      user: { id: user.id, email: user.email, fullName: user.full_name },
      token,
    };
  } catch (err) {
    ctx.response.status = 409;
    ctx.response.body = { error: "User already exists" };
  }
});

router.post("/login", async (ctx) => {
  const body = await ctx.request.body().value;
  const { email, password } = body;

  if (!email || !password) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Email and password required" };
    return;
  }

  try {
    const result = await query(
      "SELECT id, email, password_hash, full_name FROM users WHERE email = $1",
      [email]
    );

    const user = result[0];
    if (!user || !(await compare(password, user.password_hash))) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid credentials" };
      return;
    }

    const token = await create(
      { alg: "HS512", typ: "JWT" },
      { sub: user.id, email: user.email },
      JWT_SECRET
    );

    ctx.response.body = {
      user: { id: user.id, email: user.email, fullName: user.full_name },
      token,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: "Login failed" };
  }
});

export default router;
