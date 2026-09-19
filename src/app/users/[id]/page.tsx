import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function UserDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const userId = Number(params.id)
  if (isNaN(userId)) {
    notFound()
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      blogs: true,
    },
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
        <p className="text-gray-600 mt-1">Username: {user.username}</p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Added blogs</h2>
        {!user.blogs || user.blogs.length === 0 ? (
          <p className="text-gray-500 italic">No blogs added yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {blog.title}
                </Link>
                <span className="text-sm text-gray-500 ml-2">
                  ({blog.likes} {blog.likes === 1 ? "like" : "likes"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
