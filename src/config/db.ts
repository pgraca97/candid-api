import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const useSsl = process.env.PG_SSL === "true";

// Cria e configura o pool de conexoes ao PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

export default pool;