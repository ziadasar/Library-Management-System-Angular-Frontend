import { Component } from '@angular/core';
import { BookService } from '../core/services/book-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-librarian-main-page',
  imports: [FormsModule],
  templateUrl: './librarian-main-page.html',
  styleUrl: './librarian-main-page.scss',
})
export class LibrarianMainPage {
  books: any[] = [];
  newBook = {
    title: '',
    author: '',
    category: '',
    image: '',
  };

  constructor(private bookService: BookService) {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
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
}
