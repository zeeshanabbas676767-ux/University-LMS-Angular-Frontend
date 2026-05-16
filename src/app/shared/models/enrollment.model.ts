import { Course } from "./courses.model";
import { User } from "./user.model";

export interface Enrollment {
  id: number;

  studentId: number;
  courseId: number; 

    student?: User;
    course?: Course;
}