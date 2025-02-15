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
        isListView ? "flex" : ""
      )}
    >
      <div className={cn("relative overflow-hidden bg-gray-100", isListView ? "w-[180px] shrink-0" : "aspect-[4/3]")}>
        {book.imageUrl ? (
          <img
            src={book.imageUrl || "/placeholder.svg"}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}

        <div className="absolute top-2 left-2 flex gap-1.5">
          {book.isPopular && (
            <Badge className="bg-red-500 text-white border-0 shadow-sm">
              <TrendingUp className="mr-1 h-3 w-3" />
              인기
            </Badge>
          )}
          {book.isNew && (
            <Badge className="bg-emerald-500 text-white border-0 shadow-sm">
              <Sparkles className="mr-1 h-3 w-3" />
              신규
            </Badge>
          )}
        </div>
      </div>

      <div className={cn("flex flex-col", isListView ? "flex-1 p-5" : "p-4")}>
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className={cn("font-medium line-clamp-2", isListView ? "text-lg" : "text-base")}>{book.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {book.author} · {book.publisher}
                </p>
              </div>
              {isListView && (
                <Badge variant="secondary" className="shrink-0 bg-gray-100">
                  {book.condition}급
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              <Badge variant="secondary" className="bg-gray-100 text-xs">
                {book.department}
              </Badge>
              {book.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className={cn("flex", isListView ? "items-end justify-between" : "flex-col gap-2")}>
            <div>
              <div className="flex items-baseline gap-2">
                <span className={cn("font-bold text-brand-600", isListView ? "text-2xl" : "text-lg")}>
                  {book.currentPrice.toLocaleString()}원
                </span>
                <span className="text-sm text-gray-400 line-through">{book.originalPrice.toLocaleString()}원</span>
              </div>
              <Badge variant="secondary" className="mt-1 bg-blue-50 text-blue-600">
                {discountPercentage}% OFF
              </Badge>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                입찰 {book.bids}회
              </span>
              <span className="flex items-center text-brand-600 font-medium">
                <Timer className="mr-1 h-4 w-4" />
                {book.timeLeft}
              </span>
            </div>
          </div>
        </div>

        <div className={cn("flex gap-2 mt-4", isListView ? "mt-6" : "mt-4")}>
          <Button className="flex-1 bg-brand-600 hover:bg-brand-700" size={isListView ? "lg" : "default"}>
            입찰하기
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          {book.buyNowPrice && (
            <Button
              variant="outline"
              className="flex-1 border-brand-200 text-brand-700 hover:bg-brand-50"
              size={isListView ? "lg" : "default"}
            >
              즉시 구매
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
