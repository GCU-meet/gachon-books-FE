"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, PlusCircle, Search, Timer, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { isAuthenticated, removeTokens } from "@/utils/auth";
import { toast } from "@/components/ui/use-toast";

const categories = ["전체", "IT/컴퓨터", "경영/경제", "의학", "공학", "인문", "사회과학", "자연과학", "예술/체육"];

const mockBooks = [
  {
    id: 1,
    title: "컴퓨터 구조론",
    author: "김철수",
    publisher: "가천출판사",
    currentPrice: 15000,
    originalPrice: 28000,
    timeLeft: "2시간 32분",
    department: "컴퓨터공학과",
    condition: "상",
    bids: 5,
    imageUrl: "/placeholder.svg?height=200&width=150",
    tags: ["IT", "필수교재", "2024-1학기"],
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
  },
  // ... 더 많은 책 데이터
];

export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("전체");

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
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            {/* Search */}
            <div className="flex-1 max-w-2xl px-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="책 제목, 저자, 학과 등으로 검색"
                  className="pl-10 w-full bg-gray-50"
                />
              </div>
            </div>

            {/* User Menu */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />책 등록하기
            </Button>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockBooks.map((book) => (
                <Card key={book.id} className="group hover:border-brand-500 transition-colors">
                  <CardHeader className="p-4">
                    <div className="aspect-[3/4] relative rounded-lg overflow-hidden mb-4">
                      <img
                        src={book.imageUrl || "/placeholder.svg"}
                        alt={book.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                      />
                      {book.timeLeft && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                          <Timer className="w-3 h-3 mr-1" />
                          {book.timeLeft}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                      <CardDescription>
                        {book.author} · {book.publisher}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-baseline justify-between">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">현재가</div>
                        <div className="text-lg font-bold text-brand-600">{book.currentPrice.toLocaleString()}원</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground line-through">
                          {book.originalPrice.toLocaleString()}원
                        </div>
                        <div className="text-sm text-brand-600 font-medium">
                          {Math.round((1 - book.currentPrice / book.originalPrice) * 100)}% 할인
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
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
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
