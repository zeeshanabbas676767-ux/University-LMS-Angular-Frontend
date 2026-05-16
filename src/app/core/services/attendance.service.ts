import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendanceService {

  private apiUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  getStudentAttendance(studentId: number) {
    return this.http.get(`${this.apiUrl}/student/${studentId}`);
  }

  // Called when student clicks video — marks attendance automatically
  markAttendance(studentId: number, lectureId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/mark`, { studentId, lectureId });
  }

  // Student: get own attendance
  getByStudent(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`);
  }

  // Teacher: get summary per lecture
  getByTeacher(teacherId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  // Teacher: get per-student detail for one lecture
  getByLecture(lectureId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lecture/${lectureId}`);
  }
}