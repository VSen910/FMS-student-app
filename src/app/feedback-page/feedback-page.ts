import { Component, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { FeedbackForm } from '../components/feedback-form/feedback-form';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-page',
  imports: [Header, FeedbackForm],
  templateUrl: './feedback-page.html',
  styleUrl: './feedback-page.css',
})
export class FeedbackPage implements OnInit {
  constructor(private auth: Auth, private router: Router) {}

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
}
