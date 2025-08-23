import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  // loginForm = new FormGroup({
  //   email: new FormControl<string>('', [Validators.required, Validators.email]),
  //   password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  // });

  loginForm: FormGroup;

  constructor(private auth: Auth, private fb: NonNullableFormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(event: Event) {
    event.preventDefault();
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // ⚡ highlight errors
      return;
    }
    this.auth.login(this.loginForm.value);
  }
}
