export interface PendingFeedback {
  assignmentId: number;
  formId: number;
  title: string;
  description: string;
  createdBy: string;
  assignedAt: string; // or Date if you want to parse it
  questions: Question[];
}

export interface Question {
  id: number;
  prompt: string;
  type: 'RATING' | 'TEXT'; // restricts to known values
  maxRating: number | null;
}
