import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  registerForm: FormGroup;

  constructor(
    private auth: Auth,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register(event: Event) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // ⚡ highlight errors
      return;
    }
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.cookieService.set('token', res.token);
        this.cookieService.set('fullName', res.fullName);
        console.log(decodeURIComponent(document.cookie));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }
}
