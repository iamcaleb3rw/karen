"use server";
import { db } from "@/drizzle/db";
import { complaints } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function createComplaint(
  name: string,
  description: string,
  imageUrl: string,
  departmentId: string,
  categoryId: string,
  location: string,
  clerkId: string
) {
  try {
    const received = {
      name,
      description,
      imageUrl,
      departmentId,
      categoryId,
      location,
      clerkId,
    };
    console.log(received);
    // Insert new complaint with returning
    const [newComplaint] = await db
      .insert(complaints)
      .values({
        clerkId: clerkId,
        name: name,
        description: description,
        imageUrl: imageUrl,
        departmentId: departmentId,
        categoryId: categoryId,
        location: location,
      })
      .returning();

    return {
      id: newComplaint.id,
      name: newComplaint.name,
      description: newComplaint.description,
      status: newComplaint.status,
      location: newComplaint.location,
      createdAt: newComplaint.createdAt.toISOString(),
    };
  } catch (e) {
    console.error("Error creating complaint:", e);
    throw new Error("Failed to create complaint");
  }
}
