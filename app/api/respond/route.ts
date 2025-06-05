import { getUserInfo } from "@/actions/getUserinfo";
import { db } from "@/drizzle/db";
import { responses } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { complaintId, message, userId } = await req.json();
  console.log("RECEIVED data in API ROUTE", complaintId, message, userId);
  console.log("FROM RESPOND API, userId:", userId);
  try {
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

    const userInfo = await getUserInfo(insertedRow.responderClerkId);
    const responseToReturn = {
      id: insertedRow.id,
      message: insertedRow.message,
      createdAt: insertedRow.createdAt,
      complaintId: insertedRow.complaintId,
      responderClerkId: insertedRow.responderClerkId,
      responderFirstName: userInfo?.firstName,
      responderEmail: userInfo?.email,
    };

    return NextResponse.json(responseToReturn);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
