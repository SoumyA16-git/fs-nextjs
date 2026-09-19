"use client"

import React from "react"
import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center gap-6 shadow-md">
      <NavLink href="/">home</NavLink>
      <NavLink href="/blogs">blogs</NavLink>
      <NavLink href="/users">users</NavLink>
      {session && <NavLink href="/blogs/new">create new</NavLink>}
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <NavLink href="/me">me</NavLink>
            <span className="text-gray-300 text-sm italic">
              {session.user?.name} logged in
            </span>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-sm transition"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
