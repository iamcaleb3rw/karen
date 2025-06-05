"use server";
import { db } from "@/drizzle/db";
import { complaints, responses } from "@/drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";

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

export async function getComplaintById(complaintId: string) {
  try {
    const complaint = await db.query.complaints.findFirst({
      where: eq(complaints.id, complaintId),
      with: {
        user: {
          columns: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        category: {
          columns: {
            name: true,
          },
        },
        responses: {
          orderBy: [desc(responses.createdAt)],
          columns: {
            id: true,
            message: true,
            createdAt: true,
          },
          with: {
            responder: {
              columns: {
                firstName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return complaint;
  } catch (e) {
    console.error(e);
    console.log("Error fetching complaint", e);
  }
}
