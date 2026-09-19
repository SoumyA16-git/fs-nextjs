import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  try {
    const body = await req.json()
    const { username, name, password } = body

    if (!username || !name || !password) {
      return NextResponse.json(
        { error: "username, name, and password are required" },
        { status: 400 },
      )
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const [newUser] = await db
      .insert(users)
      .values({
        username,
        name,
        passwordHash,
      })
      .returning({
        id: users.id,
        username: users.username,
        name: users.name,
      })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 },
    )
  }
}
