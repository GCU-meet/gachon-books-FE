"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/logo";
import { ServicePreview } from "@/components/service-preview";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { signUp, verifyEmail, sendVerificationEmail } from "@/utils/api";
import { isGachonEmail, validatePassword } from "@/utils/validation";
import { formatPhoneNumber, stripPhoneNumber } from "@/utils/format";
import { toast } from "@/components/ui/use-toast";
import debounce from "lodash/debounce";
import type React from "react"; // Added import for React

export default function SignUpPage() {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<{
    isValid: boolean;
    errors: string[];
  }>({ isValid: false, errors: [] });
  const [canResend, setCanResend] = useState(false);

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

  useEffect(() => {
    if (password) {
      const validation = validatePassword(password);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation({ isValid: false, errors: [] });
    }
  }, [password]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isVerificationSent) {
      setCanResend(true);
    }
  }, [countdown, isVerificationSent]);

  // Debounced version of handleSendVerification
  const debouncedSendVerification = useCallback(
    debounce(async () => {
      try {
        await sendVerificationEmail(email);
        setIsVerificationSent(true);
        setShowVerificationInput(true);
        setCountdown(300);
        setCanResend(false);
        setError("");
      } catch (err) {
        setError("인증 코드 전송 중 오류가 발생했습니다.");
      }
    }, 1000),
    [] // Fixed dependency array
  );

  // Handle phone number formatting
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailError || passwordError || !passwordValidation.isValid || !isEmailVerified) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("department", department);
      formData.append("phoneNumber", stripPhoneNumber(phoneNumber));
      formData.append("password", password);

      const result = await signUp(formData);
      if (result.success) {
        window.location.href = "/login?registered=true";
      } else {
        setError(result.error || "회원가입 중 오류가 발생했습니다.");
      }
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  }

  async function handleSendVerification() {
    debouncedSendVerification();
  }

  async function handleVerifyCode(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!verificationCode) {
      setError("인증 코드를 입력해주세요.");
      return;
    }
    try {
      const result = await verifyEmail(email, verificationCode);
      if (result.success) {
        setIsEmailVerified(true);
        setShowVerificationInput(false);
        setError("");
        toast({
          title: "이메일 인증 완료",
          description: "이메일 인증이 성공적으로 완료되었습니다.",
          duration: 3000,
        });
      } else {
        setError("인증 코드가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("이메일 인증 중 오류가 발생했습니다.");
    }
  }

  return (
    <div className="min-h-screen flex items-stretch bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex gap-8">
        {/* Left side - Signup Form */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <Logo />
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">가천대생을 위한 중고책 거래</h1>
              <p className="text-gray-600">학우들과 함께 더 저렴하게 책을 구매하세요</p>
            </div>

            <Card className="border-2">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">새 계정 만들기</CardTitle>
                <CardDescription>가천대 이메일로 시작하기</CardDescription>
              </CardHeader>
              <CardContent>
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
                    <Label htmlFor="email">가천대 이메일</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="학번@gachon.ac.kr"
                        className={`border-2 ${
                          emailError
                            ? "border-red-500"
                            : isEmailVerified
                            ? "border-green-500 bg-green-50"
                            : "focus:border-brand-500"
                        }`}
                        value={email}
                        onChange={(e) => {
                          if (!isEmailVerified) {
                            setEmail(e.target.value);
                            setError("");
                          }
                        }}
                        disabled={isEmailVerified}
                        required
                      />
                      <Button
                        type="button"
                        onClick={handleSendVerification}
                        disabled={!!emailError || isEmailVerified || (isVerificationSent && !canResend)}
                        className={`whitespace-nowrap ${
                          isEmailVerified ? "bg-green-500 hover:bg-green-600" : "bg-brand-600 hover:bg-brand-700"
                        }`}
                      >
                        {isEmailVerified
                          ? "인증완료"
                          : isVerificationSent && !canResend
                          ? `${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
                          : canResend
                          ? "재전송"
                          : "인증하기"}
                      </Button>
                    </div>
                    {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
                  </div>

                  {showVerificationInput && !isEmailVerified && (
                    <div className="space-y-2">
                      <Label htmlFor="verificationCode">인증 코드</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="verificationCode"
                          name="verificationCode"
                          className="border-2 focus:border-brand-500"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          onClick={handleVerifyCode}
                          className="whitespace-nowrap bg-brand-600 hover:bg-brand-700"
                        >
                          인증 확인
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="department">학과</Label>
                    <Input
                      id="department"
                      name="department"
                      className="border-2 focus:border-brand-500"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">전화번호</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className="border-2 focus:border-brand-500"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="010-0000-0000"
                      maxLength={13}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={`border-2 ${
                          password
                            ? passwordValidation.isValid
                              ? "border-green-500"
                              : "border-red-500"
                            : "focus:border-brand-500"
                        } pr-10`}
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
                    {password && (
                      <div className="mt-2 space-y-1">
                        {passwordValidation.errors.map((error, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {passwordValidation.isValid ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span
                              className={`text-sm ${passwordValidation.isValid ? "text-green-500" : "text-red-500"}`}
                            >
                              {error}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
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
                    disabled={!!emailError || !!passwordError || !isEmailVerified || !passwordValidation.isValid}
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
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right side - Service Preview */}
        <div className="hidden lg:flex flex-1">
          <ServicePreview />
        </div>
      </div>
    </div>
  );
}
