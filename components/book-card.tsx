import { Timer, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    department: string;
    condition: string;
    bids: number;
    imageUrl?: string;
    tags: string[];
    isPopular?: boolean;
    isEnding?: boolean;
    isNew?: boolean;
  };
  viewType?: "grid" | "list";
}

export function BookCard({ book, viewType = "grid" }: BookCardProps) {
  const isListView = viewType === "list";
  const discountPercentage = Math.round((1 - book.currentPrice / book.originalPrice) * 100);

  return (
    <Card
      className={cn(
        "group transition-all duration-200 hover:border-brand-500 hover:shadow-md overflow-hidden",
        isListView ? "flex gap-6 p-6" : ""
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-gray-50",
          isListView ? "w-40 h-40 shrink-0 rounded-lg" : "aspect-[4/3]"
        )}
      >
        {book.imageUrl ? (
          <img
            src={book.imageUrl || "/placeholder.svg"}
            alt={book.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <BookPlaceholder />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {book.isPopular && (
            <Badge className="bg-red-500 text-white border-none">
              <TrendingUp className="mr-1 h-3 w-3" />
              인기
            </Badge>
          )}
          {book.isEnding && (
            <Badge className="bg-amber-500 text-white border-none">
              <Timer className="mr-1 h-3 w-3" />
              마감임박
            </Badge>
          )}
          {book.isNew && (
            <Badge className="bg-emerald-500 text-white border-none">
              <Sparkles className="mr-1 h-3 w-3" />
              신규
            </Badge>
          )}
        </div>
      </div>

      <div className={cn("flex-1", isListView ? "" : "p-6")}>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold line-clamp-2 mb-1">{book.title}</h3>
            <p className="text-gray-600">
              {book.author} · {book.publisher}
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">현재가</div>
              <div className="text-2xl font-bold text-brand-600">{book.currentPrice.toLocaleString()}원</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-400 line-through">{book.originalPrice.toLocaleString()}원</span>
                <Badge variant="secondary" className="bg-brand-50 text-brand-600">
                  {discountPercentage}% 할인
                </Badge>
              </div>
            </div>
            {book.buyNowPrice && (
              <div className="text-right">
                <div className="text-sm text-gray-500 mb-1">즉시 구매가</div>
                <div className="text-lg font-semibold text-gray-900">{book.buyNowPrice.toLocaleString()}원</div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-gray-100">
                {book.condition}급
              </Badge>
              <div className="flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                입찰 {book.bids}회
              </div>
            </div>
            <div className="flex items-center text-brand-600 font-medium">
              <Timer className="mr-1 h-4 w-4" />
              {book.timeLeft}
            </div>
          </div>

          {!isListView && book.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-2">
              {book.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className={cn("flex gap-3", isListView ? "mt-6" : "mt-4")}>
            <Button
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white h-12"
              size={isListView ? "default" : "lg"}
            >
              입찰하기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            {book.buyNowPrice && (
              <Button
                variant="outline"
                className="flex-1 border-brand-200 text-brand-700 hover:bg-brand-50 h-12"
                size={isListView ? "default" : "lg"}
              >
                즉시 구매
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function BookPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-300">
      <svg
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
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
