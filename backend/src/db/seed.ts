import { hash } from "bcrypt";
import { query } from "./setup.ts";

export async function seedDatabase() {
  try {
    // Create demo users
    const user1Hash = await hash("demo123");
    const user2Hash = await hash("demo123");

    const users = await query(
      `INSERT INTO users (email, password_hash, full_name)
       VALUES
       ($1, $2, $3),
       ($4, $5, $6)
       RETURNING id, email`,
      ["john@example.com", user1Hash, "John Smith", "jane@example.com", user2Hash, "Jane Doe"]
    );

    console.log("✅ Created demo users:", users);

    // Create demo tradesmen
    const tradesmen = await query(
      `INSERT INTO tradesmen
       (user_id, name, trade_type, description, rating, verified, compliance_status, location, contact_email, phone)
       VALUES
       ($1, $2, $3, $4, 4.5, true, 'approved', $5, $6, $7),
       ($1, $8, $9, $10, 4.8, true, 'approved', $11, $12, $13),
       ($2, $14, $15, $16, 4.2, true, 'approved', $17, $18, $19),
       ($2, $20, $21, $22, 4.6, true, 'approved', $23, $24, $25)
       RETURNING id, name, rating`,
      [
        users[0].id, "John's Plumbing", "Plumbing", "Expert plumbing services with 15 years experience",
        "London, UK", "john@plumbing.co.uk", "020-1234-5678",

        users[0].id, "John's Electrical", "Electrical", "Licensed electrician for residential and commercial",
        "London, UK", "electrical@john.co.uk", "020-9876-5432",

        users[1].id, "Jane's Carpentry", "Carpentry", "Custom woodwork and home improvements",
        "Manchester, UK", "jane@carpentry.co.uk", "0161-1234-5678",

        users[1].id, "Jane's Masonry", "Masonry", "Brickwork, stone, and decorative masonry",
        "Manchester, UK", "mason@jane.co.uk", "0161-9876-5432"
      ]
    );

    console.log("✅ Created demo tradesmen:", tradesmen);

    // Create demo reviews
    const reviews = await query(
      `INSERT INTO reviews (tradesman_id, reviewer_id, rating, comment, verified)
       VALUES
       ($1, $2, 5, 'Excellent work, very professional', true),
       ($1, $3, 4, 'Good service, fixed my issue quickly', true),
       ($2, $3, 5, 'Outstanding electrical work', true),
       ($3, $2, 4, 'Beautiful carpentry, would recommend', true),
       ($4, $2, 5, 'Best mason in the area!', true)
       RETURNING id, rating`,
      [
        tradesmen[0].id, users[1].id, users[1].id,
        tradesmen[1].id, users[1].id,
        tradesmen[2].id, users[0].id,
        tradesmen[3].id, users[0].id
      ]
    );

    console.log("✅ Created demo reviews:", reviews);

    // Create demo relationships
    const relationships = await query(
      `INSERT INTO relationships (from_tradesman_id, to_tradesman_id, relationship_type, strength)
       VALUES
       ($1, $2, 'collaboration', 0.8),
       ($2, $3, 'referral', 0.9),
       ($3, $4, 'collaboration', 0.7),
       ($1, $3, 'network', 0.6)
       RETURNING id`,
      [
        tradesmen[0].id, tradesmen[1].id,
        tradesmen[1].id, tradesmen[2].id,
        tradesmen[2].id, tradesmen[3].id,
        tradesmen[0].id, tradesmen[2].id
      ]
    );

    console.log("✅ Created demo relationships:", relationships);

    // Create blockchain records
    await query(
      `INSERT INTO blockchain_records (tradesman_id, transaction_hash, block_number, status)
       VALUES
       ($1, '0x' || encode(digest('tx1', 'sha256'), 'hex'), 1000001, 'confirmed'),
       ($2, '0x' || encode(digest('tx2', 'sha256'), 'hex'), 1000002, 'confirmed'),
       ($3, '0x' || encode(digest('tx3', 'sha256'), 'hex'), 1000003, 'confirmed'),
       ($4, '0x' || encode(digest('tx4', 'sha256'), 'hex'), 1000004, 'confirmed')`,
      [tradesmen[0].id, tradesmen[1].id, tradesmen[2].id, tradesmen[3].id]
    );

    console.log("✅ Created blockchain records");
    console.log("✨ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    throw err;
  }
}
