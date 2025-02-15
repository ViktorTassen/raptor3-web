export interface TokenExchangeRequest {
  code: string;
}

export interface TokenRefreshRequest {
  refresh_token: string;
}

export interface TokenExchangeResponse {
  accessToken: string;
  expiresAt: number;
  refreshToken?: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  expiresAt: number;
}