import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./schema.ts",

  strict: true,
  verbose: true,

  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
