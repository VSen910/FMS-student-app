import { Component, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';
import { ChangePassword } from '../components/change-password/change-password';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private dialog: Dialog,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.validateToken().subscribe({
      next: (isValid) => {
        if (!isValid) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Token validation failed', err);
        this.router.navigate(['/login']);
      },
    });
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePassword);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
