"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/utils/api";
import { useUser } from "@/contexts/UserContext";
import { isAuthenticated } from "@/utils/auth";

function isGachonEmail(email: string): boolean {
  return email.endsWith("@gachon.ac.kr");
}

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const { refreshUser } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        router.push("/");
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (email && !isGachonEmail(email)) {
      setEmailError("가천대학교 이메일(@gachon.ac.kr)만 사용 가능합니다.");
    } else {
      setEmailError("");
    }
  }, [email]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailError) {
      return;
    }

    const formData = new FormData(e.currentTarget);
    try {
      const result = await signIn(formData);

      if (result.success) {
        await refreshUser();
        router.push("/");
      } else {
        setError("로그인에 실패했습니다.");
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">학교 이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gachon.ac.kr"
                  className={`border-2 ${emailError ? "border-red-500" : "focus:border-brand-500"}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                />
                {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="border-2 focus:border-brand-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
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

              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700" disabled={!!emailError}>
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
