import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
@Component({
  selector: 'teacher-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './teacher-navbar.component.html',
})
export class TeacherNavbarComponent {
  role: Role | null = null;
    isLoggedIn = false;
    currentUser: User | null = null;

  constructor(private auth: AuthService, private router: Router) {
    // Subscribe to the status
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
     this.auth.user$.subscribe(user => {
      this.currentUser = user;
    });
  }
  
 get isStudentLoggedIn(): boolean {
    return this.currentUser?.roleId === 3;
  }

  get isTeacherLoggedIn(): boolean {
    
    return this.currentUser?.roleId === 2;
  }

  get isAdminLoggedIn(): boolean {
    return this.currentUser?.roleId === 1;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/teacher/login']);
  }
}
