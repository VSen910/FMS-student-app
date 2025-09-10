import { Component, Input } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-card',
  imports: [],
  templateUrl: './form-card.html',
  styleUrl: './form-card.css'
})
export class FormCard {
  @Input() feedback!: Feedback;
  @Input() status!: 'pending' | 'completed';

  constructor(private router: Router) {}

  goToDetails() {
    // Logic to navigate to form details page
    console.log('Navigating to form details...');
    this.router.navigate([`/form/${this.status}`, this.feedback.formId]);
  }
}
