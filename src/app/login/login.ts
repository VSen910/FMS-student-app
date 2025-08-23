import { Component } from '@angular/core';
import { LoginForm } from '../components/login-form/login-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LoginForm, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
