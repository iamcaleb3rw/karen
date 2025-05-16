import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

//TIMESTAMPS
const createdAt = timestamp("createdAt").notNull().defaultNow();
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

//COMPLETION STATUSES
export const complaintStatusEnum = pgEnum("complaint_status", [
  "pending",
  "in_progress",
  "resolved",
]);

//COMPLAINTS TABLE
export const complaintTable = pgTable("complaints", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  departmentId: uuid("departmentId").notNull(),
  status: complaintStatusEnum("status").notNull().default("pending"),
  categoryId: text("categoryId").notNull(),
  location: text("location").notNull(),
  userId: text("userId").notNull(),
  createdAt,
  updatedAt,
});

//KARENS TABLE
export const userTable = pgTable("karens", {
  userId: uuid("userId").primaryKey().notNull().defaultRandom(),
  phoneNumber: text("").notNull(),
  email: text("email"),
});

//COMPLAINT CATEGORY TABLE
export const categoryTable = pgTable("categories", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  departmentId: uuid("departmentId").notNull(),
});

//DEPARTMENT TABLE
export const departmentTable = pgTable("departments", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
});
