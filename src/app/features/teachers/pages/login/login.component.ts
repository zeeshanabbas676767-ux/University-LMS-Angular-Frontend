import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'teachers-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html'
}) 
export class TeachersLoginComponent {
  email = '';
  password = ''
  roleId = 2; // Assuming 2 is the role ID for teachers
  error: string | null = null;
  loading = false;
  constructor(private auth: AuthService, private router: Router) {}
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  login() {
    this.error = null;
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }
    this.loading = true;
  
    this.auth.login({ email: this.email, password: this.password, roleId: this.roleId }).subscribe({
  next: (res: any) => {

    this.loading = false;    
    
    // Access the roleId inside the user object
    const userRole = res.user?.roleId; 

    if (userRole === 2) {
      this.router.navigate(['/teacher/dashboard']);
    }  
    else {
      console.warn('Unknown role or missing user data', res);
      this.router.navigate(['/']);
    }
  },
  error: (err) => {
    this.loading = false;
    this.error = err?.error?.message || err?.message || 'Login failed';
  }
});


  }
}












// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../shared/services/auth.service';
// import { RouterLink } from "@angular/router";

// @Component({
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './login.component.html',
// }) 
// export class LoginComponent {
//   email = '';
//   password = '';
//   error: string | null = null;
//  loading = false;
//   showPassword = false;

//   constructor(private auth: AuthService, private router: Router) {}
//   togglePassword(): void {
//     this.showPassword = !this.showPassword;
//   }
  
//    submit() {
//     this.error = null;
//     if (!this.email || !this.password) {
//       this.error = 'Please provide email and password.';
//       return;
//     }

//     this.loading = true;
//     this.auth.login({ email: this.email, password: this.password }).subscribe({
//       next: () => {
//         this.loading = false;
       
//         this.router.navigate(['/home']);
//       },
//       error: (err) => {
//         this.loading = false;
//         this.error = err?.error?.message || err?.message || 'Login failed';
//         console.error('Login error', err);
//       }
//     });
//   }
  

// }