import { Component, OnInit } from '@angular/core';
import { LoginForm } from '../components/login-form/login-form';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [LoginForm, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  constructor(private auth: Auth, private router: Router) {}
  
  ngOnInit() {
    this.auth.validateToken().subscribe({
      next: (isValid) => {
        if (isValid) {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Token validation failed', err);
      }
    });
  }

}
