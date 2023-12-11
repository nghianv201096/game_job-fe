import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { BookService } from '../services/book.service';
import * as bookActions from './book.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';

@Injectable()
export class BookStoreEffects {
  constructor(
    private dataService: BookService,
    private actions$: Actions,
    private messageService: MessageService
  ) {}

  loadBookRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBookRequestAction),
      switchMap((action) => {
        return this.dataService.getBookById(action.id).pipe(
          map((rs) => {
            // todo: handle error.
            if (!rs.isSuccessful || !rs.data) {
              throw new Error(rs.message);
            }

            return bookActions.loadBookSuccessAction({ book: rs.data });
          }),
          catchError((error: any) => {
            return observableOf(bookActions.loadBookFailureAction({ error }));
          })
        );
      })
    )
  );

  loadRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadRequestAction),
      switchMap((action) => {
        return this.dataService.getBooks().pipe(
          map((rs) => {
            if (!rs.isSuccessful || !rs.data) {
              throw new Error(rs.message);
            }

            return bookActions.loadSuccessAction({ items: rs.data || [] });
          }),
          catchError((error) => {
            return observableOf(bookActions.loadFailureAction({ error }));
          })
        );
      })
    )
  );

  saveRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.saveRequestAction),
      switchMap((action) => {
        return this.dataService.createBook(action.item).pipe(
          map((rs: any) => {
            if (!rs.isSuccessful) {
              throw new Error(rs.message);
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Create book successfully!',
            });

            const book = {
              ...action.item,
              id: rs.data,
            };
            return bookActions.saveSuccessAction({
              book,
            });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Fail',
              detail: error,
            });

            return observableOf(bookActions.saveFailureAction({ error }));
          })
        );
      })
    )
  );

  updateRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.updateRequestAction),
      switchMap((action) => {
        return this.dataService.updateBook(action.item.id, action.item).pipe(
          map((rs) => {
            if (!rs.isSuccessful) {
              throw new Error(rs.message);
            }

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Update book successfully!',
            });

            return bookActions.updateSuccessAction({ book: action.item });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Fail',
              detail: error,
            });

            return observableOf(bookActions.updateFailureAction({ error }));
          })
        );
      })
    )
  );

  deleteRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.deleteRequestAction),
      switchMap((action) => {
        return this.dataService.deleteBook(action.id).pipe(
          map((rs) => {
            if (!rs.isSuccessful) {
              throw new Error(rs.message);
            }

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Delete book successfully!',
            });

            return bookActions.deleteSuccessAction({ id: action.id });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Fail',
              detail: error,
            });
            return observableOf(bookActions.deleteFailureAction({ error }));
          })
        );
      })
    )
  );
}
