import { Component } from '@angular/core';
import { UserService } from '../core/services/user-service';
import { BookService } from '../core/services/book-service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Book, BookStatus } from '../core/models/book.model';
import { ManageBooks } from '../component/manage-books/manage-books';

@Component({
  selector: 'app-admin-main-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule, ManageBooks],
  templateUrl: './admin-main-page.html',
  styleUrl: './admin-main-page.scss',
})
export class AdminMainPage {
  // Books properties
  books: Book[] = [];
  selectedTab: 'books' | 'users' = 'books';

  // Users properties
  users: any[] = [];
  filteredUsers: any[] = [];
  searchUsername: string = '';
  showCreateUserForm: boolean = false;

  newUser = {
    username: '',
    email: '',
    password: '',
    role: 'user',
  };

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) {
    this.loadBooks();
    this.loadUsers();
  }

  // Books methods (keep existing)
  loadBooks() {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

  // Users methods
  loadUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users.filter((u) => u.role !== 'admin');
      this.filteredUsers = [...this.users];
    });
  }

  searchUsers() {
    if (!this.searchUsername) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.userService.searchUserByUsername(this.searchUsername).subscribe({
      next: (response) => {
        // Ensure we always have an array
        this.filteredUsers = Array.isArray(response) ? response : [response];
        console.log('Search results:', this.filteredUsers);
      },
      error: (err) => {
        console.error('Search error:', err);
        this.filteredUsers = [];
      },
    });
  }

  clearSearch() {
    this.searchUsername = '';
    this.filteredUsers = [...this.users];
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.showCreateUserForm = false;
        this.resetNewUserForm();
      },
      error: (err) => console.error('Error creating user:', err),
    });
  }

  cancelCreateUser() {
    this.showCreateUserForm = false;
    this.resetNewUserForm();
  }

  resetNewUserForm() {
    this.newUser = {
      username: '',
      email: '',
      password: '',
      role: 'user',
    };
  }

  updateUserRole(user: any, newRole: 'librarian' | 'user') {
    this.userService.updateUserRole(user.id, newRole).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Error updating user role:', err),
    });
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user:', err),
      });
    }
  }
}
