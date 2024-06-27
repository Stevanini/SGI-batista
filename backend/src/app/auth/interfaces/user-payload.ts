export interface UserPayload {
  sub: string;
  email: string;
  permissions: string[];
  iat?: number;
  exp?: number;
}
