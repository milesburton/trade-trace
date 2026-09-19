// Load environment variables manually since std/dotenv changed
export function getEnv(key: string, defaultValue?: string): string {
  const value = Deno.env.get(key);
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || defaultValue || '';
}

export const config = {
  port: Number(getEnv('PORT', '8000')),
  database_url: getEnv('DATABASE_URL'),
  jwt_secret: getEnv('JWT_SECRET', 'change-me'),
  frontend_url: getEnv('FRONTEND_URL', 'http://localhost:5173'),
  seed_db: getEnv('SEED_DB', 'false') === 'true',
};
