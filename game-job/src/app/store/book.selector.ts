import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { BookState } from './book.state';

const BookFeature = (state: AppState) => {
  return state.bookStore;
};

export const getBooks = createSelector(
  BookFeature,
  (state: BookState) => state.books
);

export const getBook = createSelector(
  BookFeature,
  (state: BookState, id: number) => state.books.filter((x) => x.id === id)
);

export const getSelectedBook = createSelector(
  BookFeature,
  (state: BookState) => state.selectedBook
);

export const getBookIsLoading = createSelector(
  BookFeature,
  (state: BookState) => state.isLoading
);
