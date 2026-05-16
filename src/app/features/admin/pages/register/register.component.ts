import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
 

@Component({
  selector: 'admin-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html'
})
export class AdminRegisterComponent {
  name = '';
    email = ''
    password = '' 
    roleId = 1;
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
  
  if(!this.name || !this.email || !this.password) {
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
    fullName: this.name,
    email: this.email,
    password: this.password,
    roleId: this.roleId
  }).subscribe({
    next: () => {
      alert("Registered successfully");
      this.loading = false;
      // 👉 redirect to login
      this.router.navigate(['/admin/dashboard']);
    },
    error: (err) => { 
      this.loading = false;
      this.error = err?.error?.message || err?.message || 'Registration failed';
      console.error('Register error', err);
    }
  });


}
  

}
