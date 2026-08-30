import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentSubmission } from '../../shared/models/assignmentSubmission.model';
import { GradeSubmissionDto } from '../../shared/models/gradeSubmission.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
 private apiUrl = `${environment.apiUrl}/AssignmentSubmission`;
 
  constructor(private http: HttpClient) {}

  // Get submissions for a specific assignment so the teacher can view them
  getSubmissionsByAssignment(assignmentId: number): Observable<AssignmentSubmission[]> {
    return this.http.get<AssignmentSubmission[]>(`${this.apiUrl}/assignment/${assignmentId}`, { withCredentials: true });
  }
getSubmissionsByStudent(studentId: number): Observable<AssignmentSubmission[]> {
    return this.http.get<AssignmentSubmission[]>(`${this.apiUrl}/student/${studentId}`, { withCredentials: true });
  }
  // Your specific PUT endpoint to save the grade
  submitGrade(id: number, gradeDto: GradeSubmissionDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/grade`, gradeDto);
  }
}