import { Router } from "oak";
import { authenticateToken } from "../middleware/auth.ts";
import { query } from "../db/setup.ts";

const router = new Router();

// Get reviews for a tradesman
router.get("/tradesman/:tradesman_id", async (ctx) => {
  const { tradesman_id } = ctx.params;
  try {
    const result = await query(
      `SELECT id, tradesman_id, rating, comment, verified, created_at
       FROM reviews
       WHERE tradesman_id = $1
       ORDER BY created_at DESC`,
      [tradesman_id]
    );
    ctx.response.body = { reviews: result };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

// Create review (authenticated)
router.post("/", authenticateToken, async (ctx) => {
  const body = await ctx.request.body().value;
  const { tradesman_id, rating, comment } = body;

  if (!tradesman_id || !rating || rating < 1 || rating > 5) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Valid tradesman_id and rating (1-5) required" };
    return;
  }

  try {
    const result = await query(
      `INSERT INTO reviews (tradesman_id, reviewer_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING id, tradesman_id, rating, comment, verified, created_at`,
      [tradesman_id, ctx.userId, rating, comment || null]
    );

    // Update tradesman rating average
    await query(
      `UPDATE tradesmen
       SET rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE tradesman_id = $1)
       WHERE id = $1`,
      [tradesman_id]
    );

    ctx.response.status = 201;
    ctx.response.body = { review: result[0] };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

// Update review (authenticated)
router.put("/:id", authenticateToken, async (ctx) => {
  const { id } = ctx.params;
  const body = await ctx.request.body().value;
  const { rating, comment } = body;

  try {
    const result = await query(
      `UPDATE reviews
       SET rating = $1, comment = $2, updated_at = NOW()
       WHERE id = $3 AND reviewer_id = $4
       RETURNING id, tradesman_id, rating, comment, verified, updated_at`,
      [rating, comment, id, ctx.userId]
    );

    if (result.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Review not found or not owned by user" };
      return;
    }

    ctx.response.body = { review: result[0] };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

// Delete review (authenticated)
router.delete("/:id", authenticateToken, async (ctx) => {
  const { id } = ctx.params;

  try {
    const review = await query(
      `SELECT tradesman_id FROM reviews WHERE id = $1 AND reviewer_id = $2`,
      [id, ctx.userId]
    );

    if (review.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Review not found or not owned by user" };
      return;
    }

    await query("DELETE FROM reviews WHERE id = $1", [id]);

    // Update tradesman rating
    const tradesman_id = review[0].tradesman_id;
    await query(
      `UPDATE tradesmen
       SET rating = COALESCE((SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE tradesman_id = $1), 0)
       WHERE id = $1`,
      [tradesman_id]
    );

    ctx.response.body = { deleted: true };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { error: err.message };
  }
});

export default router;
