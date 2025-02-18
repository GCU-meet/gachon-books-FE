import { MessageCircle, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BookCardProps {
  book: {
    id: number
    title: string
    currentPrice: number
    timeLeft: string
    location: string
    imageUrl?: string
    isPopular?: boolean
    isEnding?: boolean
    isNew?: boolean
    comments: number
    likes: number
  }
  isMobile: boolean
}

export function BookCard({ book, isMobile }: BookCardProps) {
  return (
    <Card className="flex rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow">
      {/* Image Section */}
      <div className={cn("bg-gray-100 shrink-0", isMobile ? "w-[100px] h-[100px]" : "w-[180px] h-[180px]")}>
        {book.imageUrl ? (
          <img src={book.imageUrl || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookPlaceholder />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={cn("flex-1", isMobile ? "p-3" : "p-4")}>
        <h3 className={cn("font-medium text-black", isMobile ? "text-sm" : "text-base")}>{book.title}</h3>
        <div className={cn("flex items-center gap-1 mt-1 text-gray-600", isMobile ? "text-xs" : "text-sm")}>
          <span>{book.location}</span>
          <span>·</span>
          <span>{book.timeLeft}</span>
        </div>

        <div className={cn("mt-2", isMobile ? "mt-2" : "mt-3")}>
          <span className={cn("font-bold text-black", isMobile ? "text-base" : "text-xl")}>
            {book.currentPrice.toLocaleString()}원
          </span>
        </div>

        <div className={cn("flex items-center", isMobile ? "justify-between mt-2" : "gap-2 mt-2")}>
          <div className={cn("flex gap-1", isMobile && "flex-wrap")}>
            {book.isPopular && <Badge className="bg-red-50 text-red-500 rounded-sm font-normal text-xs">🔥 인기</Badge>}
            {book.isEnding && (
              <Badge className="bg-amber-50 text-amber-500 rounded-sm font-normal text-xs">⌛ 마감임박</Badge>
            )}
            {book.isNew && (
              <Badge className="bg-emerald-50 text-emerald-500 rounded-sm font-normal text-xs">✨ 신규</Badge>
            )}
          </div>
          <div className={cn("flex items-center", isMobile ? "gap-2" : "gap-2 mt-2")}>
            <div className="flex items-center text-gray-500">
              <MessageCircle className={cn("mr-1", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
              {book.comments}
            </div>
            <div className="flex items-center text-gray-500">
              <Heart className={cn("mr-1", isMobile ? "w-3.5 h-3.5" : "w-4 h-4")} />
              {book.likes}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function BookPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-400">
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    </div>
  )
}

