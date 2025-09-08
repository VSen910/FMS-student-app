import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser } from './authUser.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<AuthUser> {
    console.log('Login attempted with', credentials);
    return this.http.post<AuthUser>(`${environment.apiUrl}/api/auth/login/student`, credentials)
  }

  register(details: { name: string; email: string; password: string }): Observable<AuthUser> {
    console.log('Registering user with', details);
    return this.http.post<AuthUser>(`${environment.apiUrl}/api/auth/register`, details);
  }

  validateToken(): Observable<boolean> {
    const token = this.cookieService.get('token');
    return this.http.get<boolean>(`${environment.apiUrl}/api/auth/validate`, { headers: { Authorization: `Bearer ${token}` } });
  }
}
