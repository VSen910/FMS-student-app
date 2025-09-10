import { Component, OnInit } from '@angular/core';
import { Header } from "../components/header/header";
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../services/student/student';

@Component({
  selector: 'app-feedback-page',
  imports: [Header],
  templateUrl: './feedback-page.html',
  styleUrl: './feedback-page.css'
})
export class FeedbackPage implements OnInit {
  formId: number;
  feedbackStatus: 'pending' | 'completed' = 'pending';
  
  constructor(private route: ActivatedRoute, private student: Student, private router: Router) {
    this.formId = Number(this.route.snapshot.paramMap.get('formId'));
    const url = this.router.url;
    if(url.includes('pending')) {
      this.feedbackStatus = 'pending';
    } else if(url.includes('completed')) {
      this.feedbackStatus = 'completed';
    }
  }

  ngOnInit(): void {
    if(this.feedbackStatus === 'pending') {
      this.student.getPendingFormById(this.formId).subscribe({
        next: (data) => {
          console.log('Pending form data:', data);
          // Handle the pending form data
        },
        error: (err) => {
          console.error('Error fetching pending form', err);
        }
      });
    } else if(this.feedbackStatus === 'completed') {
      this.student.getCompletedFormById(this.formId).subscribe({
        next: (data) => {
          console.log('Completed form data:', data);
          // Handle the completed form data
        },
        error: (err) => {
          console.error('Error fetching completed form', err);
        }
      });
    }
  } 
}
