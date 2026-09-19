import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"
import * as fs from "fs"

if (fs.existsSync(".env.test")) {
  dotenv.config({ path: ".env.test" })
}
if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" })
}
if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" })
}

const connectionUrl =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/test_db?sslmode=disable"

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionUrl,
  },
})
