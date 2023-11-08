import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/connection";
import { todoSchema } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
  const { todoId: todoId } = await request.json();
  try {
    await db.delete(todoSchema).where(eq(todoSchema.id, todoId));
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
