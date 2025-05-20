"use server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getUserInfo(clerkId: string) {
  try {
    const userInfo = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
      columns: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    console.log("FETCHED INFO FOR SIGNED IN USER", userInfo);
    return userInfo;
  } catch (e) {
    console.error(e);
    console.log("FETCHING INFO FOR SIGNED IN USER FAILED", e);
  }
}
