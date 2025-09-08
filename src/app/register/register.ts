import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../components/register-form/register-form';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [RegisterForm, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
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
