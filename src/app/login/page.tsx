"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      })

      if (res?.error) {
        setErrorMessage("Invalid username or password")
        setLoading(false)
        return
      }

      showNotification("Successfully logged in!")
      router.push("/")
      router.refresh()
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to log in")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      {errorMessage && (
        <div
          data-testid="error-message"
          className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          data-testid="login-button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}
