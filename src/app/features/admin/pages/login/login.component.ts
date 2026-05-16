import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
 import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html'
})
export class AdminLoginComponent {
  email = '';
    password = '';
    roleId = 1; // Assuming 1 is the role ID for admins
    error: string | null = null
    loading = false;
    constructor(private auth: AuthService, private router: Router) {}
    showPassword = false;
    togglePassword(): void {
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
    // Save the whole response
   // localStorage.setItem('user', JSON.stringify(res));

    // Access the roleId inside the user object
    const userRole = res.user?.roleId; 

    if (userRole === 1) {
      this.router.navigate(['/admin/dashboard']);
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
