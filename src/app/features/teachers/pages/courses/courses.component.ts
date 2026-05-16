import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Course } from '../../../../shared/models/courses.model';
import { CourseService } from '../../../../core/services/course.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../shared/models/user.model';

@Component({
   selector: 'teachers-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
})
export class TeachersCoursesComponent {
 courses: Course[] = [];
  teacherName: string = ''; 
 isEditMode = false;

  constructor(private courseService: CourseService, private authService: AuthService) {}
  ngOnInit() {
    const teacher = this.authService.getStoredUser();
    this.teacherName = teacher?.fullName ?? 'Teacher';  
   this.loadCourses();
  }

  loadCourses() {
    const teacher = this.authService.getStoredUser(); 
    if (!teacher) return;

    this.courseService.getCoursesByTeacher(teacher.id).subscribe({
      next: (data) => {
        this.courses = data; // ← no filter needed, backend already filtered
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
  }
 

}