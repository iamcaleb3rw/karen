import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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
export const complaints = pgTable("complaints", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl"),
  departmentId: uuid("departmentId").notNull(),
  status: complaintStatusEnum("status").notNull().default("pending"),
  categoryId: uuid("categoryId")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  location: text("location").notNull(),
  clerkId: varchar("clerkId")
    .references(() => users.clerkId, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt,
  updatedAt,
});

//KARENS TABLE
export const userRole = pgEnum("userRole", ["citizen", "staff", "admin"]);
export const users = pgTable("users", {
  userId: uuid("userId").primaryKey().notNull().defaultRandom(),
  firstName: varchar("firstName", { length: 50 }),
  lastName: varchar("lastName", { length: 50 }),
  phoneNumber: text("phoneNumber").unique(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  clerkId: varchar("clerkId").unique().notNull(),
  role: userRole("role").default("citizen").notNull(),
  departmentId: uuid("departmentId").references(() => departments.id),
  createdAt,
  updatedAt,
});

//COMPLAINT CATEGORY TABLE
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  slug: varchar("slug").unique().notNull(),
  departmentId: uuid("departmentId")
    .references(() => departments.id, { onDelete: "cascade" })
    .notNull(),
});

export const subcategories = pgTable("subcategories", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull().unique(),
  slug: varchar("slug").unique().notNull(),
  categoryId: uuid("categoryId")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
});

//DEPARTMENT TABLE
export const departments = pgTable("departments", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

//JOINS, RELATIONS
export const userRelations = relations(users, ({ many, one }) => ({
  complaints: many(complaints),
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
}));

export const complaintsRelations = relations(complaints, ({ one }) => ({
  user: one(users, {
    fields: [complaints.clerkId],
    references: [users.clerkId],
  }),
  category: one(categories, {
    fields: [complaints.categoryId],
    references: [categories.id],
  }),
}));

export const departmentRelations = relations(departments, ({ many }) => ({
  categories: many(categories),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  department: one(departments, {
    fields: [categories.departmentId],
    references: [departments.id],
  }),
  complaints: many(complaints),
  subcategories: many(subcategories),
}));

export const subcategoriesRelations = relations(subcategories, ({ one }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.id],
  }),
}));
