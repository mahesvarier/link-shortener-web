import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private apiUrl = 'https://localhost:7277/Link';

  constructor(private http: HttpClient) { }

  addLink(link: any): Observable<any> {
    return this.http.post(this.apiUrl, link).pipe(
      catchError(this.handleError)
    );
  }

  getOriginalUrl(shortenedUrl: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${shortenedUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllLinks(): Observable<any> {
    return this.http.get(this.apiUrl + '/GetAllUrls').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError('Something bad happened; please try again later.');
  }
}
