"use client"

import React, { useTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser, RegisterState } from "@/app/actions/auth"

export default function RegisterPage() {
  const [state, setState] = useState<RegisterState>({})
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // Client-side quick check
    const username = (formData.get("username") as string)?.trim() || ""
    const password = (formData.get("password") as string) || ""
    const passwordConfirm = (formData.get("passwordConfirm") as string) || ""

    const errors: Record<string, string> = {}
    if (!username || username.length < 4) {
      errors.username = "Username must be at least 4 characters long"
    }
    if (password && password.length < 4) {
      errors.password = "Password must be at least 4 characters long"
    }
    if (password !== passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match"
    }

    if (Object.keys(errors).length > 0) {
      setState({ errors })
      return
    }

    startTransition(async () => {
      try {
        const result = await registerUser(state, formData)
        if (result?.errors) {
          setState(result)
        }
      } catch (err: any) {
        // If Next.js redirect was thrown, ignore
        if (err?.message?.includes("NEXT_REDIRECT")) {
          return
        }
        setState({
          errors: {
            general: err?.message || "Registration failed",
          },
        })
      }
    })
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      {state.errors?.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {state.errors.general}
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
            defaultValue={state.values?.username || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.username && (
            <p
              data-testid="username-error"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors.username}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={state.values?.name || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
          )}
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
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.password && (
            <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state.errors?.passwordConfirm && (
            <p
              data-testid="passwordConfirm-error"
              className="mt-1 text-sm text-red-600"
            >
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          data-testid="register-button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  )
}
