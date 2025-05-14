export type LoginRequest = {
  user_id: number;
  password: string;
};

export type LoginResponse = {
  user_id: number;
  user_login_id: string;
  user_role: 'admin' | 'instructor';
};