import { Course } from "./courses.model";

export interface Lecture {
  id: number;
  title: string;
  videoUrl: string;
  courseId?: number;
  course?: Course;
}