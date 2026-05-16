// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { User } from '../../shared/models/user.model';

// @Injectable({ providedIn: 'root' })
// export class UserService {

//   private apiUrl = `${environment.apiUrl}/users`;

//   constructor(private http: HttpClient) {}

//   getUsers() {  
//     return this.http.get(this.apiUrl);
//   }

//   createUser(user: User) {
//     return this.http.post(this.apiUrl, user);
//   }
//   updateUser(user: User) {
//     return this.http.put(`${this.apiUrl}/${user.id}`, user);
//   }
// }