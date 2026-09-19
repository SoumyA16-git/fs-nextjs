import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { readingLists } from "@/db/schema"

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const id = Number(params.id)
  if (!id || isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  await db
    .update(readingLists)
    .set({ read: true })
    .where(eq(readingLists.id, id))

  return NextResponse.json({ success: true })
}
