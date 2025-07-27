import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = `${environment.apiBaseUrl}/Auth/login`;
  private signupUrl = `${environment.apiBaseUrl}/Auth/register`; // adjust if your endpoint is different

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

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role);
      })
    );
  }

  signup(userData: any): Observable<any> {
    return this.http.post(this.signupUrl, userData);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }
}
