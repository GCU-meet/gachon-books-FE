"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { signIn } from "../../actions/auth";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await signIn(formData);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.success) {
      // 로그인 성공 시 처리
      window.location.href = "/dashboard";
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-brand-50 to-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">가천대생을 위한 중고책 거래</h1>
          <p className="text-gray-600">학우들과 함께 더 저렴하게 책을 구매하세요</p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">서비스 로그인</CardTitle>
            <CardDescription>학교 이메일로 시작하기</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">학교 이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gachon.ac.kr"
                  className="border-2 focus:border-brand-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPasswordConfirm ? "text" : "password"}
                    className="border-2 focus:border-brand-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  >
                    {showPasswordConfirm ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                로그인
              </Button>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">또는</span>
                  </div>
                </div>

                <div className="text-center text-sm">
                  <Link href="/signup" className="text-brand-600 hover:text-brand-700 font-semibold">
                    새 계정 만들기
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-gray-500">
          <p>
            도움이 필요하신가요?{" "}
            <a href="#" className="text-brand-600 hover:text-brand-700">
              문의하기
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
