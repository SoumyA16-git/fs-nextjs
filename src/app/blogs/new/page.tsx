"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createBlog, BlogFormState } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"

export default function NewBlogPage() {
  const [state, setState] = useState<BlogFormState>({
    values: { title: "", author: "", url: "" },
  })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { showNotification } = useNotification()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        const result = await createBlog(state, formData)
        if (result.success) {
          showNotification("Blog created successfully!", "success")
          router.push("/blogs")
        } else {
          setState(result)
        }
      } catch (err: any) {
        setState({
          error: err?.message || "Failed to create blog",
          values: {
            title: formData.get("title") as string,
            author: formData.get("author") as string,
            url: formData.get("url") as string,
          },
        })
      }
    })
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6">Create new blog</h1>

      {state.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {state.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={state.values?.title || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.title && (
            <p className="mt-1 text-sm text-red-600">{state.errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            required
            defaultValue={state.values?.author || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.author && (
            <p className="mt-1 text-sm text-red-600">{state.errors.author}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL
          </label>
          <input
            id="url"
            name="url"
            type="text"
            required
            defaultValue={state.values?.url || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.url && (
            <p className="mt-1 text-sm text-red-600">{state.errors.url}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          data-testid="create-blog-button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  )
}
