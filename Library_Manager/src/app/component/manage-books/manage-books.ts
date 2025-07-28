import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Book,
  BookStatus,
  BookStatusOptions,
} from '../../core/models/book.model';
import { BookService } from '../../core/services/book-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-books.html',
  styleUrl: './manage-books.scss',
})
export class ManageBooks {
  books: Book[] = [];
  bookStatusOptions = BookStatusOptions;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  newBook: Book = {
    title: '',
    author: '',
    description: '',
    category: '',
    coverImageUrl: '',
    bookStatus: BookStatus.Available,
  };

  constructor(private bookService: BookService, private router: Router) {
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading = true;
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load books';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  addBook() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.bookService.addBook(this.newBook).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.loadBooks();
        this.resetBookForm();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }

  startEdit(book: Book) {
    this.router.navigate(['/edit-book', book.id]);
  }

  deleteBook(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.isLoading = true;
      this.errorMessage = '';

      this.bookService.deleteBook(id).subscribe({
        next: (response) => {
          this.successMessage = response.message;
          // Optimistic update - remove immediately from UI
          this.books = this.books.filter((book) => book.id !== id);
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.loadBooks(); // Refresh if error occurs
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  resetBookForm() {
    this.newBook = {
      title: '',
      author: '',
      description: '',
      category: '',
      coverImageUrl: '',
      bookStatus: BookStatus.Available,
    };
  }

  dismissAlert() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
