import { initialState } from './book.state';
import { createReducer, on } from '@ngrx/store';
import * as BookActionTypes from './book.actions';

export const bookReducer = createReducer(
  initialState,
  on(BookActionTypes.loadBookRequestAction, (state, { id }) => ({
    ...state,
    isLoading: true,
  })),

  on(BookActionTypes.loadBookSuccessAction, (state, { book }) => ({
    ...state,
    isLoading: false,
    selectedBook: book,
  })),

  on(BookActionTypes.loadBookFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
  })),

  on(BookActionTypes.loadRequestAction, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(BookActionTypes.loadSuccessAction, (state, { items }) => ({
    ...state,
    isLoading: false,
    books: items,
  })),

  on(BookActionTypes.loadFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
  })),

  on(BookActionTypes.saveRequestAction, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(BookActionTypes.saveSuccessAction, (state, { book }) => ({
    ...state,
    // todo: add book to list
    isLoading: false,
  })),

  on(BookActionTypes.saveFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
  })),

  on(BookActionTypes.updateRequestAction, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(BookActionTypes.updateSuccessAction, (state, { book }) => ({
    ...state,
    isLoading: false,
  })),

  on(BookActionTypes.updateFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
  })),

  on(BookActionTypes.deleteRequestAction, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(BookActionTypes.deleteSuccessAction, (state, { id }) => ({
    ...state,
    isLoading: false,
    books: state.books.filter((x) => x.id != id),
  })),

  on(BookActionTypes.deleteFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
  }))
);
