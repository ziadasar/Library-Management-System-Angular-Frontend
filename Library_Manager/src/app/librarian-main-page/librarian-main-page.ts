import { Component } from '@angular/core';
import { BookService } from '../core/services/book-service';
import { FormsModule } from '@angular/forms';
import { Book, BookStatus, BookStatusOptions } from '../core/models/book.model';
import { CommonModule } from '@angular/common';
import { ManageBooks } from '../component/manage-books/manage-books';

@Component({
  selector: 'app-librarian-main-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ManageBooks, ManageBooks],
  templateUrl: './librarian-main-page.html',
  styleUrl: './librarian-main-page.scss',
})
export class LibrarianMainPage {}
