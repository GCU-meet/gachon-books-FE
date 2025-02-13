"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BookOpen, Menu, PlusCircle, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { isAuthenticated, removeTokens } from "@/utils/auth";
import { toast } from "@/components/ui/use-toast";
import cn from "classnames";
import { SearchFilter } from "@/components/search-filter";
import { BookCard } from "@/components/book-card";

const categories = ["전체", "IT/컴퓨터", "경영/경제", "의학", "공학", "인문", "사회과학", "자연과학", "예술/체육"];

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
    imageUrl: "/placeholder.svg?height=200&width=150",
    tags: ["IT", "필수교재", "2024-1학기"],
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
    imageUrl: "/placeholder.svg?height=200&width=150",
    tags: ["경영", "필수교재"],
    isNew: true,
  },
  // ... 더 많은 책 데이터
];

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        router.push("/login");
      } else {
        setUserName("사용자");
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    removeTokens();
    toast({
      title: "로그아웃 되었습니다.",
      duration: 3000,
    });
    router.push("/login");
  };

  if (!userName) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white border-b transition-all duration-200 ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Logo />
            </div>

            <div className={`flex-1 max-w-2xl px-4 transition-all duration-200 ${isScrolled ? "scale-95" : ""}`}>
              <SearchFilter />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>프로필 설정</DropdownMenuItem>
                  <DropdownMenuItem>내 경매 내역</DropdownMenuItem>
                  <DropdownMenuItem>관심 목록</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mt-8">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">전체 경매</TabsTrigger>
              <TabsTrigger value="ending">마감 임박</TabsTrigger>
              <TabsTrigger value="popular">인기 경매</TabsTrigger>
              <TabsTrigger value="department">학과별</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 border rounded-lg p-1">
                <Button
                  variant={viewType === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewType("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewType === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewType("list")}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
              <Button className="hidden sm:flex">
                <PlusCircle className="mr-2 h-4 w-4" />책 등록하기
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <div
              className={cn(
                "grid gap-6",
                viewType === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
              )}
            >
              {mockBooks.map((book) => (
                <BookCard key={book.id} book={book} viewType={viewType} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden">
        <div className="flex items-center justify-around h-16">
          <Button variant="ghost" className="flex-1">
            <div className="flex flex-col items-center">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs mt-1">홈</span>
            </div>
          </Button>
          <Button variant="ghost" className="flex-1">
            <div className="flex flex-col items-center">
              <Bell className="h-5 w-5" />
              <span className="text-xs mt-1">알림</span>
            </div>
          </Button>
          <Button className="rounded-full w-12 h-12 absolute -top-6 left-1/2 transform -translate-x-1/2 bg-brand-600">
            <PlusCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="flex-1">
            <div className="flex flex-col items-center">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs mt-1">내 경매</span>
            </div>
          </Button>
          <Button variant="ghost" className="flex-1">
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
