import { Router } from "oak";
import { authenticateToken } from "../middleware/auth.ts";
import { query } from "../db/setup.ts";

const router = new Router();

// Get all tradesmen
router.get("/", async (ctx) => {
  try {
    const result = await query(`
      SELECT
        id, name, trade_type, description, rating, verified,
        compliance_status, location, contact_email, phone, created_at
      FROM tradesmen
      ORDER BY rating DESC
    `);
    ctx.response.body = { tradesmen: result };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

// Get single tradesman
router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  try {
    const result = await query(
      `SELECT
        id, user_id, name, trade_type, description, rating, verified,
        compliance_status, location, contact_email, phone, created_at, updated_at
      FROM tradesmen WHERE id = $1`,
      [id]
    );
    ctx.response.body = { tradesman: result[0] };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

// Create tradesman (authenticated)
router.post("/", authenticateToken, async (ctx) => {
  const body = await ctx.request.body().value;
  const { name, tradeType, description, location, contactEmail, phone } = body;

  try {
    const result = await query(
      `INSERT INTO tradesmen (user_id, name, trade_type, description, location, contact_email, phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, trade_type, rating, verified, compliance_status, created_at`,
      [ctx.userId, name, tradeType, description, location, contactEmail, phone]
    );

    ctx.response.status = 201;
    ctx.response.body = { tradesman: result[0] };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

// Update tradesman (authenticated)
router.put("/:id", authenticateToken, async (ctx) => {
  const { id } = ctx.params;
  const body = await ctx.request.body().value;
  const { name, description, location, contactEmail, phone } = body;

  try {
    const result = await query(
      `UPDATE tradesmen
       SET name = $1, description = $2, location = $3, contact_email = $4, phone = $5, updated_at = NOW()
       WHERE id = $6 AND user_id = $7
       RETURNING id, name, trade_type, rating, verified, compliance_status, updated_at`,
      [name, description, location, contactEmail, phone, id, ctx.userId]
    );

    if (result.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Tradesman not found or not owned by user" };
      return;
    }

    ctx.response.body = { tradesman: result[0] };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

// Get graph data for relationships
router.get("/:id/graph", async (ctx) => {
  const { id } = ctx.params;
  try {
    const tradesmen = await query(
      `SELECT id, name, rating, verified FROM tradesmen WHERE id = $1`,
      [id]
    );

    const relationships = await query(
      `SELECT from_tradesman_id, to_tradesman_id, relationship_type, strength
       FROM relationships
       WHERE from_tradesman_id = $1 OR to_tradesman_id = $1`,
      [id]
    );

    ctx.response.body = {
      nodes: tradesmen.map((t) => ({
        id: t.id,
        label: t.name,
        rating: t.rating,
        verified: t.verified,
      })),
      edges: relationships.map((r) => ({
        from: r.from_tradesman_id,
        to: r.to_tradesman_id,
        type: r.relationship_type,
        weight: r.strength,
      })),
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

export default router;
