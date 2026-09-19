"use client"

import React, { useState } from "react"
import Link from "next/link"
import { generateApiToken, markBlogAsRead } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

interface MeUser {
  id: number
  name: string
  username: string
  apiToken: string | null
}

interface ReadingListItem {
  id: number
  userId: number
  blogId: number
  read: boolean
  blog: {
    id: number
    title: string
    author: string
    url: string
  }
}

export default function MeClient({
  user,
  initialReadingList,
}: {
  user: MeUser
  initialReadingList: ReadingListItem[]
}) {
  const [apiToken, setApiToken] = useState<string | null>(user.apiToken)
  const [readingList, setReadingList] = useState<ReadingListItem[]>(initialReadingList)
  const [isGenerating, setIsGenerating] = useState(false)
  const { showNotification } = useNotification()

  const handleGenerateToken = async () => {
    setIsGenerating(true)
    try {
      const newToken = await generateApiToken()
      setApiToken(newToken)
      showNotification("API token generated successfully!", "success")
    } catch (err: any) {
      showNotification(err?.message || "Failed to generate token", "error")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      await markBlogAsRead(id)
      setReadingList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
      )
      showNotification("Marked as read!", "success")
    } catch (err: any) {
      showNotification(err?.message || "Failed to mark as read", "error")
    }
  }

  const unreadBlogs = readingList.filter((item) => !item.read)
  const readBlogs = readingList.filter((item) => item.read)

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Profile Section */}
      <div
        data-testid="user-profile"
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-900">User Profile</h1>
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-gray-700">Name: </span>
            <span data-testid="user-name">{user.name}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Username: </span>
            <span data-testid="user-username">{user.username}</span>
          </p>
        </div>
      </div>

      {/* Reading List Section */}
      <div
        data-testid="reading-list-section"
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900">Reading List</h2>

        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-gray-500 italic">
            Your reading list is empty.
          </p>
        ) : (
          <div className="space-y-6">
            {/* Unread Section */}
            <div data-testid="unread-section">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Unread blogs
              </h3>
              {unreadBlogs.length === 0 ? (
                <p
                  data-testid="no-unread-blogs"
                  className="text-gray-500 italic"
                >
                  No unread blogs.
                </p>
              ) : (
                <ul className="divide-y divide-gray-100 space-y-2">
                  {unreadBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="pt-2 flex justify-between items-center"
                    >
                      <div>
                        <Link
                          href={`/blogs/${item.blog.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {item.blog.title}
                        </Link>
                        <span className="text-sm text-gray-500 ml-2">
                          by {item.blog.author}
                        </span>
                      </div>
                      <button
                        type="button"
                        data-testid={`mark-read-${item.id}`}
                        onClick={() => handleMarkAsRead(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition"
                      >
                        mark as read
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Read Section */}
            <div data-testid="read-section">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Read blogs
              </h3>
              {readBlogs.length === 0 ? (
                <p className="text-gray-500 italic">No read blogs yet.</p>
              ) : (
                <ul className="divide-y divide-gray-100 space-y-2">
                  {readBlogs.map((item) => (
                    <li key={item.id} className="pt-2">
                      <Link
                        href={`/blogs/${item.blog.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {item.blog.title}
                      </Link>
                      <span className="text-sm text-gray-500 ml-2">
                        by {item.blog.author}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      {/* API Token Section */}
      <div
        data-testid="api-token-section"
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-900">API Token</h2>

        {apiToken ? (
          <div
            data-testid="token-display"
            className="p-4 bg-gray-50 rounded border border-gray-200"
          >
            <p className="text-sm text-gray-600 mb-1 font-medium">
              Your personal API token:
            </p>
            <code
              data-testid="api-token"
              className="block font-mono bg-gray-200 p-2 rounded text-sm text-gray-800 break-all"
            >
              {apiToken}
            </code>
          </div>
        ) : (
          <p data-testid="no-token-message" className="text-gray-500 italic">
            No API token generated yet.
          </p>
        )}

        <button
          type="button"
          data-testid="generate-token-button"
          onClick={handleGenerateToken}
          disabled={isGenerating}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition disabled:opacity-50"
        >
          {isGenerating
            ? "Generating..."
            : apiToken
            ? "Regenerate API Token"
            : "Generate API Token"}
        </button>
      </div>
    </div>
  )
}
