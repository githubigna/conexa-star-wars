export interface PayloadToken {
  sub: string;
  role: string;
}
export interface AuthJwtResponse {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}
export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
