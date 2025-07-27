// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any[]>('/api/users');
  }

  updateUserRole(userId: string, role: string) {
    return this.http.patch(`/api/users/${userId}/role`, { role });
  }
}
