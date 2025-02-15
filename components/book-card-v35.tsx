import { Timer, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
  viewType: "grid" | "list";
}

export function BookCardV35({ book, viewType }: BookCardProps) {
  const isListView = viewType === "list";
  const discountPercentage = Math.round((1 - book.currentPrice / book.originalPrice) * 100);

  return (
    <Card
      className={cn(
        "group transition-all duration-200 hover:border-brand-500 hover:shadow-md",
        isListView ? "flex items-center" : ""
      )}
    >
      <div className={cn("relative", isListView ? "w-32 h-40 shrink-0" : "aspect-[3/4]")}>
        {book.imageUrl ? (
          <img
            src={book.imageUrl || "/placeholder.svg"}
            alt={book.title}
            className={cn(
              "object-cover rounded-lg transition-transform group-hover:scale-105",
              isListView ? "w-32 h-40" : "w-full h-full"
            )}
          />
        ) : (
          <div
            className={cn(
              "flex items-center justify-center bg-muted rounded-lg",
              isListView ? "w-32 h-40" : "w-full h-full"
            )}
          >
            <BookPlaceholder />
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-1">
          {book.isPopular && (
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              <TrendingUp className="mr-1 h-3 w-3" />
              인기
            </Badge>
          )}
          {book.isEnding && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              <Timer className="mr-1 h-3 w-3" />
              마감임박
            </Badge>
          )}
          {book.isNew && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Sparkles className="mr-1 h-3 w-3" />
              신규
            </Badge>
          )}
        </div>
      </div>

      <div className={cn("flex-1", isListView ? "p-4" : "")}>
        {!isListView && (
          <CardHeader className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold line-clamp-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground">
                {book.author} · {book.publisher}
              </p>
            </div>
          </CardHeader>
        )}

        <CardContent className={cn(isListView ? "p-0" : "p-4 pt-0")}>
          {isListView ? (
            <div>
              <h3 className="font-semibold line-clamp-1">{book.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {book.author} · {book.publisher}
              </p>
            </div>
          ) : null}
          <div className={cn("flex items-baseline justify-between", isListView ? "mt-2" : "")}>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">현재가</div>
              <div className="text-lg font-bold text-brand-600">{book.currentPrice.toLocaleString()}원</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground line-through">{book.originalPrice.toLocaleString()}원</div>
              <div className="text-sm text-brand-600 font-medium">{discountPercentage}% 할인</div>
            </div>
          </div>
          {book.buyNowPrice && (
            <div className="mt-2 text-sm text-muted-foreground">즉시 구매가: {book.buyNowPrice.toLocaleString()}원</div>
          )}
        </CardContent>

        {!isListView && (
          <CardFooter className="p-4 pt-0">
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  입찰 {book.bids}회
                </div>
                <Badge variant="secondary">{book.condition}급</Badge>
              </div>
              <div className="flex gap-2 flex-wrap">
                {book.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-brand-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardFooter>
        )}

        {isListView && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">{book.condition}급</Badge>
              <span>·</span>
              <div className="flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                {book.bids}
              </div>
            </div>
            <Button size="sm">
              입찰하기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

function BookPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground">
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
      <span className="mt-2 text-sm">이미지 없음</span>
    </div>
  );
}
