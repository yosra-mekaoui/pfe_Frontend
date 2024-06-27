export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}
}