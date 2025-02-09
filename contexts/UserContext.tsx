"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { fetchUserInfo } from "@/utils/api"
import { isAuthenticated, getUserInfo } from "@/utils/auth"

interface User {
  id: string
  name: string
  email: string
}

interface UserContextType {
  user: User | null
  loading: boolean
  error: string | null
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshUser = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const isAuth = isAuthenticated()
      if (isAuth) {
        const userInfo = getUserInfo()
        if (userInfo) {
          setUser({
            id: userInfo.sub,
            name: userInfo.name,
            email: userInfo.email,
          })
        } else {
          // Fetch additional user info if needed
          const userData = await fetchUserInfo()
          setUser(userData)
        }
      } else {
        setUser(null)
      }
    } catch (err) {
      setError("사용자 정보를 가져오는데 실패했습니다.")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, []) // Empty dependency array since this function doesn't depend on any props or state

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  return <UserContext.Provider value={{ user, loading, error, refreshUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

