import { Feedback } from "./feedback.model";

export interface SubmittedFeedback extends Feedback {
  assignmentId: number;
  assignedAt: string;   // or Date
  submittedAt: string | null; 
  answers: Answer[];
}

export interface Answer {
  question: string;
  type: 'RATING' | 'TEXT';  // extend if there are more types
  answer: number | string;  // rating is number, text is string
  submittedAt: string;      // or Date
}
