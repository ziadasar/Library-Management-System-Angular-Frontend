import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Existing methods
  getAllUsers() {
    return this.http.get<any[]>('/api/users');
  }

  updateUserRole(userId: string, role: string) {
    return this.http.patch(`/api/users/${userId}/role`, { role });
  }

  createUser(userData: {
    username: string;
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    console.log('Creating user with data:', userData);
    return this.http
      .post(`${environment.apiBaseUrl}/Users/create`, userData)
      .pipe(
        catchError((error) => {
          console.error('Error creating user:', error);
          return throwError(() => new Error('Failed to create user'));
        })
      );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`/api/users/${userId}`).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }

  // New method to search users by username
  searchUserByUsername(username: string): Observable<any[]> {
    const params = new HttpParams().set('username', username);
    return this.http
      .get<any[]>(`${environment.apiBaseUrl}/users/search`, { params })
      .pipe(
        catchError((error) => {
          console.error('Error searching users:', error);
          return throwError(() => new Error('Failed to search users'));
        })
      );
  }
}
