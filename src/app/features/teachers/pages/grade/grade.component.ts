import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GradeService } from '../../../../core/services/grade.service';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { AuthService } from '../../../../core/services/auth.service';
import { AssignmentSubmission } from '../../../../shared/models/assignmentSubmission.model';
import { GradeSubmissionDto } from '../../../../shared/models/gradeSubmission.model';
import { Assignment } from '../../../../shared/models/assignment.model';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-grading',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grade.component.html'
})
export class GradingComponent implements OnInit {
  assignmentId: number | null = null;
  assignments: Assignment[] = [];
  submissions: AssignmentSubmission[] = [];
  selectedSubmission: AssignmentSubmission | null = null;

  // Form properties
  gradeValue: string = '';
  feedbackValue: string = '';
  
  private currentTeacherId: number | null = null;
 
  constructor(
    private gradeService: GradeService,
    private assignmentService: AssignmentService,
  ) {}

  ngOnInit(): void {
    this.loadTeacherAssignments();
  }

  private loadTeacherAssignments(): void {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const currentUser: User = JSON.parse(user);
        this.currentTeacherId = currentUser.id;
        
        this.assignmentService.getAssignment(this.currentTeacherId).subscribe({
          next: (data) => this.assignments = data,
          error: (err) => console.error('Failed to load assignments', err)
        });
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }

  onAssignmentSelected(): void {
    if (this.assignmentId) {
      this.loadSubmissions();
    }
  }

  loadSubmissions(): void {
    if (!this.assignmentId) return;
    
    this.gradeService.getSubmissionsByAssignment(this.assignmentId).subscribe({
      next: (data) => this.submissions = data,
      error: (err) => console.error('Failed to load submissions', err)
    });
  }

  selectSubmission(submission: AssignmentSubmission): void {
    this.selectedSubmission = submission;
    this.gradeValue = submission.score || '';
    this.feedbackValue = submission.teacherFeedback || '';
  }

  onSaveGrade(): void {
    if (!this.selectedSubmission) return;

    const gradeDto: GradeSubmissionDto = {
      score: this.gradeValue,
      teacherFeedback: this.feedbackValue
    };

    this.gradeService.submitGrade(this.selectedSubmission.id, gradeDto).subscribe({
      next: () => {
        alert('Grade saved successfully!');
        this.loadSubmissions(); // Refresh the list
        this.selectedSubmission = null; // Close grading panel
      },
      error: (err) => console.error('Error updating grade', err)
    });
  }
}