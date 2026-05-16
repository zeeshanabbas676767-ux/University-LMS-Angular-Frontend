import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
 import { Course } from '../../../../shared/models/courses.model';
import { CourseService } from '../../../../core/services/course.service';
import { ApodResponse } from '../../../../shared/models/ApodResponse.model';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'admin-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './courses.component.html'
})
export class AdminCoursesComponent implements OnInit {  
  courses: Course[] = [];
  course = {
    id: 0,
    title: '',
    description: '',
    teacherId: 0 ,
    
  };

    selectedTeacherId = 0;
isEditMode = false;
  user: User[] = [];

  constructor(private courseService: CourseService, private authService: AuthService) {}
  ngOnInit() {
   this.loadCourses();
   this.loadUsers();
  }
loadUsers() {
    this.authService.getAllUsers().subscribe((data: any) => {
      this.user = data.filter((u: User) => u.roleId === 2); 
    });
  }
  
  loadCourses() {
    this.courseService.getCourses().subscribe((data: Object) => {
      this.courses = data as Course[];
    });
  }

  
  createCourse() {
    this.courseService.createCourse(this.course).subscribe(() => {
      this.loadCourses(); // Refresh the course list after creation
    }
    );  
  }
  getCourseById(id: number) {
    this.courseService.getCourseLectures(id).subscribe((data: Object) => {
      this.course = data as Course;
    });
  
  }

  saveCourse() {
    if(!this.course.title || !this.course.description || !this.selectedTeacherId) {
      alert('Please fill in all fields');
      return;
    }
    this.course.teacherId = Number(this.selectedTeacherId);

    if (this.isEditMode) {
      this.courseService.updateCourse(this.course).subscribe(() => {
        this.loadCourses();
        this.isEditMode = false;
         this.resetForm();
      }
      );
    }
      else {
    const payload = {
      title: this.course.title,
      description: this.course.description,
      teacherId: Number(this.selectedTeacherId) // ← no id, no teacher object
    };
    this.courseService.createCourse(payload as Course).subscribe(() => {
      this.loadCourses();
      this.resetForm();
    });
  }

  }

  resetForm() {
  this.course = { id: 0, title: '', description: '', teacherId: 0 };
  this.selectedTeacherId = 0;
  this.isEditMode = false;
}

  editCourse(course: Course) {
  this.course = { ...course };
  this.selectedTeacherId = course.teacherId; // ← sync dropdown
  this.isEditMode = true;
}

  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.loadCourses();
      });
    }
  }
  
}
