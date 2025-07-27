import { Component } from '@angular/core';
import { UserService } from '../core/services/user-service';
import { BookService } from '../core/services/book-service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-main-page',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './admin-main-page.html',
  styleUrl: './admin-main-page.scss',
})
export class AdminMainPage {
  books: any[] = [];
  users: any[] = [];
  selectedTab: 'books' | 'users' = 'books';

  newBook = {
    title: '',
    author: '',
    category: '',
    image: '',
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
      this.users = users.filter((u) => u.role !== 'admin'); // Don't show other admins
    });
  }

  addBook() {
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.loadBooks();
      this.newBook = { title: '', author: '', category: '', image: '' };
    });
  }

  updateBook(book: any) {
    this.bookService.updateBook(book).subscribe(() => {
      this.loadBooks();
    });
  }

  deleteBook(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  updateUserRole(user: any, newRole: 'librarian' | 'user') {
    this.userService.updateUserRole(user.id, newRole).subscribe(() => {
      this.loadUsers();
    });
  }
}
