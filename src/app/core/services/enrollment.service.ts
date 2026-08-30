import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Enrollment } from '../../shared/models/enrollment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {

  private apiUrl = `${environment.apiUrl}/enrollment`;
 
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }
 
    getByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/student/${studentId}`);
  }
  
enroll(data: { studentId: number; courseId: number }): Observable<Enrollment> {
  return this.http.post<Enrollment>(this.apiUrl, data);
}

  // enroll(data: Enrollment) {
  //   return this.http.post(this.apiUrl, data);
  // }
  remove(enrollmentId: number) {
    return this.http.delete(`${this.apiUrl}/${enrollmentId}`);
  }
}