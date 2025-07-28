import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../core/services/book-service';

@Component({
  selector: 'app-borrow-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './borrow-form.html',
  styleUrl: './borrow-form.scss',
})
export class BorrowForm {
  @Input() book: any;
  @Output() close = new EventEmitter<void>();

  borrowDate: string = '';
  returnDate: string = '';
  dateError: string | null = null;

  onClose() {
    this.close.emit();
  }

  constructor(private bookservice: BookService) {}

  validateDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(this.borrowDate);
    const endDate = new Date(this.returnDate);

    if (!this.borrowDate || !this.returnDate) {
      this.dateError = 'Both dates are required';
      return false;
    }

    if (startDate < today) {
      this.dateError = 'Borrow date cannot be in the past';
      return false;
    }

    if (endDate <= startDate) {
      this.dateError = 'Return date must be after borrow date';
      return false;
    }

    this.dateError = null;
    return true;
  }

  onSubmit() {
    if (!this.validateDates()) {
      return;
    }

    this.bookservice
      .borrowBook(
        this.book.id, // assuming your book object has an id
        this.borrowDate,
        this.returnDate
      )
      .subscribe({
        next: (response) => {
          console.log('Borrow successful:', response);

          this.onClose();
        },
        error: (error) => {
          console.error('Borrow failed:', error);
          this.dateError = error.message || 'Failed to borrow book';
        },
      });
  }
}
