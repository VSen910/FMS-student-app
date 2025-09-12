export interface FormResponse {
  formId: number;
  answers: ResponseAnswer[];
}

export interface ResponseAnswer {
  questionId: number;
  ratingAnswer: number | null;
  textAnswer: string | null;
}