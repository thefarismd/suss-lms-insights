
export interface LoginResponseDTO {
  user_id: number;
  user_login_id: string;
  user_role: 'admin' | 'instructor';
}
