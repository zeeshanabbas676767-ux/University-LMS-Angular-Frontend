import { User } from './user.model';
import { Lecture } from './lecture.model';

export interface VideoProgress {
  id: number;

  studentId: number;
  lectureId: number;

  progressPercentage: number;

  // Optional navigation (if backend sends them)
  student?: User;
  lecture?: Lecture;
}