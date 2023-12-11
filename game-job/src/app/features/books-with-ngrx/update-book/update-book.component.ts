import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookTypeEnum } from 'src/app/enums/book-type.enum';
import { AppState } from 'src/app/store/app.state';
import * as BookStoreActions from 'src/app/store/book.actions';
import * as BookStoreSelectors from 'src/app/store/book.selector';

@Component({
  selector: 'ngrx-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class NgrxUpdateBookComponent {
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store$: Store<AppState>
  ) {}

  id!: number;
  types = BookTypeEnum.All;

  form = this.fb.group({
    name: ['', Validators.required],
    type: [BookTypeEnum.ProgrammingBook.code, Validators.required],
    author: ['', Validators.required],
    locked: [false, Validators.required],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];

      this.store$.dispatch(
        BookStoreActions.loadBookRequestAction({ id: this.id })
      );
    });

    this.store$.select(BookStoreSelectors.getSelectedBook).subscribe((book) => {
      this.form.patchValue(book as any);
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    const model = this.form.getRawValue() as any;
    const book = {
      id: this.id,
      ...model,
    };
    this.store$.dispatch(BookStoreActions.updateRequestAction({ item: book }));
  }
}
