import React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users, readingLists } from "@/db/schema"
import MeClient from "./MeClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function MePage() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect("/login")
  }

  const username =
    (session.user as any).username || session.user.email || session.user.name
  const currentUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (!currentUser) {
    redirect("/login")
  }

  const userReadingList = await db.query.readingLists.findMany({
    where: eq(readingLists.userId, currentUser.id),
    with: {
      blog: true,
    },
    orderBy: (readingLists, { desc }) => [desc(readingLists.id)],
  })

  return (
    <MeClient
      user={{
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        apiToken: currentUser.apiToken || currentUser.token || null,
      }}
      initialReadingList={userReadingList}
    />
  )
}
