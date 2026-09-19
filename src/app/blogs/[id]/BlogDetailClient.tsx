"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { likeBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

interface BlogDetailProps {
  blog: {
    id: number
    title: string
    author: string
    url: string
    likes: number
    userId: number
    user?: {
      id: number
      name: string
      username: string
    }
  }
  isOwner: boolean
}

export default function BlogDetailClient({ blog, isOwner }: BlogDetailProps) {
  const { data: session } = useSession()
  const { showNotification } = useNotification()
  const [likes, setLikes] = useState(blog.likes)
  const [isLiking, setIsLiking] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [addedToList, setAddedToList] = useState(false)

  const handleLike = async () => {
    setIsLiking(true)
    try {
      await likeBlog(blog.id)
      setLikes((prev) => prev + 1)
      showNotification("Blog liked!", "success")
    } catch (err: any) {
      showNotification(err?.message || "Failed to like blog", "error")
    } finally {
      setIsLiking(false)
    }
  }

  const handleAddToReadingList = async () => {
    setIsAdding(true)
    try {
      const res = await fetch("/api/reading-lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: blog.id }),
      })

      if (res.ok) {
        setAddedToList(true)
        showNotification("Added to reading list!", "success")
      } else {
        const data = await res.json().catch(() => ({}))
        showNotification(data.error || "Failed to add to reading list", "error")
      }
    } catch (err: any) {
      showNotification(err?.message || "Failed to add to reading list", "error")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div
      data-testid="blog-detail"
      className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto space-y-6"
    >
      <div>
        <h1
          data-testid="blog-title"
          className="text-3xl font-bold text-gray-900"
        >
          {blog.title}
        </h1>
        <p
          data-testid="blog-author"
          className="text-lg text-gray-600 mt-1"
        >
          by {blog.author}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">URL:</span>{" "}
          <a
            href={blog.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {blog.url}
          </a>
        </p>

        <div className="flex items-center gap-4 pt-2">
          <span className="text-lg font-medium text-gray-800">
            {likes} {likes === 1 ? "like" : "likes"}
          </span>
          <button
            type="button"
            data-testid="like-button"
            onClick={handleLike}
            disabled={isLiking}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded font-medium transition disabled:opacity-50"
          >
            {isLiking ? "Liking..." : "Like"}
          </button>
        </div>

        {blog.user && (
          <p className="text-sm text-gray-500 pt-2">
            Added by {blog.user.name} ({blog.user.username})
          </p>
        )}
      </div>

      {session && !isOwner && (
        <div className="pt-4 border-t border-gray-200">
          <button
            type="button"
            data-testid="add-to-reading-list-button"
            onClick={handleAddToReadingList}
            disabled={isAdding || addedToList}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition disabled:opacity-50"
          >
            {addedToList
              ? "In Reading List"
              : isAdding
              ? "Adding..."
              : "Add to reading list"}
          </button>
        </div>
      )}
    </div>
  )
}
