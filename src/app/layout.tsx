import type { Metadata } from "next"
import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

export const metadata: Metadata = {
  title: "Blog App - Full Stack Open Next.js",
  description: "A full stack blog application built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
