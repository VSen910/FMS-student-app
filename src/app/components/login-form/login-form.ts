import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  loginForm: FormGroup;
  showError: boolean = false;

  constructor(
    private auth: Auth,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login(event: Event) {
    event.preventDefault();
    this.showError = false;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // ⚡ highlight errors
      return;
    }
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.cookieService.set('token', res.token);
        this.cookieService.set('fullName', res.fullName);
        console.log(decodeURIComponent(document.cookie));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.showError = true;
        console.error('Login failed', err);
      }
    })
  }
}
