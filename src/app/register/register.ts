import { Component } from '@angular/core';
import { RegisterForm } from '../components/register-form/register-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RegisterForm, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}
