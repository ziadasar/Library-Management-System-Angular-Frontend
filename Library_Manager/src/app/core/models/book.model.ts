// models/book.model.ts
export class Book {
  constructor(
    public id?: string,
    public title: string = '',
    public author: string = '',
    public description: string = '',
    public category: string = '',
    public coverImageUrl: string = '',
    public bookStatus: BookStatus = BookStatus.Available
  ) {}

  // Static method to create from API response
  static fromApi(data: any): Book {
    return new Book(
      data.id,
      data.title,
      data.author,
      data.description,
      data.category,
      data.coverImageUrl,
      data.bookStatus
    );
  }
}

export enum BookStatus {
  Available = 0,
  Borrowed = 1,
  Reserved = 2,
}

export const BookStatusOptions = [
  { value: BookStatus.Available, label: 'Available' },
  { value: BookStatus.Borrowed, label: 'Borrowed' },
  { value: BookStatus.Reserved, label: 'Reserved' },
];
