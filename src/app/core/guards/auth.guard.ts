// // src/app/guards/auth.guard.ts
 import { Injectable } from '@angular/core';
 import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

 @Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true; // ✅ user exists in localStorage → stay on page
    }
    this.router.navigate(['/admin/login']); // ❌ no user → go to login
    return false;
  }
}

// @Injectable({ providedIn: 'root' })
// export class AdminGuard implements CanActivate {

//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       this.router.navigate(['/admin/login']);
//       return false;
//     }

//     const payload = JSON.parse(atob(token.split('.')[1]));
//     if (payload.rolef !== 'Admin') {
//       this.router.navigate(['/']); // redirect non-admins
//       return false;
//     }

//     return true;
//   }
// }




// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       this.router.navigate(['/login']);
//       return false;
//     }

//     return true;
//   }
// }
