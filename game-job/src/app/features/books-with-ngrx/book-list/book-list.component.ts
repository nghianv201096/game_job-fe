import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ConfirmationService,
} from 'primeng/api';
import { BookTypeEnum } from 'src/app/enums/book-type.enum';
import { BookDto } from 'src/app/models/books/book.dto';
import { AppState } from 'src/app/store/app.state';
import * as BookStoreActions from 'src/app/store/book.actions';
import * as BookStoreSelectors from 'src/app/store/book.selector';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class NgrxBookListComponent {
  books: BookDto[] = [];
  bookTypes = BookTypeEnum.All;
  isLoading = false;
  constructor(
    private store$: Store<AppState>,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(BookStoreActions.loadRequestAction());

    this.store$.select(BookStoreSelectors.getBooks).subscribe((books) => {
      this.books = books;
    });

    this.store$.select(BookStoreSelectors.getBookIsLoading).subscribe((rs) => {
      this.isLoading = rs;
    });
  }

  reload() {
    this.store$.dispatch(BookStoreActions.loadRequestAction());
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure want to delete this book?',
      accept: () => {
        this.store$.dispatch(BookStoreActions.deleteRequestAction({ id: id }));
      },
    });
  }
}
