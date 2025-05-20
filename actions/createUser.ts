"use server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";

export async function createUser(
  email: string,
  firstName: string,
  lastName: string,
  clerkId: string | any
) {
  try {
    console.log("Received DATA", {
      email,
      firstName,
      lastName,
      clerkId,
    });

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      console.log("User already exists", existingUser);
      return {
        id: existingUser.userId,
        phoneNumber: existingUser.phoneNumber,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
      };
    }

    const [newUser] = await db
      .insert(users)
      .values({
        email: email,
        firstName: firstName,
        lastName: lastName,
        clerkId: clerkId,
      })
      .returning();

    console.log("New USER CREATED", newUser);
    return {
      id: newUser.userId,
      phoneNumber: newUser.phoneNumber,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
  } catch (e) {
    console.error("Error creating user:", e);
    throw new Error("Failed to create user");
  }
}
