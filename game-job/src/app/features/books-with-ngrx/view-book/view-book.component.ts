import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookTypeEnum } from 'src/app/enums/book-type.enum';
import { BookDto } from 'src/app/models/books/book.dto';
import { BookService } from 'src/app/services/book.service';
import { AppState } from 'src/app/store/app.state';
import * as BookStoreActions from 'src/app/store/book.actions';
import * as BookStoreSelectors from 'src/app/store/book.selector';

@Component({
  selector: 'ngrx-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
})
export class NgrxViewBookComponent implements OnInit {
  book: BookDto | undefined;
  id!: number;
  types = BookTypeEnum.All;

  constructor(
    private store$: Store<AppState>,
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.store$.dispatch(
        BookStoreActions.loadBookRequestAction({ id: this.id })
      );
      this.store$
        .select(BookStoreSelectors.getSelectedBook)
        .subscribe((book) => {
          this.book = book;
        });
    });
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
