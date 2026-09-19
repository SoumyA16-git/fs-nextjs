"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { and, eq, sql } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingLists, users } from "@/db/schema"

export interface BlogFormState {
  error?: string
  errors?: {
    title?: string
    author?: string
    url?: string
  }
  values?: {
    title?: string
    author?: string
    url?: string
  }
  success?: boolean
}

export async function createBlog(
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return { error: "You must be logged in to create a blog", success: false }
  }

  const title = (formData.get("title") as string)?.trim() || ""
  const author = (formData.get("author") as string)?.trim() || ""
  const url = (formData.get("url") as string)?.trim() || ""

  const errors: Record<string, string> = {}

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }
  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }
  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      error: "Validation failed",
      success: false,
    }
  }

  const username =
    (session.user as any).username || session.user.email || session.user.name
  const currentUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (!currentUser) {
    return { error: "Current user not found", success: false }
  }

  const [newBlog] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      userId: currentUser.id,
    })
    .returning()

  // By default, add the created blog to user's reading list (Exercise 20)
  await db.insert(readingLists).values({
    userId: currentUser.id,
    blogId: newBlog.id,
  })

  revalidatePath("/blogs")
  revalidatePath("/me")

  return { success: true, error: "" }
}

export async function likeBlog(blogId: number) {
  await db
    .update(blogs)
    .set({
      likes: sql`${blogs.likes} + 1`,
    })
    .where(eq(blogs.id, blogId))

  revalidatePath("/blogs")
  revalidatePath(`/blogs/${blogId}`)
}

export async function addToReadingList(blogId: number) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error("Must be logged in")
  }

  const username =
    (session.user as any).username || session.user.email || session.user.name
  const currentUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (!currentUser) {
    throw new Error("User not found")
  }

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

  revalidatePath("/me")
  revalidatePath(`/blogs/${blogId}`)
  return { success: true }
}

export async function markBlogAsRead(id: number) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error("Must be logged in")
  }

  await db
    .update(readingLists)
    .set({ read: true })
    .where(eq(readingLists.id, id))

  revalidatePath("/me")
  return { success: true }
}

export async function generateApiToken(): Promise<string> {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    throw new Error("Must be logged in")
  }

  const username =
    (session.user as any).username || session.user.email || session.user.name
  const currentUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (!currentUser) {
    throw new Error("User not found")
  }

  const token = crypto.randomUUID()

  await db
    .update(users)
    .set({
      apiToken: token,
      token: token,
    })
    .where(eq(users.id, currentUser.id))

  revalidatePath("/me")
  return token
}
