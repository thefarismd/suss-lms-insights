export interface Course {
  course_id: number;
  semester: string;
  course_code: string;
  course_name: string;
  course_created_at: number; // Excel serial - might need to convert in repo
}
