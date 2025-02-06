"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { signUp, verifyEmail } from "@/utils/api";
import { Eye, EyeOff } from "lucide-react";
import { isGachonEmail } from "@/utils/validation";

export default function SignUpPage() {
  const [error, setError] = useState<string>("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if (email && !isGachonEmail(email)) {
      setEmailError("가천대학교 이메일(@gachon.ac.kr)만 사용 가능합니다.");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (password && passwordConfirm && password !== passwordConfirm) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  }, [password, passwordConfirm]);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }

    try {
      const result = await signUp({ name, email, password });
      setVerificationStep(true);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "회원가입 중 오류가 발생했습니다.");
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await verifyEmail({
        email,
        code: (e.target as HTMLFormElement).code.value,
      });
      window.location.href = "/login?verified=true";
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("이메일 인증 중 오류가 발생했습니다.");
      }
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
            <CardTitle className="text-xl">{verificationStep ? "이메일 인증" : "새 계정 만들기"}</CardTitle>
            <CardDescription>
              {verificationStep ? "이메일로 전송된 인증 코드를 입력하세요" : "학교 이메일로 시작하기"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!verificationStep ? (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    name="name"
                    className="border-2 focus:border-brand-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                      className={`border-2 ${passwordError ? "border-red-500" : "focus:border-brand-500"} pr-10`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
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
                <div className="space-y-2">
                  <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                  <div className="relative">
                    <Input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type={showPasswordConfirm ? "text" : "password"}
                      className={`border-2 ${passwordError ? "border-red-500" : "focus:border-brand-500"} pr-10`}
                      value={passwordConfirm}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                        setError("");
                      }}
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
                  {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700"
                  disabled={!!emailError || !!passwordError}
                >
                  계정 만들기
                </Button>

                <div className="text-center text-sm">
                  이미 계정이 있으신가요?{" "}
                  <Link href="/login" className="text-brand-600 hover:text-brand-700 font-semibold">
                    로그인하기
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">인증 코드</Label>
                  <Input id="code" name="code" className="border-2 focus:border-brand-500" required />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                  인증하기
                </Button>
              </form>
            )}
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
