import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<LoginModel> {
    console.log('Login attempted with', credentials);
    return this.http.post<LoginModel>('http://127.0.0.1:8080/api/auth/login', credentials)
  }

  register(details: { name: string; email: string; password: string }): boolean {
    console.log('Registering user with', details);
    return true;
  }
}
