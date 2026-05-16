import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../../shared/models/courses.model';
import { AuthService } from '../../../../core/services/auth.service';
import { Assignment } from '../../../../shared/models/assignment.model';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { CourseService } from '../../../../core/services/course.service';  // ← add

@Component({
  selector: 'teachers-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignment.component.html',
})
export class TeachersAssignmentComponent implements OnInit {
  assignment: Assignment[] = [];
  courses: Course[] = [];           // ← add
  selectedCourseId = 0;             // ← add

  formAssignment = {
    id: 0,
    title: '',
    description: '',
    deadline: '',
    totalMarks: 0,
  };

  isEditMode = false;

  constructor(
    private assignmentService: AssignmentService,
    private authService: AuthService,
    private courseService: CourseService   // ← add
  ) {}

  ngOnInit() {
    this.loadAssignment();
    this.loadCourses();              // ← add
  }

  // ← add entire method
  loadCourses() {
    const teacher = this.authService.getStoredUser();
    if (!teacher) return;
    this.courseService.getCoursesByTeacher(teacher.id).subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error('Error loading courses:', err)
    });
  }

  loadAssignment() {
    const teacher = this.authService.getStoredUser();
  if (!teacher) return;

    this.assignmentService.getAssignment(teacher.id).subscribe(data => {
      this.assignment = data;
    });
  }

  saveCourse() {
    if (!this.formAssignment.title || !this.formAssignment.description ||
        !this.formAssignment.deadline || !this.formAssignment.totalMarks ||
        !this.selectedCourseId) {       // ← check selectedCourseId
      alert('Please fill in all fields');
      return;
    }

    if (this.isEditMode) {
      const payload = {
        ...this.formAssignment,
        courseId: Number(this.selectedCourseId)   // ← use selectedCourseId
      };
      this.assignmentService.updateAssignment(payload as any).subscribe(() => {
        this.loadAssignment();
        this.isEditMode = false;
        this.resetForm();
      });
    } else {
      const payload = {
        title: this.formAssignment.title,
        description: this.formAssignment.description,
        deadline: this.formAssignment.deadline,
        totalMarks: Number(this.formAssignment.totalMarks),
        courseId: Number(this.selectedCourseId)   // ← use selectedCourseId
      };
      this.assignmentService.createAssignment(payload as Assignment).subscribe(() => {
        this.loadAssignment();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.formAssignment = {
      id: 0,
      title: '',
      description: '',
      deadline: '',
      totalMarks: 0,
    };
    this.selectedCourseId = 0;    // ← reset dropdown
    this.isEditMode = false;
  }

  editAssignment(assignment: Assignment) {
    this.formAssignment = { ...assignment } as any;
    this.selectedCourseId = assignment.courseId ?? 0;   // ← populate dropdown
    this.isEditMode = true;
  }

  deleteAssignment(id: number) {
    if (confirm('Are you sure you want to delete this assignment?')) {
      this.assignmentService.deleteAssignment(id).subscribe(() => {
        this.loadAssignment();
      });
    }
  }
}