import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Course } from '../../shared/models/courses.model';
import { ApodResponse } from '../../shared/models/ApodResponse.model';
import { Assignment } from '../../shared/models/assignment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssignmentService {

  private apiUrl = `${environment.apiUrl}/assignment`;

  constructor(private http: HttpClient) {}

  // getAssignment() {
  //   return this.http.get<[Assignment]>(this.apiUrl);
  // }
  getAssignment(teacherId: number): Observable<Assignment[]> {
  return this.http.get<Assignment[]>(`${this.apiUrl}?teacherId=${teacherId}`);
}
 getByStudent(teacherId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}/student/${teacherId}`);
  }

  createAssignment(assignment: Assignment) {
    return this.http.post(this.apiUrl, assignment);
  }

  updateAssignment(assignment: Assignment) {
    return this.http.put(`${this.apiUrl}/${assignment.id}`, assignment);
  }
 
  deleteAssignment(assignmentId: number) {
    return this.http.delete(`${this.apiUrl}/${assignmentId}`);
  }
}