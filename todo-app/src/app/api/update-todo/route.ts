import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/connection";
import { todoSchema } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const {
    id: id,
    newTitle: newTitle,
    newDescription: newDescription,
  } = await request.json();
  try {
    await db
      .update(todoSchema)
      .set({ title: newTitle, description: newDescription })
      .where(eq(todoSchema.id, id));
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
