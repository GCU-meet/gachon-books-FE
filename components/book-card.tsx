import { Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    currentPrice: number;
    timeLeft: string;
    imageUrl?: string;
    isPopular?: boolean;
    isEnding?: boolean;
    isNew?: boolean;
  };
  viewType: "grid" | "list";
}

export function BookCard({ book, viewType }: BookCardProps) {
  const isListView = viewType === "list";
  const isUrgent = book.timeLeft.includes("분") || book.timeLeft.includes("초");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Card
      className={cn(
        "group transition-all duration-200 hover:border-brand-500 hover:shadow-md overflow-hidden bg-white",
        isListView ? "flex" : "flex flex-col"
      )}
    >
      {/* Image Section */}
      <div
        className={cn(
          "relative bg-gray-50",
          isListView ? "w-[120px] h-[160px] shrink-0" : isMobile ? "w-full aspect-[4/3]" : "w-full aspect-[3/4]"
        )}
      >
        {book.imageUrl ? (
          <img src={book.imageUrl || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <BookPlaceholder />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={cn("flex flex-col flex-1", isListView ? "p-4" : "p-3")}>
        <div className="flex-1">
          <h3 className={cn("font-medium line-clamp-2", isListView ? "text-base" : "text-sm")}>{book.title}</h3>

          <div className="mt-2 space-y-2">
            <div className="flex items-baseline gap-1">
              <span className={cn("font-bold text-brand-600", isListView ? "text-xl" : "text-lg")}>
                {book.currentPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">원</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {book.isPopular && (
                <Badge
                  variant="secondary"
                  className="bg-red-50 text-red-500 rounded-full text-xs font-normal px-2 py-0.5"
                >
                  🔥 인기
                </Badge>
              )}
              {book.isEnding && (
                <Badge
                  variant="secondary"
                  className="bg-amber-50 text-amber-500 rounded-full text-xs font-normal px-2 py-0.5"
                >
                  ⏳ 마감임박
                </Badge>
              )}
              {book.isNew && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-500 rounded-full text-xs font-normal px-2 py-0.5"
                >
                  ✨ 신규
                </Badge>
              )}
            </div>

            <div className={cn("flex items-center text-sm", isUrgent ? "text-red-500" : "text-gray-500")}>
              <Timer className="mr-1 h-3.5 w-3.5" />
              {book.timeLeft}
            </div>
          </div>
        </div>

        <Button className={cn("mt-3 bg-gray-900 hover:bg-gray-800", isListView ? "w-24" : "w-full")} size="sm">
          구매하기
        </Button>
      </div>
    </Card>
  );
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
  );
}
