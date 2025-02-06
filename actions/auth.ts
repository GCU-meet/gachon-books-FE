"use server";

import { isGachonEmail } from "../utils/validation";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;
  const name = formData.get("name") as string;

  if (!isGachonEmail(email)) {
    return {
      error: "가천대학교 이메일(@gachon.ac.kr)만 사용 가능합니다.",
    };
  }

  if (password !== passwordConfirm) {
    return {
      error: "비밀번호가 일치하지 않습니다.",
    };
  }

  // 여기서 실제 회원가입 로직을 구현합니다 (비밀번호 해싱, DB 저장 등)

  // 이메일 인증 코드 전송 API 호출 (실제 구현 필요)
  const verificationCode = await sendVerificationEmail(email);

  return { success: true, email, verificationCode };
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!isGachonEmail(email)) {
    return {
      error: "가천대학교 이메일(@gachon.ac.kr)만 사용 가능합니다.",
    };
  }

  // 여기서 실제 로그인 로직을 구현합니다
  // 예: DB에서 사용자 확인, 비밀번호 검증 등

  // 임시로 항상 성공하는 것으로 가정
  return { success: true };
}

export async function verifyEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  // 여기서 실제 이메일 인증 로직을 구현합니다
  // 예: DB에서 저장된 코드와 비교

  // 임시로 항상 성공하는 것으로 가정
  return { success: true };
}

// 이 함수는 실제 API 호출로 대체되어야 합니다
async function sendVerificationEmail(email: string): Promise<string> {
  // 실제로는 서버에서 인증 코드를 생성하고 이메일로 전송해야 합니다
  return "123456"; // 임시 코드
}
