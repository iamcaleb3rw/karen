"use server";

import { db } from "@/drizzle/db";
import enMessages from "@/messages/en.json";
import rwMessages from "@/messages/rw.json";

// Define message structure
interface Messages {
  Categories: Record<string, { name: string }>;
  Subcategories: Record<string, { name: string }>;
}

const messagesByLocale: Record<string, Messages> = {
  en: enMessages,
  rw: rwMessages,
};

export async function getAllCategoriesWithSubcategories(
  locale: keyof typeof messagesByLocale
) {
  console.log("FROM SERVER ACTION LOCALE", locale);
  try {
    console.log("⏳ Fetching all categories with subcategories...");

    // Fetch data from database
    const result = await db.query.categories.findMany({
      with: {
        subcategories: true,
      },
    });

    // Get translations for the specified locale
    const messages = messagesByLocale[locale];

    // Map categories and subcategories to translated versions
    const translatedResult = result.map((category) => ({
      ...category,
      name: messages.Categories[category.slug]?.name || category.name,
      subcategories: category.subcategories.map((subcategory) => ({
        ...subcategory,
        name:
          messages.Subcategories[subcategory.slug]?.name || subcategory.name,
      })),
    }));

    console.log("✅ Successfully fetched translated categories.");
    return translatedResult;
  } catch (e) {
    console.error("❌ Translation failed:", e);
    return [];
  }
}
