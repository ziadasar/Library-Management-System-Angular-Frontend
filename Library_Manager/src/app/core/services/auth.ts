import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:2000';

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getUserRole(): string {
    return localStorage.getItem('user_role') || '';
  }

  // Update your login method to store role
  login(credentials: any): Observable<any> {
    return this.http.post('/api/login', credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }
}
