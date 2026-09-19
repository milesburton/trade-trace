import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { query } from '../db/setup.js';

const router = express.Router();

// Get all tradesmen
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT
        id, name, trade_type, description, rating, verified,
        compliance_status, location, contact_email, phone, created_at
      FROM tradesmen
      ORDER BY rating DESC
    `);
    res.json({ tradesmen: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single tradesman
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      `SELECT
        id, user_id, name, trade_type, description, rating, verified,
        compliance_status, location, contact_email, phone, created_at, updated_at
      FROM tradesmen WHERE id = $1`,
      [id]
    );
    res.json({ tradesman: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create tradesman (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  const { name, tradeType, description, location, contactEmail, phone } = req.body;

  try {
    const result = await query(
      `INSERT INTO tradesmen (user_id, name, trade_type, description, location, contact_email, phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, trade_type, rating, verified, compliance_status, created_at`,
      [req.userId, name, tradeType, description, location, contactEmail, phone]
    );

    res.status(201).json({ tradesman: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tradesman (authenticated)
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, location, contactEmail, phone } = req.body;

  try {
    const result = await query(
      `UPDATE tradesmen
       SET name = $1, description = $2, location = $3, contact_email = $4, phone = $5, updated_at = NOW()
       WHERE id = $6 AND user_id = $7
       RETURNING id, name, trade_type, rating, verified, compliance_status, updated_at`,
      [name, description, location, contactEmail, phone, id, req.userId]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Tradesman not found or not owned by user' });
    }

    res.json({ tradesman: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get graph data for relationships
router.get('/:id/graph', async (req, res) => {
  const { id } = req.params;
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

    res.json({
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
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
