import { BookDto } from '../models/books/book.dto';

 
export interface BookState {
  selectedBook: BookDto | undefined,
  selectedBookId: number | undefined,
  books: BookDto[],  
  isLoading: boolean;
}
 
export const initialState: BookState = 
{
    selectedBook: undefined,
    selectedBookId: undefined,
    books: [],  
    isLoading: false
};