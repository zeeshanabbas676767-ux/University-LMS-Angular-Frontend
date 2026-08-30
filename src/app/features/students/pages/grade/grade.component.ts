import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeService } from '../../../../core/services/grade.service';
import { AssignmentSubmission } from '../../../../shared/models/assignmentSubmission.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-student-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grade.component.html' 
})
export class StudentGradesComponent implements OnInit {
  // In a real app, get this from your Auth Service after login
  currentStudentId!: number;
  
  submissions: AssignmentSubmission[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private gradeService: GradeService, private authService: AuthService) {}

  ngOnInit(): void {
    // 4. Get the ID dynamically before making the API call
    this.currentStudentId = this.authService.getCurrentUserId();

    if (this.currentStudentId && this.currentStudentId !== 0) {
      this.loadMyGrades();
    } else {
      this.errorMessage = 'User session not found. Please log in again.';
      this.isLoading = false;
    }

    this.loadMyGrades();
  }

  loadMyGrades(): void {
    this.gradeService.getSubmissionsByStudent(this.currentStudentId).subscribe({
      next: (data) => {
        // Map the backend data directly from GET /api/AssignmentSubmission/student/{studentId}
        this.submissions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching student grades:', err);
        this.errorMessage = 'Could not load your grades. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}