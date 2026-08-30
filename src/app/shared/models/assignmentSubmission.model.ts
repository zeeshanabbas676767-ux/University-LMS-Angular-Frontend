import { Assignment } from "./assignment.model";
import { User } from "./user.model";

export interface AssignmentSubmission {
   id: number;
  assignmentTitle: string;
  assignment?: Assignment;
  courseName: string;
  fileName: string;
  submittedAt: Date;
  score: string | null; // Double? maps to number | null in TS
  teacherFeedback: string | null;
  
  // assignmentId: number;
   studentId: number;
   student?: User;
  // submissionDate: Date;
  // submissionUrl: string;
   feedback?: string;
  
} 