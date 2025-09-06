import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  login(credentials: { email: string; password: string }): boolean {
    console.log('Login attempted with', credentials);
    return true;
  }

  register(details: { name: string; email: string; password: string }): boolean {
    console.log('Registering user with', details);
    return true;
  }
}
