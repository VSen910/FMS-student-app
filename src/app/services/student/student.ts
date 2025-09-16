import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Feedback } from '../../models/feedback.model';
import { PendingFeedback } from '../../models/pendingFeedback.model';
import { SubmittedFeedback } from '../../models/submittedFeedback.model';
import { FormResponse } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class Student {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private get token(): string {
    return this.cookieService.get('studentToken');
  }

  getAllPendingForms(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${environment.apiUrl}/api/student/pending`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  getAllCompletedForms(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${environment.apiUrl}/api/student/completed`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  getPendingFormById(formId: number): Observable<PendingFeedback> {
    return this.http.get<PendingFeedback>(
      `${environment.apiUrl}/api/student/pending/${formId}`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  getCompletedFormById(formId: number): Observable<SubmittedFeedback> {
    return this.http.get<SubmittedFeedback>(
      `${environment.apiUrl}/api/student/completed/${formId}`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  submitForm(response: FormResponse): Observable<{ status: string; formId: string }> {
    return this.http.post<{ status: string; formId: string }>(
      `${environment.apiUrl}/api/student/submit`,
      response,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
}
