// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<any[]>('/api/books');
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
