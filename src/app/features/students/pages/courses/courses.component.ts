import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { CourseService } from '../../../../core/services/course.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { Course } from '../../../../shared/models/courses.model';

@Component({
  selector: 'student-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
})
export class StudentCoursesComponent implements OnInit {
  enrolledCourses: Enrollment[] = [];
  allCourses: Course[] = [];
  studentId = 0;

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const student = this.authService.getStoredUser();
    if (!student) return;
    this.studentId = student.id;
    this.loadEnrolled();
    this.loadAllCourses();
  }

  loadEnrolled() {
    this.enrollmentService.getByStudent(this.studentId).subscribe(data => {
      this.enrolledCourses = data;
    });
  }

  loadAllCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.allCourses = data;
    });
  }
 
  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.some(e => e.courseId === courseId);
  }

  enroll(courseId: number) {
    this.enrollmentService.enroll({ studentId: this.studentId, courseId }).subscribe(() => {
      this.loadEnrolled();
    });
  }
}