import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string, username: string) {
  return this.http.post(`${this.apiUrl}/register`, { email, password, username });
  }

  getCurrentUser() {
  const token = localStorage.getItem('token');
  return this.http.get<any>(`${this.apiUrl}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  }

  updateProfile(data: { username: string; imageUrl: string }) {
  const token = localStorage.getItem('token');
  return this.http.put<any>(
    `${this.apiUrl}/me`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  }

  changePassword(data: { currentPassword: string; newPassword: string }) {
  const token = localStorage.getItem('token');
  return this.http.post<any>(
    `${this.apiUrl}/change-password`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  }
}