import { Action, createAction, props } from '@ngrx/store';
import { BookDto } from '../models/books/book.dto';

export enum ActionTypes {
  LOAD_BOOK_REQUEST = '[Book] Load A Book Request',
  LOAD_BOOK_FAILURE = '[Book] Load A Book Failure',
  LOAD_BOOK_SUCCESS = '[Book] Load A Book Success',

  LOAD_REQUEST = '[Book] Load Request',
  LOAD_FAILURE = '[Book] Load Failure',
  LOAD_SUCCESS = '[Book] Load Success',

  SAVE_REQUEST = '[Book] Save',
  SAVE_FAILURE = '[Book] Save Failure',
  SAVE_SUCCESS = '[Book] Save Success',

  UPDATE_REQUEST = '[Book] Update',
  UPDATE_FAILURE = '[Book] Update Failure',
  UPDATE_SUCCESS = '[Book] Update Success',

  DELETE_REQUEST = '[Book] Delete',
  DELETE_FAILURE = '[Book] Delete Failure',
  DELETE_SUCCESS = '[Book] Delete Success',
}

export const loadBookRequestAction = createAction(
  ActionTypes.LOAD_BOOK_REQUEST,
  props<{ id: number }>()
);

export const loadBookSuccessAction = createAction(
  ActionTypes.LOAD_BOOK_SUCCESS,
  props<{ book: BookDto }>()
);

export const loadBookFailureAction = createAction(
  ActionTypes.LOAD_BOOK_FAILURE,
  props<{ error: string }>()
);

///////

export const loadRequestAction = createAction(ActionTypes.LOAD_REQUEST);

export const loadSuccessAction = createAction(
  ActionTypes.LOAD_SUCCESS,
  props<{ items: BookDto[] }>()
);

export const loadFailureAction = createAction(
  ActionTypes.LOAD_FAILURE,
  props<{ error: string }>()
);

////////

export const saveRequestAction = createAction(
  ActionTypes.SAVE_REQUEST,
  props<{ item: BookDto }>()
);

export const saveSuccessAction = createAction(
  ActionTypes.SAVE_SUCCESS,
  props<{ book: BookDto }>()
);

export const saveFailureAction = createAction(
  ActionTypes.SAVE_FAILURE,
  props<{ error: string }>()
);

////////

export const updateRequestAction = createAction(
  ActionTypes.UPDATE_REQUEST,
  props<{ item: BookDto }>()
);

export const updateSuccessAction = createAction(
  ActionTypes.UPDATE_SUCCESS,
  props<{ book: BookDto }>()
);

export const updateFailureAction = createAction(
  ActionTypes.UPDATE_FAILURE,
  props<{ error: string }>()
);

////////

export const deleteRequestAction = createAction(
  ActionTypes.DELETE_REQUEST,
  props<{ id: number }>()
);

export const deleteSuccessAction = createAction(
  ActionTypes.DELETE_SUCCESS,
  props<{ id: number }>()
);

export const deleteFailureAction = createAction(
  ActionTypes.DELETE_FAILURE,
  props<{ error: string }>()
);
