"use server";
import { db } from "@/drizzle/db";
import { complaints } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

export async function getTotalComplaints() {
  try {
    const totalComplaints = await db
      .select({ count: sql<number>`count(*)` })
      .from(complaints);
    const count = totalComplaints[0].count;
    return count;
  } catch (e) {
    console.error(e);
    console.log("ERROR FETCHING TOTAL COMPLAINTS", e);
  }
}
