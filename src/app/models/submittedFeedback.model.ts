export interface SubmittedFeedback {
  assignmentId: number;
  formId: number;
  title: string;
  description: string;
  createdBy: string;
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
