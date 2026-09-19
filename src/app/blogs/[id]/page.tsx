import React from "react"
import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { blogs, users } from "@/db/schema"
import BlogDetailClient from "./BlogDetailClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function BlogPage({
  params,
}: {
  params: { id: string }
}) {
  const blogId = Number(params.id)
  if (isNaN(blogId)) {
    notFound()
  }

  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, blogId),
    with: {
      user: true,
    },
  })

  if (!blog) {
    notFound()
  }

  const session = await getServerSession(authOptions)
  let isOwner = false
  if (session && session.user) {
    const username =
      (session.user as any).username || session.user.email || session.user.name
    const currentUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    })
    if (currentUser && currentUser.id === blog.userId) {
      isOwner = true
    }
  }

  return <BlogDetailClient blog={blog} isOwner={isOwner} />
}
