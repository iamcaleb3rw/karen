"use server";

import { db } from "@/drizzle/db";

export async function getAllCategoriesWithSubcategories() {
  try {
    console.log("⏳ Fetching all categories with subcategories...");

    const result = await db.query.categories.findMany({
      with: {
        subcategories: true,
      },
    });

    console.log("✅ Successfully fetched all categories with subcategories.");
    console.log(result); // Optional: log the result to see the data structure

    return result;
  } catch (e) {
    console.error("❌ Failed to fetch all categories with subcategories:", e);
    return []; // Return an empty array or handle the error appropriately
  }
}
