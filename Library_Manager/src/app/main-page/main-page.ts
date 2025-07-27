import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../component/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../component/sidebar/sidebar';

@Component({
  selector: 'app-main-page',
  imports: [FormsModule, NgIf, NgFor, Navbar, RouterOutlet, Sidebar],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  searchTerm = '';
  selectedCategory = '';
  categories = ['Fiction', 'Science', 'Biography', 'History'];

  books = [
    {
      title: '1984',
      author: 'George Orwell',
      image: 'assets/books/1984.jpg',
      category: 'Fiction',
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      image: 'assets/books/brief-history.jpg',
      category: 'Science',
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      image: 'assets/books/brief-history.jpg',
      category: 'Science',
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      image: 'assets/books/brief-history.jpg',
      category: 'Science',
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      image: 'assets/books/brief-history.jpg',
      category: 'Science',
    },
    // add more books here
  ];

  get filteredBooks() {
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedCategory === '' ||
          book.category === this.selectedCategory)
    );
  }

  viewDetails(book: any) {
    console.log('Viewing details for:', book);
  }
}
