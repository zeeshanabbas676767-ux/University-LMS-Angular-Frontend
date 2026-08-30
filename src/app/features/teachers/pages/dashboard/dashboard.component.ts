import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../core/services/course.service';
import { AssignmentService } from '../../../../core/services/assignment.service';
import { LectureService } from '../../../../core/services/lecture.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'teachers-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class TeachersDashboardComponent implements OnInit {
  totalCourses = 0;
  totalAssignments = 0;
  totalLectures = 0;
  teacherName = '';
  teacherDepartment = '';

  constructor(
    private courseService: CourseService,
    private assignmentService: AssignmentService,
    private lectureService: LectureService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const teacher = this.authService.getStoredUser();
    if (!teacher) return;

    this.teacherName = teacher.fullName;
    this.teacherDepartment = teacher.department_Name;

    // Total Courses
    this.courseService.getCoursesByTeacher(teacher.id).subscribe(data => {
      this.totalCourses = data.length;
    });

    // Total Assignments
    this.assignmentService.getAssignment(teacher.id).subscribe(data => {
      this.totalAssignments = data.length;
    });

    // Total Lectures
    this.lectureService.getLecture(teacher.id).subscribe(data => {
      this.totalLectures = data.length;
    });
  }
}