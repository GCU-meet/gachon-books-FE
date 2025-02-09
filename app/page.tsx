"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LogOut, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { useUser } from "@/contexts/UserContext";
import { removeTokens } from "@/utils/auth";
import { toast } from "@/components/ui/use-toast";

export default function Home() {
  const { user, loading } = useUser(); 
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); 
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    removeTokens();
    toast({
      title: "로그아웃 되었습니다.",
      duration: 3000,
    });
    router.push("/login");
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">안녕하세요, {user.name}님!</span> {/* ✅ user.name 사용 */}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">중고책 거래</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />책 등록하기
          </Button>
        </div>

        <div className="mb-8">
          <form className="flex gap-2">
            <Input type="search" placeholder="책 제목, 저자, 학과 등으로 검색" className="flex-grow" />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              검색
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((book) => (
            <Card key={book}>
              <CardHeader>
                <CardTitle>책 제목 {book}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>저자: 작가 이름</p>
                <p>가격: ₩15,000</p>
                <p>상태: 좋음</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  자세히 보기
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500">
          © 2023 가천북스. All rights reserved.
        </div>
      </footer>
    </div>
  );
}