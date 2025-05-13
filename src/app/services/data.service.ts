// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {
//   private apiUrl = 'https://localhost:7085/api/Users';

//   constructor(private http: HttpClient) { }

//   // Fetch all users
//   getUsers(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}`);
//   }

//   // Fetch a single user by ID
//   // getUserById(userId: number): Observable<any> {
//   //   return this.http.get<any>(`${this.apiUrl}/${userId}`);
//   // }

//   // Create a new user
//   // createUser(user: any): Observable<any> {
//   //   return this.http.post<any>(`${this.apiUrl}`, user);
//   // }

//   // Update an existing user
//   // updateUser(userId: number, user: any): Observable<any> {
//   //   return this.http.put<any>(`${this.apiUrl}/${userId}`, user);
//   // }

//   // Delete a user by ID
//   // deleteUser(userId: number): Observable<any> {
//   //   return this.http.delete<any>(`${this.apiUrl}/${userId}`);
//   // }

//   addFact(fact: any) {
//     return this.http.post<any>('https://localhost:7085/api/Users/facts', fact);
//   }

//   // In your data.service.ts
//   updateFact(factId: number, payload: any) {
//     return this.http.put(`https://localhost:7085/api/Users/facts/${factId}`, payload);
//   }
// }