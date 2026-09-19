import React from "react"
import { db } from "@/db"
import BlogsClient from "./BlogsClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function BlogsPage() {
  const blogsList = await db.query.blogs.findMany({
    orderBy: (blogs, { desc }) => [desc(blogs.likes), desc(blogs.id)],
    with: {
      user: true,
    },
  })

  return <BlogsClient initialBlogs={blogsList} />
}
