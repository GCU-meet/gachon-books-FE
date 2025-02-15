import { Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BookCardMobileProps {
  book: {
    id: number;
    title: string;
    author: string;
    currentPrice: number;
    originalPrice: number;
    timeLeft: string;
    imageUrl?: string;
    isPopular?: boolean;
    isEnding?: boolean;
    isNew?: boolean;
  };
}

export function BookCardMobile({ book }: BookCardMobileProps) {
  const discountPercentage = Math.round((1 - book.currentPrice / book.originalPrice) * 100);
  const timeLeftHours = Number.parseInt(book.timeLeft.split("시간")[0]);
  const isUrgent = timeLeftHours <= 3;

  return (
    <Link href={`/books/${book.id}`}>
      <Card className="mb-3 overflow-hidden bg-white">
        <div className="relative">
          {/* 이미지 섹션 */}
          <div className="relative aspect-[16/9] bg-gray-100">
            {book.imageUrl ? (
              <img src={book.imageUrl || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            )}

            {/* 상태 뱃지 */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              {book.isPopular && <Badge className="bg-red-500 text-white border-0 shadow-sm px-2 py-1">🔥 인기</Badge>}
              {book.isNew && <Badge className="bg-emerald-500 text-white border-0 shadow-sm px-2 py-1">✨ 신규</Badge>}
            </div>

            {/* 남은 시간 뱃지 */}
            <Badge
              className={cn(
                "absolute top-3 right-3 shadow-sm border-0 px-2 py-1",
                isUrgent ? "bg-red-500 text-white" : "bg-white/90 text-gray-900"
              )}
            >
              <Timer className="mr-1 h-3.5 w-3.5" />
              {book.timeLeft}
            </Badge>
          </div>

          {/* 콘텐츠 섹션 */}
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-lg font-medium leading-snug">{book.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{book.author}</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-brand-600">{book.currentPrice.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">원</span>
                </div>
                <span className="text-sm text-gray-400 line-through">{book.originalPrice.toLocaleString()}원</span>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-sm px-2.5 py-1">
                {discountPercentage}% OFF
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
