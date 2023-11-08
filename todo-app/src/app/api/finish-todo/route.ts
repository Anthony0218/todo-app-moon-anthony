import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/connection";
import { todoSchema } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const { todoId: todoId, status: status } = await request.json();

  try {
    if (status === "PENDING") {
      await db
        .update(todoSchema)
        .set({ status: "DONE" })
        .where(eq(todoSchema.id, todoId));
    } else if (status === "DONE") {
      await db
        .update(todoSchema)
        .set({ status: "PENDING" })
        .where(eq(todoSchema.id, todoId));
    } else {
      throw new Error("Unknown status");
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
