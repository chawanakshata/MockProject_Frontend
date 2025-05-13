// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor() { }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface User {
//   id: number;
//   name: string;
//   bio: string;
//   profilePictureUrl: string;
//   gallery: { id: number; imageUrl: string; userId: number }[];
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private apiUrl = 'http://localhost:5000/api/Users'; // Adjust the URL to your backend

//   constructor(private http: HttpClient) { }

//   getUser(): Observable<User> {
//     return this.http.get<User>(this.apiUrl);
//   }
// }