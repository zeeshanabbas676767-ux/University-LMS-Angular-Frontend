import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RegisterDto } from '../../shared/models/register.model';
import { LoginDto } from '../../shared/models/login.model';
import { User } from '../../shared/models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../../shared/models/auth-Responce';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
 private userSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  // Change this line
private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  user$ = this.userSubject.asObservable();
  constructor(private https: HttpClient, private router: Router) {}


// private hasToken(): boolean {
//     return !!localStorage.getItem('token'); // Returns true if token exists
//   }

  // Call this method after a successful login or register
  setLoggedIn(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

 createUser(user: User) {
    return this.https.post(this.apiUrl , user);
  }
  updateUser(user: User) {
    return this.https.put(`${this.apiUrl}/${user.id}`, user);
  }


  getAllUsers(): Observable<User[]> {
       return this.https.get<User[]>(`${this.apiUrl}/users`);
     }
  login(data: LoginDto) { 
    return this.https.post<AuthResponse>(`${this.apiUrl}/login`, data, { withCredentials: true })
    .pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
        this.setLoggedIn(true);
      })
    );
  }
 register(data: RegisterDto) {
  return this.https.post<AuthResponse>(`${this.apiUrl}/register`, data, { withCredentials: true })
    .pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userSubject.next(res.user);
        this.setLoggedIn(true);
      })
    );
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.setLoggedIn(false);
     this.router.navigate(['/admin/login']);

  }

  getStoredUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getCurrentUserId(): number {
  const user = this.getStoredUser();
  // Return the user ID if found, otherwise default to 0
  return user && user.id ? user.id : 0;
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isLoggedIn(): boolean {
     return !!localStorage.getItem('user');
  }
     delete(id: number): Observable<void> {
     return this.https.delete<void>(`${this.apiUrl}` + `/${id}`);
   }
 

}







