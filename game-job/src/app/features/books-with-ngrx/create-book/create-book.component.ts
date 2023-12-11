import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { BookTypeEnum } from 'src/app/enums/book-type.enum';
import { BookService } from 'src/app/services/book.service';
import { AppState } from 'src/app/store/app.state';
import * as BookStoreActions from 'src/app/store/book.actions';
import * as BookStoreSelectors from 'src/app/store/book.selector';

@Component({
  selector: 'ngrx-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class NgrxCreateBookComponent {
  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private messageService: MessageService
  ) {}

  types = BookTypeEnum.All;

  form = this.fb.group({
    name: ['', Validators.required],
    type: [BookTypeEnum.ProgrammingBook.code, Validators.required],
    author: ['', Validators.required],
    locked: [false, Validators.required],
  });

  save() {
    if (!this.form.valid) {
      return;
    }

    const model = this.form.getRawValue() as any;
    this.store$.dispatch(BookStoreActions.saveRequestAction({item: model}));
  }
}
