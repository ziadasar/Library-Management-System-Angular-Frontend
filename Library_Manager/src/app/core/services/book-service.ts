// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/books`);
  }

  addBook(book: any) {
    return this.http.post('/api/books', book);
  }

  updateBook(book: any) {
    return this.http.put(`/api/books/${book.id}`, book);
  }

  deleteBook(id: string) {
    return this.http.delete(`/api/books/${id}`);
  }
}
