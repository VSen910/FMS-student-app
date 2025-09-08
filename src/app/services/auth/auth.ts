import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser } from './authUser.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<AuthUser> {
    console.log('Login attempted with', credentials);
    return this.http.post<AuthUser>('http://127.0.0.1:8080/api/auth/login/student', credentials)
  }

  register(details: { name: string; email: string; password: string }): Observable<AuthUser> {
    console.log('Registering user with', details);
    return this.http.post<AuthUser>('http://127.0.0.1:8080/api/auth/register', details);
  }

  validateToken(): Observable<boolean> {
    const token = this.cookieService.get('token');
    return this.http.get<boolean>('http://127.0.0.1:8080/api/auth/validate', { headers: { Authorization: `Bearer ${token}` } });
  }
}
