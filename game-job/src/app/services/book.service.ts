import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BookDto } from '../models/books/book.dto';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.dto';

@Injectable({
  providedIn: 'root',
})
export class BookService {
    apiUrl: string = `${environment.baseUrl}/book`;

  constructor(private http: HttpClient) {}

  // CREATE
  createBook(book: BookDto): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.apiUrl}`, book);
  }

  // READ
  getBooks(bookName = ''): Observable<ApiResponse<BookDto[]>> {
    return this.http.get<ApiResponse<BookDto[]>>(`${this.apiUrl}?name=${bookName}`);
  }

  getBookById(id: number): Observable<ApiResponse<BookDto>> {
    return this.http.get<ApiResponse<BookDto>>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateBook(id: number, book: BookDto): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.apiUrl}/${id}`, book);
  }

  // DELETE
  deleteBook(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.apiUrl}/${id}`);
  }
}
