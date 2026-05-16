import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Lecture } from '../../../../shared/models/lecture.model';
import { LectureService } from '../../../../core/services/lecture.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Course } from '../../../../shared/models/courses.model';
import { CourseService } from '../../../../core/services/course.service';
@Component({
   selector: 'teachers-lecture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lecture.component.html',
})
export class TeachersLectureComponent implements OnInit {
  Lecture: Lecture[] = [];

  formLecture = {
    id: 0,
    title: '',
    videoUrl: '',
   // courseId: 0,
  };
 selectedCourseId = 0;
 course: Course[] = [];
  isEditMode = false;
  constructor(
    private LectureService: LectureService,
    private authService: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadLecture();
    this.loadCourse();
  }

  loadCourse(){
     const teacher = this.authService.getStoredUser(); 
    if (!teacher) return;

    this.courseService.getCoursesByTeacher(teacher.id).subscribe({
      next: (data) => {
        this.course = data; // ← no filter needed, backend already filtered
      },
      error: (err) => {
        console.error('Error loading courses:', err);
      }
    });
    // this.courseService.getCourses().subscribe((data:any) => {
    //    this.course = data.filter((u: Course) => u.id === 2); 
    // })
  }
  loadLecture() {
    const teacher = this.authService.getStoredUser();
  if (!teacher) return;

    this.LectureService.getLecture(teacher.id).subscribe(data => {
      this.Lecture = data;
    });
  }

  saveLecture() {
    if (!this.formLecture.title || !this.formLecture.videoUrl) {
      alert('Please fill in all fields');
      return;
    }

    if (this.isEditMode) {
       const payload = {
      ...this.formLecture,
      courseId: Number(this.selectedCourseId)  // ← add this
    };
      this.LectureService.updateLecture(payload as any).subscribe(() => {
        this.loadLecture();
        this.isEditMode = false;
        this.resetForm();
      });
    } else {
      const payload = {
        title: this.formLecture.title,
        videoUrl: this.formLecture.videoUrl,
         courseId: Number(this.selectedCourseId)      // ← included
      };
      this.LectureService.createLecture(payload as unknown as Lecture).subscribe(() => {
        this.loadLecture();
        this.resetForm();
      }); 
    }
  }
 
  resetForm() {
    this.formLecture = {
      id: 0,
      title: '',
      videoUrl: '',
      
     // courseId: 0
    };
     this.selectedCourseId = 0; 
    this.isEditMode = false;
  } 

  editLecture(Lecture: Lecture) {
    this.formLecture = { ...Lecture };  // ← spread Lecture not self
     this.selectedCourseId = Lecture.courseId ?? 0;
    this.isEditMode = true;
  } 

  deleteLecture(id: number) {
    if (confirm('Are you sure you want to delete this Lecture?')) {
      this.LectureService.deleteLecture(id).subscribe(() => {
        this.loadLecture();
      });
    }
  }

}