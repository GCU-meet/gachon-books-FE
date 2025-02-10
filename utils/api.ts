import { getAccessToken, getRefreshToken, setTokens, removeTokens } from "./auth";
import { config } from "./config";

const API_BASE_URL = config.apiBaseUrl + "/auth";

export async function signIn(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/signin`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { success: false, error: errorData.message || "로그인 중 오류가 발생했습니다." };
  }

  const data = await response.json();
  setTokens(data.accessToken, data.idToken, data.refreshToken);

  return { success: true };
}

export async function signUp(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원가입 중 오류가 발생했습니다.");
  }

  return response.json();
}

export async function signOut() {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      await fetch(`${API_BASE_URL}/signout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  }
  removeTokens();
}

export async function refreshTokens() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  const response = await fetch(`${API_BASE_URL}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    removeTokens();
    throw new Error("Failed to refresh tokens");
  }

  const data = await response.json();
  setTokens(data.accessToken, data.idToken, data.refreshToken);
}

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  let accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error("No access token available");
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      // Access token has expired, try to refresh
      await refreshTokens();
      accessToken = getAccessToken();

      // Retry the request with the new access token
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return response;
  } catch (error) {
    console.error("Error in authenticatedFetch:", error);
    throw error;
  }
}

export async function verifyEmail(email: string, code: string) {
  const response = await fetch(`${API_BASE_URL}/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otpCode: code }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "이메일 인증 중 오류가 발생했습니다.");
  }

  return { success: true };
}

export async function sendVerificationEmail(email: string) {
  const response = await fetch(`${API_BASE_URL}/send-verification-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "인증 코드 전송 중 오류가 발생했습니다.");
  }

  return response.json();
}

export async function fetchUserInfo() {
  const response = await authenticatedFetch(`${API_BASE_URL}/user/me`);

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }

  return response.json();
}
