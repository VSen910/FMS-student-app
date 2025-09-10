import { Component, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';
import { ChangePassword } from '../components/change-password/change-password';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { Auth } from '../services/auth/auth';
import { CookieService } from 'ngx-cookie-service';
import { Student } from '../services/student/student';
import { Feedback } from '../models/feedback.model';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  name: string;
  pendingFeedbacks: Feedback[] = [];
  completedFeedbacks: Feedback[] = [];

  constructor(
    private dialog: Dialog,
    private auth: Auth,
    private student: Student,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.name = this.cookieService.get('fullName') || 'User';
  }

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

    this.student.getAllPendingForms().subscribe({
      next: (feedbacks) => {
        console.log('Pending forms data:', feedbacks);
        this.pendingFeedbacks = feedbacks;
      },
      error: (err) => {
        console.error('Error fetching pending forms', err);
      },
    });

    this.student.getAllCompletedForms().subscribe({
      next: (feedbacks) => {
        console.log('Completed forms data:', feedbacks);
        this.completedFeedbacks = feedbacks;
      },
      error: (err) => {
        console.error('Error fetching completed forms', err);
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
