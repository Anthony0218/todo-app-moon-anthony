import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/connection";
import { todoSchema } from "../../../../db/schema";

export async function POST(request: NextRequest) {
  const { title: title, description: description } = await request.json();

  try {
    await db
      .insert(todoSchema)
      .values({ title: title, description: description });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
