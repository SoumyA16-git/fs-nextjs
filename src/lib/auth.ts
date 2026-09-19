import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, credentials.username),
        })

        if (!user) {
          return null
        }

        const passwordCorrect = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        )

        if (!passwordCorrect) {
          return null
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
          username: user.username,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = (user as any).username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id
        ;(session.user as any).username = token.username || session.user.email
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "test_nextauth_secret_key_123456789",
}
