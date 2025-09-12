import { Feedback } from "./feedback.model";

export interface PendingFeedback extends Feedback {
  assignmentId: number;
  assignedAt: string; // or Date if you want to parse it
  questions: Question[];
}

export interface Question {
  id: number;
  prompt: string;
  type: 'RATING' | 'TEXT'; // restricts to known values
  maxRating: number | null;
}
