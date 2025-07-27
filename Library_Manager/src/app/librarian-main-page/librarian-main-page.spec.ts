import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianMainPage } from './librarian-main-page';

describe('LibrarianMainPage', () => {
  let component: LibrarianMainPage;
  let fixture: ComponentFixture<LibrarianMainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarianMainPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
