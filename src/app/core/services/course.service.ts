import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Course } from '../../shared/models/courses.model';
import { ApodResponse } from '../../shared/models/ApodResponse.model';

@Injectable({ providedIn: 'root' })
export class CourseService {

  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<Course[]>(this.apiUrl);
  }

  createCourse(course: Course) {
    return this.http.post(this.apiUrl, course);
  }
  getCoursesByTeacher(teacherId: number) {
  return this.http.get<Course[]>(`${this.apiUrl}/${teacherId}/teacher`);
}
  getCourseLectures(courseId: number) {
    return this.http.get(`${this.apiUrl}/${courseId}/lectures`);
  }
  updateCourse(course: Course) {
    return this.http.put(`${this.apiUrl}/${course.id}`, course);
  }
  deleteCourse(courseId: number) {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }
}