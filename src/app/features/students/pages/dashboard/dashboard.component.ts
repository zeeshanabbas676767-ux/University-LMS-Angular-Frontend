import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { LectureService } from '../../../../core/services/lecture.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class StudentDashboardComponent implements OnInit {
  studentName = '';
  totalEnrolled = 0;
  totalAssignments = 0;
  totalLectures = 0;
  activeAssignments = 0;
  overdueAssignments = 0;

  constructor(
    private enrollmentService: EnrollmentService,
    private assignmentService: AssignmentService,
    private lectureService: LectureService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const student = this.authService.getStoredUser();
    if (!student) return;

    this.studentName = student.fullName;

    // Total Enrolled Courses
    this.enrollmentService.getByStudent(student.id).subscribe(data => {
      this.totalEnrolled = data.length;
    });

    // Total Assignments + Active/Overdue counts
    this.assignmentService.getByStudent(student.id).subscribe(data => {
      this.totalAssignments = data.length;
      this.activeAssignments  = data.filter(a => new Date(a.deadline) >= new Date()).length;
      this.overdueAssignments = data.filter(a => new Date(a.deadline) <  new Date()).length;
    });

    // Total Lectures
    this.lectureService.getByStudent(student.id).subscribe(data => {
      this.totalLectures = data.length;
    });
  }
}