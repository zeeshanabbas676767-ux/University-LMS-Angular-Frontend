import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
@Component({
  selector: 'student-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-navbar.component.html',
})
export class StudentNavbarComponent {
    role: Role | null = null;
    isLoggedIn = false;
    currentUser: User | null = null;

  constructor(private router: Router, private auth: AuthService) {}
  ngOnInit() {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user; // Convert to boolean
    
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