import { NextResponse } from "next/server"
import { db } from "@/db"
import { readingLists, blogs, users } from "@/db/schema"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  try {
    await db.delete(readingLists)
    await db.delete(blogs)
    await db.delete(users)
    return NextResponse.json({ message: "Database reset successfully" })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to reset database" },
      { status: 500 },
    )
  }
}

export const POST = DELETE
