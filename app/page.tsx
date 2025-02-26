"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BookOpen, Menu, PlusCircle, HomeIcon, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { BookCard } from "@/components/book-card";
import { isAuthenticated } from "@/utils/auth";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const categories = ["전체", "IT/컴퓨터", "경영/경제", "의학", "공학", "인문"];

// 테스트용 데이터 업데이트
const mockBooks = [
  {
    id: 1,
    title: "데이터베이스 시스템 - 데이터베이스 설계와 구현의 원리",
    author: "김영희",
    publisher: "가천출판사",
    condition: "최상",
    currentPrice: 18000,
    immediatePrice: 25000,
    timeLeft: "3시간 전",
    endTime: "오늘 18:00",
    location: "태평동",
    imageUrl: "/placeholder.svg?height=400&width=400",
    isPopular: true,
    currentBidders: 5,
    comments: 5,
    likes: 7,
  },
  {
    id: 2,
    title: "마케팅의 원리 - 현대 마케팅의 이해와 전략",
    author: "이철수",
    publisher: "경영출판",
    condition: "상",
    currentPrice: 10000,
    timeLeft: "5시간 전",
    endTime: "내일 12:00",
    location: "수진동",
    imageUrl: "/placeholder.svg?height=400&width=400",
    isEnding: true,
    currentBidders: 3,
    comments: 1,
    likes: 2,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const checkAuth = async () => {
      if (!(await isAuthenticated())) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-4">
              {isMobile ? (
                <Menu className="h-6 w-6" />
              ) : (
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <Bell className="h-6 w-6" />
              <Avatar className="h-8 w-8">
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      {isMobile ? (
        <div className="bg-white px-4 py-3 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="책 제목, 저자 검색" className="pl-10 bg-gray-50 border-0" />
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full px-4 whitespace-nowrap",
                  selectedCategory === category ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white"
                )}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="책 제목, 저자, 학과 검색" className="pl-10" />
              </div>
              <Select defaultValue="latest">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="ending">마감임박순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="price-low">낮은가격순</SelectItem>
                  <SelectItem value="price-high">높은가격순</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full px-4 whitespace-nowrap"
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={cn(isMobile ? "px-4 py-3 space-y-3" : "max-w-7xl mx-auto px-4 py-6")}>
        <div className={cn(isMobile ? "space-y-3" : "grid grid-cols-1 lg:grid-cols-2 gap-4")}>
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex items-center justify-around h-16">
            <Button variant="ghost" className="flex-1">
              <HomeIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1">
              <Bell className="h-6 w-6" />
            </Button>
            <div className="flex-1 relative flex justify-center">
              <Button className="absolute -top-6 rounded-full w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white">
                <PlusCircle className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" className="flex-1">
              <BookOpen className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1">
              <Avatar className="h-7 w-7">
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
