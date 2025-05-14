export interface Login {
  user_id: number; // Used to login
  user_login_id: string; 
  user_password: string; // Hashed password
  user_role: 'admin' | 'instructor'; // Role-based access
}
