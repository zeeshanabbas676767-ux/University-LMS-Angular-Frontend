export interface GradeSubmissionDto {
  score: string;       // e.g., "A", "95", etc.
  teacherFeedback?: string;   // Optional teacher comments
}