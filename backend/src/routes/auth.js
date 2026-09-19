import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { query } from '../db/setup.js';

const JWT_SECRET = config.jwt_secret;
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name',
      [email, hashedPassword, fullName || null]
    );

    const user = result[0];
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { algorithm: 'HS512' }
    );

    res.json({
      user: { id: user.id, email: user.email, fullName: user.full_name },
      token,
    });
  } catch (err) {
    res.status(409).json({ error: 'User already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const result = await query(
      'SELECT id, email, password_hash, full_name FROM users WHERE email = $1',
      [email]
    );

    const user = result[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { algorithm: 'HS512' }
    );

    res.json({
      user: { id: user.id, email: user.email, fullName: user.full_name },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
