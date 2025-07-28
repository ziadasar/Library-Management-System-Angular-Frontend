import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../core/services/book-service';
import { Book, BookStatus } from '../../core/models/book.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-books',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-books.html',
  styleUrl: './edit-books.scss',
})
export class EditBooks implements OnInit {
  book: Book = {
    title: '',
    author: '',
    description: '',
    category: '',
    coverImageUrl: '',
    bookStatus: BookStatus.Available,
  };

  statusOptions = [
    { value: BookStatus.Available, label: 'Available' },
    { value: BookStatus.Borrowed, label: 'Borrowed' },
    { value: BookStatus.Reserved, label: 'Reserved' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe({
        next: (book) => {
          this.book = book;
        },
        error: (err) => {
          console.error('Failed to load book:', err);
          this.router.navigate(['/librarian']);
        },
      });
    }
  }

  updateBook(): void {
    if (!this.book.id) return;

    this.bookService.updateBook(this.book.id, this.book).subscribe({
      next: () => {
        this.router.navigate(['/librarian']);
      },
      error: (err) => {
        console.error('Failed to update book:', err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/librarian']);
  }
}
