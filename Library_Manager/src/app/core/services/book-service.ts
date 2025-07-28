// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Book } from '../../core/models/book.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  private handleResponse(response: string): { message: string } {
    if (response.includes('successfully')) {
      return { message: response };
    }
    try {
      return JSON.parse(response);
    } catch (e) {
      throw new Error('Unexpected response format');
    }
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiBaseUrl}/Books`);
  }

  addBook(book: Book): Observable<{ message: string }> {
    return this.http
      .post(`${environment.apiBaseUrl}/Books`, book, {
        responseType: 'text',
      })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  updateBook(id: string, book: Book): Observable<{ message: string }> {
    return this.http
      .put(`${environment.apiBaseUrl}/Books/${id}`, book, {
        responseType: 'text',
      })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiBaseUrl}/Books/${id}`);
  }

  deleteBook(id: string): Observable<{ message: string }> {
    return this.http
      .delete(`${environment.apiBaseUrl}/Books/${id}`, {
        responseType: 'text',
      })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(
      () =>
        new Error(error.error?.message || error.message || 'Operation failed')
    );
  }

  borrowBook(
    bookId: number,
    borrowDate: string,
    dueDate: string
  ): Observable<{ message: string }> {
    const borrowData = {
      bookId: bookId,
      borrowDate: borrowDate,
      dueDate: dueDate,
    };

    return this.http
      .post(`${environment.apiBaseUrl}/BorrowRecords`, borrowData, {
        responseType: 'text',
      })
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }
}
