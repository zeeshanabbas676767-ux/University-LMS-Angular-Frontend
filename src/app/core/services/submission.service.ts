import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private apiUrl = `${environment.apiUrl}/assignmentsubmission`;

  constructor(private http: HttpClient) {}

  // Submit assignment with file
  submit(assignmentId: number, studentId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('assignmentId', assignmentId.toString());
    formData.append('studentId', studentId.toString());
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/submit`, formData);
  }

  // Get student's submissions
  getByStudent(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${studentId}`);
  }

  // Teacher: get submissions for an assignment
  getByAssignment(assignmentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/assignment/${assignmentId}`);
  }
}