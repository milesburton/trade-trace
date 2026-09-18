import { Context } from "oak";
import { verify } from "djwt";
import { config } from "std/dotenv/mod.ts";

const env = await config();
const JWT_SECRET = env.JWT_SECRET || "change-me-in-production";

export interface AuthContext extends Context {
  userId?: string;
}

export async function authenticateToken(ctx: AuthContext, next: () => Promise<void>) {
  const auth = ctx.request.headers.get("authorization");

  if (!auth?.startsWith("Bearer ")) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Missing authorization token" };
    return;
  }

  try {
    const token = auth.slice(7);
    const payload = await verify(token, JWT_SECRET) as { sub: string };
    ctx.userId = payload.sub;
    await next();
  } catch (err) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Invalid token" };
  }
}
