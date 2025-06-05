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

export async function getUserId(email: string) {
  try {
    const fetchedUserId = await db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        clerkId: true,
      },
    });
    console.log("Fetched user id", fetchedUserId);
  } catch (e) {
    console.error(e);
    console.log("FETCHING INFO FOR SIGNED IN USER FAILED", e);
  }
}

export async function getUserDepartment(email: string) {
  try {
    const fetchedDepartmentId = await db.query.users.findFirst({
      where: eq(users.email, email),
      with: {
        department: {
          columns: {
            name: true,
          },
        },
      },
    });
    console.log("Fetched dep name", fetchedDepartmentId?.department?.name);
    return fetchedDepartmentId?.department?.name;
  } catch (e) {
    console.error(e);
    console.log("FETCHING INFO FOR SIGNED IN USER FAILED", e);
  }
}
