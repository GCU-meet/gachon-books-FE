import { Bell, BookOpen, Menu, PlusCircle, HomeIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookCard } from "@/components/book-card"

interface MobileViewProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  books: any[]
}

export function MobileView({ categories, selectedCategory, setSelectedCategory, books }: MobileViewProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="flex items-center justify-between h-14 px-4">
          <span className="text-lg font-medium">위례동</span>
          <div className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            <Bell className="h-6 w-6" />
            <Menu className="h-6 w-6" />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="border-b border-gray-800 overflow-x-auto">
        <div className="flex gap-2 p-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 ${
                selectedCategory === category
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-transparent border-gray-700 text-white hover:bg-gray-900"
              }`}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        <div className="space-y-3 p-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} isMobile={true} />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="flex items-center justify-around h-16 px-4">
          <Button variant="ghost" className="flex-1 h-full text-white">
            <HomeIcon className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="flex-1 h-full text-white">
            <Bell className="h-6 w-6" />
          </Button>
          <div className="flex-1 relative flex justify-center">
            <Button className="absolute -top-6 rounded-full w-14 h-14 bg-white text-black hover:bg-gray-100">
              <PlusCircle className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" className="flex-1 h-full text-white">
            <BookOpen className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="flex-1 h-full text-white">
            <Avatar className="h-7 w-7">
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </div>
  )
}

