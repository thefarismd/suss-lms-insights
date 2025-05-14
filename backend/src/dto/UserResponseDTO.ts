export interface UserResponseDTO {
  user_id: number;
  user_name: string;
  user_created_at: string; // ISO string
  user_deleted_at: string | null;
  user_state: string;
}
