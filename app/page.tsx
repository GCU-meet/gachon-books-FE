"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BookOpen, Menu, PlusCircle, HomeIcon, Search, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { isAuthenticated } from "@/utils/auth";
import { cn } from "@/lib/utils";
import { BookCard } from "@/components/book-card";

const categories = ["전체", "IT/컴퓨터", "경영/경제", "의학", "공학", "인문"];

const mockBooks = [
  {
    id: 1,
    title: "컴퓨터 구조론",
    currentPrice: 15000,
    timeLeft: "2시간 32분",
    imageUrl: "/placeholder.svg?height=200&width=150",
    isPopular: true,
    isEnding: true,
  },
  {
    id: 2,
    title: "경영학원론",
    currentPrice: 12000,
    timeLeft: "1일 4시간",
    imageUrl: "/placeholder.svg?height=200&width=150",
    isNew: true,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  useEffect(() => {
    const checkAuth = async () => {
      if (!(await isAuthenticated())) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setViewType(isMobileView ? "grid" : "list");
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="icon" className="mr-2 hover:bg-gray-50">
            <Menu className="h-5 w-5" />
          </Button>
          <Logo />
          <div className="flex-1" />
          <Button variant="ghost" size="icon" className="relative hover:bg-gray-50">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
          </Button>
          <Avatar className="h-8 w-8 ml-2">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="책 제목, 저자, 학과 등으로 검색"
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto overflow-x-auto">
          <div className="flex px-4 py-2 gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "whitespace-nowrap",
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
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-4">
        {!isMobile && (
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewType((prev) => (prev === "grid" ? "list" : "grid"))}
              className="hover:bg-gray-50"
            >
              {viewType === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              <span className="ml-2">{viewType === "grid" ? "리스트 보기" : "그리드 보기"}</span>
            </Button>
          </div>
        )}
        <div className={cn(viewType === "grid" ? "grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3" : "space-y-3")}>
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} viewType={viewType} />
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="flex items-center justify-around h-16 max-w-2xl mx-auto px-4">
            <Button variant="ghost" className="flex-1 h-full">
              <HomeIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1 h-full">
              <Bell className="h-6 w-6" />
            </Button>
            <div className="flex-1 relative flex justify-center">
              <Button className="absolute -top-6 rounded-full w-14 h-14 bg-brand-600 hover:bg-brand-700 shadow-lg">
                <PlusCircle className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" className="flex-1 h-full">
              <BookOpen className="h-6 w-6" />
            </Button>
            <Button variant="ghost" className="flex-1 h-full">
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
