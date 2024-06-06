import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // GET request with error handling and type casting
  getData(url: string): Observable<any[]> {
    return this.http
      .get<any[]>(API + url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // POST request with error handling and type casting
  postData(url: string, data: any): Observable<any> {
    return this.http
      .post<any>(API + url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // PUT request with error handling and type casting
  updateData(url: string, id: string, data: any): Observable<any> {
    return this.http
      .put<any>(`${API + url}/${id}`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // DELETE request with error handling and type casting
  deleteData(url: string, id: number): Observable<any> {
    return this.http
      .delete<any>(`${API + url}/${id}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
