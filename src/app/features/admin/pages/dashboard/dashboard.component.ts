import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { User } from '../../../../shared/models/user.model';
import { Course } from '../../../../shared/models/courses.model';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { CourseService } from '../../../../core/services/course.service';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
   selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})  
export class AdminDashboardComponent {
user: User[] = []

  course: Course[] = []
  enrollment: Enrollment[] = []
  isLoading = false;
  errorMessage = '';

constructor(
    private courses: CourseService,
    private enroll: EnrollmentService,
    private authService: AuthService  // ← add this
  ) {}

  ngOnInit(): void {
    this.loadCourse();
    this.loadEnrollment();
    this.loadUsers();  // ← add this
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        this.user = data;
      }
    });
  }

  loadEnrollment(): void {
    this.enroll.getAll().subscribe({
      next: (data) => {
        this.enrollment = data;
      }
    });
  }

  loadCourse(): void {
    this.courses.getCourses().subscribe({
      next: (data) => {
        this.course = data as Course[];
      }
    });
  }

  // Getters for counts by role
  get totalDepartments(): number {
    return this.user.filter(u => u.department_Name).length;
  }
  get totalStudents(): number {
    return this.user.filter(u => u.roleId === 3).length;
  }

  get totalTeachers(): number {
    return this.user.filter(u => u.roleId === 2).length;
  }

  get totalCourse(): number {
    return this.course.length;
  }

  get totalEnrollment(): number {
    return this.enrollment.length;
  }
  
}
