import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { SubmissionService } from '../../../../core/services/submission.service';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Assignment } from '../../../../shared/models/assignment.model';

@Component({
  selector: 'student-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignment.component.html',
})
export class StudentAssignmentComponent implements OnInit {
  allAssignments: Assignment[] = [];       // ← all assignments unfiltered
  assignments: Assignment[] = [];          // ← filtered by course dropdown
  enrolledCourses: any[] = [];             // ← for course filter dropdown
  selectedCourseId: number | string = '';  // ← course filter

  // Submission form
  submittableAssignments: Assignment[] = []; // ← assignments not yet submitted
  selectedAssignmentId: number | string = '';
  selectedFile: File | null = null;
  submitMessage = '';
  submitError = '';
  isSubmitting = false;

  submittedIds: Set<number> = new Set();   // ← track submitted assignment ids
  studentId = 0;

  constructor(
    private assignmentService: AssignmentService,
    private submissionService: SubmissionService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const student = this.authService.getStoredUser();
    if (!student) return;
    this.studentId = student.id;

    // Load assignments
    this.assignmentService.getByStudent(student.id).subscribe(data => {
      this.allAssignments = data;
      this.assignments = data;
      this.updateSubmittable();
    });

    // Load enrolled courses for filter dropdown
    this.enrollmentService.getByStudent(student.id).subscribe(data => {
      this.enrolledCourses = data
        .map((e: any) => e.course)
        .filter((c: any) => c != null);
    });

    // Load already submitted assignments
    this.submissionService.getByStudent(student.id).subscribe(data => {
      data.forEach((s: any) => this.submittedIds.add(s.assignmentId));
      this.updateSubmittable();
    });
  }

  // ← Filter table by course
  onCourseChange() {
    if (!this.selectedCourseId || this.selectedCourseId === '') {
      this.assignments = this.allAssignments;
    } else {
      this.assignments = this.allAssignments.filter(
        a => a.courseId === Number(this.selectedCourseId)
      );
    }
  }

  // ← Only show unsubmitted assignments in submit dropdown
  updateSubmittable() {
     const now = new Date();
  this.submittableAssignments = this.allAssignments.filter(a =>
    !this.submittedIds.has(a.id) &&        // ← not already submitted
    new Date(a.deadline) > now             // ← deadline not passed
  );
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  submitAssignment() {
    if (!this.selectedAssignmentId || !this.selectedFile) {
      this.submitError = 'Please select an assignment and a file.';
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.submitMessage = '';

    this.submissionService.submit(
      Number(this.selectedAssignmentId),
      this.studentId,
      this.selectedFile
    ).subscribe({
      next: () => {
        this.submittedIds = new Set([
          ...this.submittedIds,
          Number(this.selectedAssignmentId)
        ]);
        this.updateSubmittable();
        this.submitMessage = 'Assignment submitted successfully!';
        this.selectedAssignmentId = '';
        this.selectedFile = null;
        this.isSubmitting = false;
        // Reset file input
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err) => {
        this.submitError = err.error || 'Submission failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  isSubmitted(assignmentId: number): boolean {
    return this.submittedIds.has(assignmentId);
  }

  isOverdue(deadline: string): boolean {
    return new Date(deadline) < new Date();
  }
}