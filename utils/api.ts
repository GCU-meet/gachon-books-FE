const API_BASE_URL = "https://your-api-url.com/api"; // 실제 API URL로 변경해주세요

export async function signUp(userData: { name: string; email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원가입 중 오류가 발생했습니다.");
  }

  return response.json();
}

export async function verifyEmail(verificationData: { email: string; code: string }) {
  const response = await fetch(`${API_BASE_URL}/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(verificationData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "이메일 인증 중 오류가 발생했습니다.");
  }

  return response.json();
}
