"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/utils/auth"
import { MainView } from "@/components/main-view"
import { categories, mockBooks } from "@/utils/mockData"
import { useScreenSize } from "@/hooks/use-screen-size"


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const router = useRouter()
  const { isMobile } = useScreenSize()

  useEffect(() => {
    const checkAuth = async () => {
      if (!(await isAuthenticated())) {
        router.push("/login")
      }
    }
    checkAuth()
  }, [router])

  return (
    <MainView
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      books={mockBooks}
      isMobile={isMobile}
    />
  )
}

