import { Component, OnInit } from '@angular/core';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { EnrollmentService } from '../../../../core/services/enrollment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../../shared/models/courses.model';
import { User } from '../../../../shared/models/user.model';
import { CourseService } from '../../../../core/services/course.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Role } from '../../../../shared/models/role.model';

@Component({
  selector: 'admin-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.component.html'
})
export class AdminEnrollmentComponent implements OnInit {

  enrollments: Enrollment[] = [];
  enrollment = {
    id: 0,
    studentId: 0,
    courseId: 0,
  };
  selectedStudentId = 0;
selectedCourseId = 0;
selectedDepartment = '';

courses: Course[] = [];
  user: User[] = [];
filteredUsers: User[] = [];
filteredCourses: Course[] = [];
uniqueDepartments: string[] = [];
  constructor(private enrollmentService: EnrollmentService,
     private courseService: CourseService, private authService: AuthService) {}

  ngOnInit(): void {
    
    this.loadEnrollments();
    this.loadCourses();
    this.loadUsers();
  }
 loadCourses() {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = data;
      this.filteredCourses = this.courses;
    });
  }
  loadUsers() {
    
    this.authService.getAllUsers().subscribe((data: any) => {
       // Extract ALL unique departments from the raw database response first
    const allDepartments = data.map((u: any) => u.department_Name).filter(Boolean);
    this.uniqueDepartments = [...new Set(allDepartments)].sort() as string[];

      this.user = data.filter((u: User) => u.roleId === 3);
       this.filteredUsers = this.user; 
     
        //   this.uniqueSections = [...new Set(this.filteredUsers.map(d => d.section))].sort();
    });
  }
  loadEnrollments() {
    this.enrollmentService.getAll().subscribe(data => {
      this.enrollments = data;
    });
  }
//  enrollStudent() {
//     this.enrollmentService.enroll(this.enrollment).subscribe(() => {
//       this.loadEnrollments();
//     });
//   }

filterStudents() {
  this.filteredUsers = this.user.filter((u: User) =>
    (!this.selectedDepartment || u.department_Name === this.selectedDepartment));
  this.filteredCourses = this.courses.filter((c: Course) =>
    (!this.selectedDepartment || c.teacher?.department_Name === this.selectedDepartment));
}


enrollStudent() {
  const payload = {
    studentId: Number(this.selectedStudentId),
    courseId: Number(this.selectedCourseId)
  };

  this.enrollmentService.enroll(payload).subscribe(() => {
    this.loadEnrollments();
    this.selectedStudentId = 0;
    this.selectedCourseId = 0;
  });
}


  removeEnrollment(enrollmentId: number) {
     if (confirm('Are you sure you want to delete this enrollment?')) {
    this.enrollmentService.remove(enrollmentId).subscribe({
      next: () => {
        this.loadEnrollments();
      },
      error: (err) => {
        console.error('Error removing enrollment:', err);
      }
    })

    };
  }


}

// addEnrollment() {
  //   this.enrollmentService.enroll(this.enrollment).subscribe({
  //     next: () => {
  //       this.loadEnrollments();
  //       this.enrollment = { id: 0, studentId: 0, courseId: 0 }; // Reset form
  //     },
  //     error: (err) => {
  //       console.error('Error enrolling student:', err);
  //     }
  //   });
  // }

  // enrollStudent() {
  //   const newEnrollment: Enrollment = {
  //     id: 0, // ID will be set by the backend
  //     studentId: this.selectedStudentId,
  //     courseId: this.selectedCourseId
  //   };
  //   console.log('Sending enrollment:', newEnrollment); 
    
  //   this.enrollmentService.enroll(newEnrollment).subscribe({
  //     next: () => {
  //       this.loadEnrollments();
  //       this.selectedStudentId = 0;
  //       this.selectedCourseId = 0;
  //     },
  //     error: (err) => {
  //       console.error('Error enrolling student:', err);
  //     }
  //   });
  // }




//////////////////////



// export class AdminEnrollmentComponent implements OnInit {

//   enrollments: Enrollment[] = [];
//   courses: Course[] = [];
//   user: User[] = [];
//   selectedStudentId = 0;
//   selectedCourseId = 0;

//   constructor(
//     private enrollmentService: EnrollmentService,
//     private courseService: CourseService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.loadEnrollments();
//     this.loadCourses();
//     this.loadUsers();
//   }

//   loadCourses() {
//     this.courseService.getCourses().subscribe((data: any) => {
//       this.courses = data;
//     });
//   }

//   loadUsers() {
//     this.authService.getAllUsers().subscribe((data: any) => {
//       this.user = data.filter((u: User) => u.roleId === 3);
//     });
//   }

//   loadEnrollments() {
//     this.enrollmentService.getAll().subscribe(data => {
//       this.enrollments = data;
//     });
//   }

//   // ✅ helper to get student name from id
//   getStudentName(studentId: number): string {
//     const student = this.user.find(u => u.id === studentId);
//     return student ? student.fullName : 'Unknown';
//   }

//   // ✅ helper to get course name from id
//   getCourseName(courseId: number): string {
//     const course = this.courses.find(c => c.id === courseId);
//     return course ? course.title : 'Unknown';
//   }

//   enrollStudent() {
//     if (!this.selectedStudentId || !this.selectedCourseId) {
//       alert('Please select both student and course');
//       return;
//     }

//     const newEnrollment: Enrollment = {
//       id: 0,
//       studentId: this.selectedStudentId,
//       courseId: this.selectedCourseId
//     };

//     this.enrollmentService.enroll(newEnrollment).subscribe({
//       next: (created: any) => {
//         this.enrollments = [...this.enrollments, created]; // ✅ instant
//         this.selectedStudentId = 0;
//         this.selectedCourseId = 0;
//       },
//       error: (err) => console.error('Error enrolling student:', err)
//     });
//   }

//   removeEnrollment(enrollmentId: number) {
//     if (confirm('Are you sure?')) {
//       this.enrollmentService.remove(enrollmentId).subscribe({
//         next: () => {
//           this.enrollments = this.enrollments.filter(e => e.id !== enrollmentId); // ✅ instant
//         },
//         error: (err) => console.error('Error removing enrollment:', err)
//       });
//     }
//   }
// }
