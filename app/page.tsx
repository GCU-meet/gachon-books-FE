"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BookOpen, Menu, PlusCircle, HomeIcon, Search, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { BookCardV35 } from "@/components/book-card-v35";
import { isAuthenticated } from "@/utils/auth";
import { cn } from "@/lib/utils";

const categories = ["전체", "IT/컴퓨터", "경영/경제", "의학", "공학", "인문"];

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
    department: "컴퓨터공학과",
    condition: "상",
    bids: 12,
    tags: ["필수교재", "2024-1학기"],
    imageUrl: "/placeholder.svg?height=200&width=150",
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
    department: "경영학과",
    condition: "중",
    bids: 3,
    tags: ["필수교재"],
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

  const toggleViewType = () => {
    setViewType((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <Logo />
          <div className="flex-1" />
          <Button variant="ghost" size="icon" className="relative">
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
      <div className="bg-white px-4 py-2 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input type="search" placeholder="책 제목, 저자, 학과 등으로 검색" className="pl-10 bg-gray-50" />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b overflow-x-auto">
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={toggleViewType}>
            {viewType === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
            <span className="ml-2">{viewType === "grid" ? "리스트 보기" : "그리드 보기"}</span>
          </Button>
        </div>
        <div className={cn(viewType === "grid" ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4")}>
          {mockBooks.map((book) => (
            <BookCardV35 key={book.id} book={book} viewType={viewType} />
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden">
        <div className="flex items-center justify-around h-14">
          <Button variant="ghost" className="flex-1 h-full">
            <HomeIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="flex-1 h-full">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative flex justify-center">
            <Button className="absolute -top-5 rounded-full w-12 h-12 bg-brand-600 hover:bg-brand-700 shadow-lg">
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" className="flex-1 h-full">
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="flex-1 h-full">
            <Avatar className="h-6 w-6">
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </div>
  );
}
