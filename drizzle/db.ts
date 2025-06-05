import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import {
  categories,
  categoriesRelations,
  complaints,
  complaintsRelations,
  departmentRelations,
  departments,
  responses,
  responsesRelations,
  subcategories,
  subcategoriesRelations,
  userRelations,
  users,
} from "./schema";
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL env var is missing");
}
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, {
  schema: {
    complaints,
    subcategories,
    categories,
    users,
    departments,
    categoriesRelations,
    departmentRelations,
    userRelations,
    complaintsRelations,
    subcategoriesRelations,
    responsesRelations,
    responses,
  },
});
