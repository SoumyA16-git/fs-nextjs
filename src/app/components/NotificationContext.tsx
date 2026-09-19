"use client"

import React, { createContext, useContext, useState } from "react"

export type NotificationType = "success" | "error"

export interface NotificationContextType {
  message: string
  type: NotificationType
  showNotification: (message: string, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
})

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [message, setMessage] = useState("")
  const [type, setType] = useState<NotificationType>("success")

  const showNotification = (
    msg: string,
    notifType: NotificationType = "success",
  ) => {
    setMessage(msg)
    setType(notifType)
    setTimeout(() => setMessage(""), 5000)
  }

  return (
    <NotificationContext.Provider value={{ message, type, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
