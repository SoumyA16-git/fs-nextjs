import React from "react"
import Link from "next/link"
import { db } from "@/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function UsersPage() {
  const usersList = await db.query.users.findMany({
    with: {
      blogs: true,
    },
  })

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Users</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-700">
              <th className="py-3 px-4 font-semibold">User</th>
              <th className="py-3 px-4 font-semibold">Blogs created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {usersList.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-4 px-4 text-gray-500 italic text-center">
                  No users found.
                </td>
              </tr>
            ) : (
              usersList.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Link
                      href={`/users/${u.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {u.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {u.blogs?.length || 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
