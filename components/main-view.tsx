import { Bell, BookOpen, Menu, PlusCircle, HomeIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { BookCard } from "@/components/book-card"
import { cn } from "@/lib/utils"

interface MainViewProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  books: any[]
  isMobile: boolean
}

export function MainView({ categories, selectedCategory, setSelectedCategory, books, isMobile }: MainViewProps) {
  return (
    <div className={cn("min-h-screen bg-white text-black")}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-14 px-4">
            {isMobile ? (
              <span className="text-lg font-medium">위례동</span>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="mr-2 hover:bg-gray-50">
                  <Menu className="h-5 w-5" />
                </Button>
                <Logo />
              </>
            )}
            <div className="flex items-center gap-2">
              {!isMobile && (
                <Button variant="ghost" size="icon" className="relative hover:bg-gray-50">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                </Button>
              )}
              {isMobile ? (
                <>
                  <Search className="h-6 w-6" />
                  <Bell className="h-6 w-6" />
                  <Menu className="h-6 w-6" />
                </>
              ) : (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar (Desktop only) */}
      {!isMobile && (
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
      )}

      {/* Categories */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className={cn("flex gap-2 p-2", !isMobile && "max-w-3xl mx-auto px-4")}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "whitespace-nowrap rounded-full px-4",
                selectedCategory === category
                  ? "bg-brand-600 hover:bg-brand-700 text-white"
                  : "bg-white hover:bg-gray-50",
              )}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className={cn(isMobile ? "pb-20" : "max-w-3xl mx-auto px-4 py-4")}>
        <div className={cn(isMobile ? "space-y-3 p-3" : "space-y-3")}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} isMobile={isMobile} />
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex items-center justify-around h-16 px-4">
            <Button variant="ghost" className="flex-1 h-full text-gray-600">
              <HomeIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1 h-full text-gray-600">
              <Bell className="h-6 w-6" />
            </Button>
            <div className="flex-1 relative flex justify-center">
              <Button className="absolute -top-6 rounded-full w-14 h-14 bg-brand-600 text-white hover:bg-brand-700">
                <PlusCircle className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" className="flex-1 h-full text-gray-600">
              <BookOpen className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1 h-full text-gray-600">
              <Avatar className="h-7 w-7">
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

