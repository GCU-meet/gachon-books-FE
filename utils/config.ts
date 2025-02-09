export const config = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
    tokenKey: process.env.NEXT_PUBLIC_TOKEN_KEY as string,
    tokenExpireTime: parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME as string || '86400'),
};