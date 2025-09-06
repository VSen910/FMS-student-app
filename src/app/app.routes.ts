import { Routes } from '@angular/router';
import { Login } from './login/login';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', loadComponent: () => import('./login/login').then(m => m.Login)},
  {path: 'register', loadComponent: () => import('./register/register').then(m => m.Register)},
  {path: 'home', loadComponent: () => import('./home/home').then(m => m.Home)}
];
