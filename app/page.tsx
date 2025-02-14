"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BookOpen, Menu, PlusCircle, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { BookCard } from "@/components/book-card";
import { isAuthenticated } from "@/utils/auth";
import { cn } from "@/lib/utils";

const categories = ["전체", "IT/컴퓨터", "경영/경제", "의학", "공학", "인문"];
const tabs = ["전체 경매", "마감 임박", "인기 경매", "학과별"];

const mockBooks = [
  {
    id: 1,
    title: "컴퓨터 구조론",
    author: "김철수",
    publisher: "가천출판사",
    currentPrice: 15000,
    originalPrice: 28000,
    buyNowPrice: 20000,
    timeLeft: "2시간 32분",
    condition: "상",
    bids: 12,
    imageUrl: "/placeholder.svg?height=100&width=100",
    isPopular: true,
    isEnding: true,
  },
  {
    id: 2,
    title: "경영학원론",
    author: "박영희",
    publisher: "경영출판사",
    currentPrice: 12000,
    originalPrice: 25000,
    timeLeft: "1일 4시간",
    condition: "중",
    bids: 3,
    imageUrl: "/placeholder.svg?height=100&width=100",
    isNew: true,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedTab, setSelectedTab] = useState("전체 경매");
  const router = useRouter();

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
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center h-14 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Logo />
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2 border-b">
          <div className="relative">
            <input
              type="search"
              placeholder="책 제목, 저자, 학과 등으로 검색"
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-brand-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto scrollbar-hide border-b">
          <div className="flex px-4 py-2 gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "whitespace-nowrap px-4",
                  selectedCategory === category
                    ? "bg-brand-600 hover:bg-brand-700 text-white"
                    : "bg-white hover:bg-gray-50"
                )}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto scrollbar-hide bg-gray-50">
          <div className="flex px-4 gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={cn(
                  "px-1 py-3 text-sm font-medium border-b-2 transition-colors",
                  selectedTab === tab
                    ? "border-brand-600 text-brand-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-4">
        <div className="space-y-3">
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden">
        <div className="flex items-center justify-around h-14">
          <Button variant="ghost" className="flex-1 h-14">
            <div className="flex flex-col items-center">
              <HomeIcon className="h-5 w-5" />
              <span className="text-xs mt-1">홈</span>
            </div>
          </Button>
          <Button variant="ghost" className="flex-1 h-14">
            <div className="flex flex-col items-center">
              <Bell className="h-5 w-5" />
              <span className="text-xs mt-1">알림</span>
            </div>
          </Button>
          <div className="flex-1 relative flex justify-center">
            <Button className="absolute -top-5 rounded-full w-12 h-12 bg-brand-600 hover:bg-brand-700 shadow-lg">
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" className="flex-1 h-14">
            <div className="flex flex-col items-center">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs mt-1">내 경매</span>
            </div>
          </Button>
          <Button variant="ghost" className="flex-1 h-14">
            <div className="flex flex-col items-center">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-xs">UN</AvatarFallback>
              </Avatar>
              <span className="text-xs mt-1">프로필</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
