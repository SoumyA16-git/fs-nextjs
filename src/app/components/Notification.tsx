"use client"

import React from "react"
import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  return (
    <div
      data-testid="notification"
      className={`mx-auto max-w-4xl my-4 px-4 py-3 rounded text-white font-medium text-center transition-all ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  )
}
