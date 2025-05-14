import api from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "@/types/api";

export const AuthService = {
  async login({ user_id, password }: LoginRequest): Promise<LoginResponse> {
    
    const response = await api.post<LoginResponse>('/api/v1/auth/login', { user_id, password,});

    const data = response.data;

    // Exceptional is this case
    localStorage.setItem('user_role', data.user_role);
    localStorage.setItem('user_login_id', data.user_login_id);

    return data;
  },

  logout() {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_login_id');
  },

  getRole(): 'admin' | 'instructor' | null {
    return localStorage.getItem('user_role') as 'admin' | 'instructor' | null;
  },

  getLoginId(): string | null {
    return localStorage.getItem('user_login_id');
  },
};
