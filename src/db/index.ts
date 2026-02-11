import pool from "../config/db";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";  // Importa tudo do schema

export const db = drizzle(pool, { schema });