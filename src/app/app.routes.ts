import { Routes } from '@angular/router';
// Admin 
import { AdminLoginComponent } from './features/admin/pages/login/login.component';
import { AdminRegisterComponent } from './features/admin/pages/register/register.component';
import { AdminCoursesComponent } from './features/admin/pages/courses/courses.component';
import { AdminDashboardComponent } from './features/admin/pages/dashboard/dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminEnrollmentComponent } from './features/admin/pages/enrollment/enrollment.component';
import { AdminReportsComponent } from './features/admin/pages/reports/reports.component';
import { AdminSystemSettingsComponent } from './features/admin/pages/system-settings/system.component';
import { AdminUserComponent } from './features/admin/pages/user/user.component';
 
// Students
import { StudentsLoginComponent } from './features/students/pages/login/login.component';
// import { StudentsRegisterComponent } from './features/students/pages/register/register.component';
import { StudentLayoutComponent } from './layouts/students-layout/students-layout.component';
import{ StudentAssignmentComponent} from './features/students/pages/assignment/assignment.component';
import { StudentDashboardComponent } from './features/students/pages/dashboard/dashboard.component';
import { StudentCoursesComponent } from './features/students/pages/courses/courses.component';
import { StudentAttendanceComponent } from './features/students/pages/attendance/attendance.component';
import { StudentLectureComponent } from './features/students/pages/lecture/lecture.component';
import { StudentsProgressComponent } from './features/students/pages/progress/progress.component';

// Teachers
import { TeachersLoginComponent } from './features/teachers/pages/login/login.component';
// import { TeachersRegisterComponent } from './features/teachers/pages/register/register.component';
import { TeacherLayoutComponent } from './layouts/teachers-layout/teachers-layout.component';
import { TeachersDashboardComponent } from './features/teachers/pages/dashboard/dashboard.component';
import { TeachersCoursesComponent } from './features/teachers/pages/courses/courses.component';
import { TeachersAttendanceComponent } from './features/teachers/pages/attendance/attendance.component';
import { TeachersLectureComponent } from './features/teachers/pages/lecture/lecture.component';
import { TeachersProgressComponent } from './features/teachers/pages/progress/progress.component';
import { AuthGuard } from './core/guards/auth.guard';
import { TeachersAssignmentComponent } from './features/teachers/pages/assignment/assigment.component';
import { StudentsRegisterComponent } from './features/students/pages/register/register.component';
import { TeachersRegisterComponent } from './features/teachers/pages/register/register.component';
export const routes: Routes = [
  {path: '', redirectTo: 'admin/login', pathMatch: 'full'},
  // Student Routes
  {
  path: 'student',
  component: StudentLayoutComponent,
  children: [
    { path: 'dashboard', component: StudentDashboardComponent },
    { path: 'courses', component: StudentCoursesComponent },
    { path: 'attendance', component: StudentAttendanceComponent },
     { path: 'assignment', component: StudentAssignmentComponent },
    { path: 'lecture', component: StudentLectureComponent },
    { path: 'progress', component: StudentsProgressComponent },
    {path: 'login', component: StudentsLoginComponent},
     {path: 'register', component: StudentsRegisterComponent}
  ]
},
// Teacher Routes
{
  path: 'teacher',
  component: TeacherLayoutComponent,
  children: [
    { path: 'dashboard', component: TeachersDashboardComponent },
    { path: 'courses', component: TeachersCoursesComponent },
     { path: 'assignment', component: TeachersAssignmentComponent },
    { path: 'attendance', component: TeachersAttendanceComponent },
    { path: 'lectures', component: TeachersLectureComponent },
    { path: 'progress', component: TeachersProgressComponent },
    {path: 'login', component: TeachersLoginComponent},
     {path: 'register', component: TeachersRegisterComponent}
  ]
},
// Admin Routes

 {path: 'admin/login', component: AdminLoginComponent},
    {path: 'admin/register', component: AdminRegisterComponent},
    
{
  path: 'admin', 
  component: AdminLayoutComponent,
   canActivate: [AuthGuard],
  children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // ✅ add this
    { path: 'dashboard', component: AdminDashboardComponent },
    {path: 'courses', component: AdminCoursesComponent },
    {path: 'enrollment', component: AdminEnrollmentComponent},
    {path: 'reports', component: AdminReportsComponent},
    {path: 'system-settings', component: AdminSystemSettingsComponent},
    {path: 'users', component: AdminUserComponent},
   
  ]
}
];