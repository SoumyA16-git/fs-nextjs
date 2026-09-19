import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { readingLists, users } from "@/db/schema"

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const username =
    (session.user as any).username || session.user.email || session.user.name
  const currentUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const body = await req.json().catch(() => ({}))
  const blogId = Number(body.blogId)
  if (!blogId || isNaN(blogId)) {
    return NextResponse.json({ error: "Invalid blogId" }, { status: 400 })
  }

  // Check if already in reading list
  const existing = await db.query.readingLists.findFirst({
    where: and(
      eq(readingLists.userId, currentUser.id),
      eq(readingLists.blogId, blogId),
    ),
  })

  if (!existing) {
    await db.insert(readingLists).values({
      userId: currentUser.id,
      blogId,
    })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
