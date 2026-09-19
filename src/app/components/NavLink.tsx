import React from "react"
import Link from "next/link"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className="hover:text-gray-300 transition-colors">
      {children}
    </Link>
  )
}
