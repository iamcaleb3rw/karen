"use server";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function checkIfExists(email: string) {
  try {
    const userExists = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    console.log("USER FOUND", userExists);
    const doesUserExist = userExists ? true : false;
    console.log(doesUserExist);
    return doesUserExist;
  } catch (error) {
    console.log("ERROR USER EXIST CHECK");
  }
}
