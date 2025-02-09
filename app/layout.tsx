import { UserProvider } from "@/contexts/UserContext"
import type React from "react"
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}

