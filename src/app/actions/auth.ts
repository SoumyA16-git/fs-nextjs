"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export interface RegisterState {
  errors?: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
    general?: string
  }
  values?: {
    username?: string
    name?: string
  }
}

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const username = (formData.get("username") as string)?.trim() || ""
  const name = (formData.get("name") as string)?.trim() || ""
  const password = (formData.get("password") as string) || ""
  const passwordConfirm = (formData.get("passwordConfirm") as string) || ""

  const errors: RegisterState["errors"] = {}

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (!name || name.length < 1) {
    errors.name = "Name is required"
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  // Check if username already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (existingUser) {
    return {
      errors: { username: "Username already taken" },
      values: { username, name },
    }
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  redirect("/login")
}
