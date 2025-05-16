import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/migrations",
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
