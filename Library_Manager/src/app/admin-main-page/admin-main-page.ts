import { Component } from '@angular/core';
import { UserService } from '../core/services/user-service';
import { BookService } from '../core/services/book-service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Book, BookStatus, BookStatusOptions } from '../core/models/book.model';
import { ManageBooks } from '../component/manage-books/manage-books';

@Component({
  selector: 'app-admin-main-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule, ManageBooks],
  templateUrl: './admin-main-page.html',
  styleUrl: './admin-main-page.scss',
})
export class AdminMainPage {
  books: Book[] = [];
  users: any[] = [];
  selectedTab: 'books' | 'users' = 'books';
  isEditing = false;
  currentBookId: string | null = null;
  bookStatusOptions = BookStatusOptions;

  newBook: Book = {
    title: '',
    author: '',
    description: '',
    category: '',
    coverImageUrl: '',
    bookStatus: BookStatus.Available,
  };

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) {
    this.loadBooks();
    this.loadUsers();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users.filter((u) => u.role !== 'admin');
    });
  }

  addBook() {
    this.bookService.addBook(this.newBook).subscribe({
      next: () => {
        this.loadBooks();
        this.resetBookForm();
      },
      error: (err) => console.error('Error adding book:', err),
    });
  }

  startEdit(book: Book) {
    this.isEditing = true;
    this.currentBookId = book.id || null;
    this.newBook = { ...book };
  }

  updateBook() {
    if (!this.currentBookId) return;

    this.bookService.updateBook(this.currentBookId, this.newBook).subscribe({
      next: () => {
        this.loadBooks();
        this.resetBookForm();
      },
      error: (err) => console.error('Error updating book:', err),
    });
  }

  deleteBook(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (err) => console.error('Error deleting book:', err),
      });
    }
  }

  resetBookForm() {
    this.isEditing = false;
    this.currentBookId = null;
    this.newBook = {
      title: '',
      author: '',
      description: '',
      category: '',
      coverImageUrl: '',
      bookStatus: BookStatus.Available,
    };
  }

  updateUserRole(user: any, newRole: 'librarian' | 'user') {
    this.userService.updateUserRole(user.id, newRole).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Error updating user role:', err),
    });
  }
}
