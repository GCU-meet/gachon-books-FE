import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";
const ID_TOKEN_KEY = "id_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export function setTokens(accessToken: string, idToken: string, refreshToken: string) {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 1 / 24, secure: true, sameSite: "strict" }); // 1 hour expiry
  Cookies.set(ID_TOKEN_KEY, idToken, { expires: 1, secure: true, sameSite: "strict" }); // 1 day expiry
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 30, secure: true, sameSite: "strict" }); // 30 days expiry
}

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function getIdToken(): string | undefined {
  return Cookies.get(ID_TOKEN_KEY);
}

export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

export function removeTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(ID_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  const accessToken = getAccessToken();
  if (!accessToken) return false;

  try {
    const decodedToken: any = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch {
    return false;
  }
}

export function getUserInfo(): any | null {
  const idToken = getIdToken();
  if (!idToken) return null;

  try {
    return jwtDecode(idToken);
  } catch {
    return null;
  }
}
