import { User } from './user.model';
import { Lecture } from './lecture.model';
import { Enrollment } from './enrollment.model';

export interface Course {
  id: number;
  title: string;
  description: string;

  teacherId: number;
  teacher?: User;

  lectures?: Lecture[];
  enrollments?: Enrollment[];
}