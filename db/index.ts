import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"
import * as dotenv from "dotenv"

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.local"
dotenv.config({ path: envFile })

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/test_db?sslmode=disable"

const pool = new Pool({
  connectionString,
})

export const db = drizzle(pool, { schema })
export * from "./schema"
