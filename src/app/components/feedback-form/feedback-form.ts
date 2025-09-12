import { Component, Input, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PendingFeedback } from '../../models/pendingFeedback.model';
import { SubmittedFeedback } from '../../models/submittedFeedback.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../services/student/student';
import { FormResponse, ResponseAnswer } from '../../models/response.model';

@Component({
  selector: 'app-feedback-form',
  imports: [ReactiveFormsModule],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css',
})
export class FeedbackForm implements OnInit {
  formId: number;
  feedbackStatus: 'pending' | 'completed' = 'pending';
  feedback!: PendingFeedback | SubmittedFeedback;
  feedbackForm!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private student: Student
  ) {
    this.formId = Number(this.route.snapshot.paramMap.get('formId'));
    const url = this.router.url;
    if (url.includes('pending')) {
      this.feedbackStatus = 'pending';
    } else if (url.includes('completed')) {
      this.feedbackStatus = 'completed';
    }
  }

  ngOnInit(): void {
    if (this.feedbackStatus === 'pending') {
      this.student.getPendingFormById(this.formId).subscribe({
        next: (data) => {
          console.log('Pending form data:', data);
          this.feedback = data as PendingFeedback;
          this.buildPendingForm(this.feedback as PendingFeedback);
        },
        error: (err) => {
          console.error('Error fetching pending form', err);
        },
      });
    } else if (this.feedbackStatus === 'completed') {
      this.student.getCompletedFormById(this.formId).subscribe({
        next: (data) => {
          console.log('Completed form data:', data);
          this.feedback = data as SubmittedFeedback;
          this.buildSubmittedForm(this.feedback as SubmittedFeedback);
        },
        error: (err) => {
          console.error('Error fetching completed form', err);
        },
      });
    }
  }

  private buildPendingForm(feedback: PendingFeedback) {
    this.feedbackForm = this.fb.group({
      responses: this.fb.array(
        feedback.questions.map((q) =>
          q.type === 'RATING'
            ? [
                0,
                [
                  Validators.required,
                  Validators.min(1),
                  Validators.max(q.maxRating!),
                ],
              ]
            : ['', [Validators.required, Validators.minLength(2)]]
        )
      ),
    });
  }

  private buildSubmittedForm(feedback: SubmittedFeedback) {
    this.feedbackForm = this.fb.group({
      responses: this.fb.array(
        feedback.answers.map((a) => this.fb.control(a.answer))
      ),
    });
    this.feedbackForm.disable(); // read-only
  }

  get responsesArray(): FormArray<FormControl> {
    return this.feedbackForm.get('responses') as FormArray<FormControl>;
  }

  setRating(questionIndex: number, rating: number) {
    this.responsesArray.at(questionIndex).setValue(rating);
  }

  submitForm() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }
    const responses = this.responsesArray.value;
    const answers: ResponseAnswer[] = (
      this.feedback as PendingFeedback
    ).questions.map((q, i) => {
      if (q.type === 'RATING') {
        return {
          questionId: q.id,
          ratingAnswer: responses[i] as number,
          textAnswer: null,
        };
      } else {
        return {
          questionId: q.id,
          ratingAnswer: null,
          textAnswer: responses[i] as string,
        };
      }
    });

    const responsePayload: FormResponse = {
      formId: this.feedback.formId,
      answers,
    };
    this.student.submitForm(responsePayload).subscribe({
      next: (res) => {
        console.log('Form submitted successfully', res);
        alert('Thank you for your feedback!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error submitting form', err);
        alert('There was an error submitting your feedback. Please try again.');
      },
    });
    // console.log('Form submitted:', this.feedbackForm.value);
    // alert('Thank you for your feedback!');
  }
}
