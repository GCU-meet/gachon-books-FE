import { MessageCircle, Heart, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    publisher: string;
    condition: string;
    currentPrice: number;
    immediatePrice?: number;
    timeLeft: string;
    endTime: string;
    location: string;
    imageUrl?: string;
    isPopular?: boolean;
    isEnding?: boolean;
    isNew?: boolean;
    currentBidders: number;
    comments: number;
    likes: number;
  };
}

export function BookCard({ book }: BookCardProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="flex">
          {/* Image */}
          <div className="relative shrink-0 w-[140px] h-[140px]">
            {book.imageUrl ? (
              <img src={book.imageUrl || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 min-w-0 p-3">
            {/* Title and Icons */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-base text-gray-900 line-clamp-2 flex-1">{book.title}</h3>
              <div className="flex items-center gap-2 shrink-0 text-gray-500">
                <button className="flex items-center">
                  <MessageCircle className="w-4 h-4" />
                  <span className="ml-1 text-xs">{book.comments}</span>
                </button>
                <button className="flex items-center">
                  <Heart className="w-4 h-4" />
                  <span className="ml-1 text-xs">{book.likes}</span>
                </button>
              </div>
            </div>

            {/* Author and Publisher */}
            <div className="mt-1 text-xs text-gray-500">
              {book.author} · {book.publisher}
            </div>

            {/* Location and Time */}
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <span>{book.location}</span>
              <span>·</span>
              <span>{book.timeLeft}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="outline" className="rounded-full text-xs">
                상태: {book.condition}
              </Badge>
              {book.isPopular && (
                <Badge variant="secondary" className="rounded-full text-xs px-2 py-0.5 bg-red-50 text-red-500">
                  🔥 인기
                </Badge>
              )}
              {book.isEnding && (
                <Badge variant="secondary" className="rounded-full text-xs px-2 py-0.5 bg-amber-50 text-amber-500">
                  ⌛ {book.endTime}
                </Badge>
              )}
            </div>

            {/* Price */}
            <div className="mt-auto pt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-gray-900">{book.currentPrice.toLocaleString()}</span>
                <span className="text-sm text-gray-900">원</span>
                {book.immediatePrice && (
                  <span className="text-xs text-gray-500 ml-1">즉시구매 {book.immediatePrice.toLocaleString()}원</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 p-3 mt-2 border-t">
          <Button variant="outline" className="flex-1 h-11 rounded-full bg-white hover:bg-gray-50">
            입찰하기
          </Button>
          {book.immediatePrice && (
            <Button className="flex-1 h-11 rounded-full bg-brand-600 hover:bg-brand-700 text-white">즉시구매</Button>
          )}
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <Card className="flex rounded-2xl overflow-hidden bg-white dark:bg-black border dark:border-gray-800 hover:shadow-lg transition-shadow duration-200">
      {/* Image Section */}
      <div className="relative shrink-0 w-[240px] h-[240px] p-4">
        <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100">
          {book.imageUrl ? (
            <img
              src={book.imageUrl || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 min-w-0 p-4">
        <div className="flex-1 min-w-0">
          {/* Title and Icons */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-xl text-gray-900 dark:text-white">{book.title}</h3>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {book.author} · {book.publisher}
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-gray-500 dark:text-gray-400">
              <button className="flex items-center gap-1 hover:text-brand-600">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs">{book.comments}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-brand-600">
                <Heart className="w-5 h-5" />
                <span className="text-xs">{book.likes}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{book.timeLeft}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{book.currentBidders}명 입찰 중</span>
            </div>
            <div>{book.location}</div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="outline" className="rounded-full">
              상태: {book.condition}
            </Badge>
            {book.isPopular && (
              <Badge
                variant="secondary"
                className="rounded-full bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400"
              >
                🔥 인기
              </Badge>
            )}
            {book.isEnding && (
              <Badge
                variant="secondary"
                className="rounded-full bg-amber-50 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400"
              >
                ⌛ {book.endTime} 마감
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {book.currentPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-900 dark:text-white">원</span>
              </div>
              {book.immediatePrice && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  즉시 구매가 {book.immediatePrice.toLocaleString()}원
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-11 px-6 rounded-full bg-white dark:bg-transparent dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
              >
                입찰하기
              </Button>
              {book.immediatePrice && (
                <Button className="h-11 px-6 rounded-full bg-brand-600 hover:bg-brand-700 text-white">즉시구매</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
