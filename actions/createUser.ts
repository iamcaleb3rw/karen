"use server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";

export async function createUser(
  phoneNumber: string,
  firstName: string,
  lastName: string
) {
  try {
    console.log("Received DATA", {
      phoneNumber,
      firstName,
      lastName,
    });

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.phoneNumber, phoneNumber),
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
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
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
