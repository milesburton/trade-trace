import postgres from 'postgres';
import { config } from '../config.js';

const sql = postgres(config.database_url);

export async function setupDatabase() {
  try {
    // Create extensions
    await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;

    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Tradesmen table
    await sql`
      CREATE TABLE IF NOT EXISTS tradesmen (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        trade_type VARCHAR(100) NOT NULL,
        description TEXT,
        rating DECIMAL(3,2) DEFAULT 0,
        verified BOOLEAN DEFAULT FALSE,
        compliance_status VARCHAR(50) DEFAULT 'pending',
        location VARCHAR(255),
        contact_email VARCHAR(255),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Reviews table
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tradesman_id UUID NOT NULL REFERENCES tradesmen(id) ON DELETE CASCADE,
        reviewer_id UUID REFERENCES users(id),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Blockchain transactions
    await sql`
      CREATE TABLE IF NOT EXISTS blockchain_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tradesman_id UUID NOT NULL REFERENCES tradesmen(id) ON DELETE CASCADE,
        transaction_hash VARCHAR(255) UNIQUE NOT NULL,
        block_number INTEGER,
        status VARCHAR(50) DEFAULT 'pending',
        data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Relationships/graph table
    await sql`
      CREATE TABLE IF NOT EXISTS relationships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        from_tradesman_id UUID NOT NULL REFERENCES tradesmen(id) ON DELETE CASCADE,
        to_tradesman_id UUID NOT NULL REFERENCES tradesmen(id) ON DELETE CASCADE,
        relationship_type VARCHAR(50),
        strength DECIMAL(3,2) DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_tradesmen_user_id ON tradesmen(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_tradesman_id ON reviews(tradesman_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_relationships_from ON relationships(from_tradesman_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_blockchain_tradesman_id ON blockchain_records(tradesman_id)`;

    console.log("✅ All tables created successfully");
  } catch (error) {
    console.error("❌ Database setup error:", error);
    throw error;
  }
}

export async function closeDatabase() {
  await sql.end();
}

export async function query(text, args = []) {
  try {
    // The postgres npm package handles parameterized queries differently
    // We need to use the template literal syntax for safe queries
    return await sql.unsafe(text, args);
  } catch (error) {
    console.error("❌ Query error:", error);
    throw error;
  }
}

export async function queryOne(text, args = []) {
  const result = await query(text, args);
  return result?.[0];
}

export { sql };
