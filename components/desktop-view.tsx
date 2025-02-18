import { Bell, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { BookCard } from "@/components/book-card"

interface DesktopViewProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  books: any[]
}

export function DesktopView({ categories, selectedCategory, setSelectedCategory, books }: DesktopViewProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-14 px-4">
            <Button variant="ghost" size="icon" className="mr-2 hover:bg-gray-50">
              <Menu className="h-5 w-5" />
            </Button>
            <Logo />
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-50">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Avatar className="h-8 w-8 ml-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="책 제목, 저자, 학과 등으로 검색"
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-1 py-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 ${
                  selectedCategory === category
                    ? "bg-brand-600 hover:bg-brand-700 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-4">
        <div className="space-y-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} isMobile={false} />
          ))}
        </div>
      </main>
    </div>
  )
}

