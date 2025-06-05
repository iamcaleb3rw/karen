import { db } from "@/drizzle/db";
import { responses } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { complaintId, message } = await req.json();
  console.log("RECEIVED data in API ROUTE", complaintId, message);
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const [insertedRow] = await db
      .insert(responses)
      .values({
        complaintId: complaintId,
        message: message,
        responderClerkId: userId,
      })
      .returning({
        id: responses.id,
        createdAt: responses.createdAt,
        message: responses.message,
        responderClerkId: responses.responderClerkId,
        complaintId: responses.complaintId,
      });

    return NextResponse.json(insertedRow);
  } catch (e) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
