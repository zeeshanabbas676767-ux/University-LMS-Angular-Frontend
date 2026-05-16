import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: 'students-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class StudentsRegisterComponent {
  fullName = '';
  email = ''
  password = ''
  roleId = 3;
  error: string | null = null
  loading = false;
   confirmPassword = '';
     showPassword = false;
  showConfirmPassword = false;
  constructor(private auth: AuthService, private router: Router) {}

     togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

 register() {
  
  if(!this.fullName || !this.email || !this.password) {
    this.error = 'Please fill in all fields.';
    return;
  }
  if(this.password !== this.confirmPassword) {
  this.error = 'Passwords do not match.';
  return;
  }
  this.loading = true;
this.error = null;
  this.auth.register({
    fullName: this.fullName,
    email: this.email,
    password: this.password,
    roleId: this.roleId
  }).subscribe({
    next: () => {
      alert("Registered successfully");
      this.loading = false; 
      this.router.navigate(['/student/dashboard']);
    },
    error: (err) => { 
      this.loading = false;
      this.error = err?.error?.message || err?.message || 'Registration failed';
      console.error('Register error', err);
    }
  });


}
}










