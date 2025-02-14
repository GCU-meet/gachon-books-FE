import { Timer, TrendingUp, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    author: string;
    publisher: string;
    currentPrice: number;
    originalPrice: number;
    buyNowPrice?: number;
    timeLeft: string;
    condition: string;
    bids: number;
    imageUrl?: string;
    isPopular?: boolean;
    isEnding?: boolean;
    isNew?: boolean;
  };
}

export function BookCard({ book }: BookCardProps) {
  const discountPercentage = Math.round((1 - book.currentPrice / book.originalPrice) * 100);

  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="flex gap-4 p-4">
        <div className="relative w-[100px] h-[100px] bg-gray-100 rounded-lg shrink-0">
          {book.imageUrl ? (
            <img
              src={book.imageUrl || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <BookPlaceholder />
            </div>
          )}
          <div className="absolute top-1 left-1 flex gap-1">
            {book.isPopular && (
              <Badge className="bg-red-500 text-white border-none px-1.5 py-0.5 text-[10px]">
                <TrendingUp className="mr-0.5 h-2.5 w-2.5" />
                인기
              </Badge>
            )}
            {book.isNew && (
              <Badge className="bg-emerald-500 text-white border-none px-1.5 py-0.5 text-[10px]">
                <Sparkles className="mr-0.5 h-2.5 w-2.5" />
                신규
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="space-y-1">
            <h3 className="font-medium text-base leading-tight line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-500 truncate">
              {book.author} · {book.publisher}
            </p>
          </div>

          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-brand-600">{book.currentPrice.toLocaleString()}원</span>
              <span className="text-sm text-gray-400 line-through">{book.originalPrice.toLocaleString()}원</span>
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-xs font-medium">
                {discountPercentage}% 할인
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-gray-100 text-xs">
                {book.condition}급
              </Badge>
              <span className="text-xs text-gray-500 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                입찰 {book.bids}회
              </span>
            </div>
            <span className="text-xs text-brand-600 flex items-center font-medium">
              <Timer className="mr-1 h-3 w-3" />
              {book.timeLeft}
            </span>
          </div>
        </div>
      </div>

      <div className="flex border-t">
        <Button className="flex-1 h-11 rounded-none bg-brand-600 hover:bg-brand-700 text-sm font-medium">
          입찰하기
        </Button>
        {book.buyNowPrice && (
          <Button variant="ghost" className="flex-1 h-11 rounded-none hover:bg-gray-50 text-sm font-medium border-l">
            즉시 구매
          </Button>
        )}
      </div>
    </Card>
  );
}

function BookPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-300">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    </div>
  );
}
