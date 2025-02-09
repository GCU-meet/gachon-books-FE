export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  tokenKey: process.env.NEXT_PUBLIC_TOKEN_KEY as string,
  tokenExpireTime: parseInt((process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME as string) || "86400"),
  accessTokenKey: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
  idTokenKey: process.env.NEXT_PUBLIC_ID_TOKEN_KEY as string,
  refreshTokenKey: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
};
