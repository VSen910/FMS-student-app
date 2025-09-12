import { Component } from '@angular/core';
import { Header } from "../components/header/header";
import { FeedbackForm } from "../components/feedback-form/feedback-form";

@Component({
  selector: 'app-feedback-page',
  imports: [Header, FeedbackForm],
  templateUrl: './feedback-page.html',
  styleUrl: './feedback-page.css'
})
export class FeedbackPage{
   
}
