import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Lecture } from '../../shared/models/lecture.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LectureService {

  private apiUrl = `${environment.apiUrl}/lectures`;

  constructor(private http: HttpClient) {}

  // getLecture() {
  //    return this.http.get<Lecture[]>(this.apiUrl);
  //  }
 getLecture(teacherId: number): Observable<Lecture[]> {
  return this.http.get<Lecture[]>(`${this.apiUrl}?teacherId=${teacherId}`);
}
   createLecture(course: Lecture) {
     return this.http.post(this.apiUrl, course);
   }

   getLectureById(courseId: number) {
   return this.http.get<Lecture[]>(`${this.apiUrl}/course/${courseId}`);
 }
getByStudent(studentId: number): Observable<Lecture[]> {
  return this.http.get<Lecture[]>(`${this.apiUrl}/student/${studentId}`);
}
   updateLecture(course: Lecture) {
     return this.http.put(`${this.apiUrl}/${course.courseId}`, course);
   }

   deleteLecture(courseId: number) {
     return this.http.delete(`${this.apiUrl}/${courseId}`);
   }
}