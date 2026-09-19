"use client"

import React, { useState } from "react"
import Link from "next/link"

interface BlogItem {
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

export default function BlogsClient({ initialBlogs }: { initialBlogs: BlogItem[] }) {
  const [filterInput, setFilterInput] = useState("")
  const [activeFilter, setActiveFilter] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveFilter(filterInput.trim().toLowerCase())
  }

  const filteredBlogs = initialBlogs.filter((blog) => {
    if (!activeFilter) return true
    return (
      blog.title.toLowerCase().includes(activeFilter) ||
      blog.author.toLowerCase().includes(activeFilter)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link
          href="/blogs/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Create New
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <input
          type="text"
          placeholder="Filter blogs by title or author..."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          data-testid="filter-input"
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded font-medium transition"
        >
          Search
        </button>
      </form>

      <div data-testid="blogs-list" className="space-y-4">
        {filteredBlogs.length === 0 ? (
          <p className="text-gray-500 italic py-4">No blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:shadow transition"
            >
              <div>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {blog.title}
                </Link>
                <p className="text-sm text-gray-600">by {blog.author}</p>
              </div>
              <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded">
                {blog.likes} likes
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
