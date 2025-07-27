import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../component/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../component/sidebar/sidebar';

import { BookService } from '../core/services/book-service';

@Component({
  selector: 'app-main-page',
  imports: [FormsModule, NgIf, NgFor, Navbar, RouterOutlet, Sidebar],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  searchTerm: any;
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
      console.log('Books loaded:', this.books);
    });
  }
  books: any[] = [];
  selectedCategory = '';
  categories = ['Fiction', 'Science', 'Biography', 'History'];

  get filteredBooks() {
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedCategory === '' ||
          book.category === this.selectedCategory)
    );
  }
  borrowBook(book: any) {
    if (!book.borrowed) {
      book.borrowed = true;
      alert(`You've borrowed "${book.title}"`);
      // Here you would typically:
      // 1. Call a service to update backend
      // 2. Update local state
      // 3. Show a toast notification
    }
  }

  viewDetails(book: any) {
    console.log('Viewing details for:', book);
  }
}
