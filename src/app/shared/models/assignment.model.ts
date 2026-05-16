import { Course } from "./courses.model";

export interface Assignment {
  id: number;
  title: string;
  description: string;
  deadline: string;
  totalMarks: number;
  courseId: number;
  course?: Course

}