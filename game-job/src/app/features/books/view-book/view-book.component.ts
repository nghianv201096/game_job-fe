import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BookTypeEnum } from 'src/app/enums/book-type.enum';
import { BookDto } from 'src/app/models/books/book.dto';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
})
export class ViewBookComponent implements OnInit {
  book: BookDto = new BookDto();
  id!: number;
  types = BookTypeEnum.All;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.loadData();
    });
  }

  loadData() {
    this.bookService.getBookById(this.id).subscribe((data) => {
      if (data.isSuccessful && data.data) {
        this.book = data.data;
      }
    });
  }

  delete(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure want to delete this book?',
      accept: () => {
        // this.overlayService.showOverlay();
        this.bookService.deleteBook(id).subscribe((rs) => {
          // this.overlayService.hideOverlay();
          if (rs.isSuccessful) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Delete book successfully!',
            });

            this.router.navigate(['/books']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: rs.message,
            });
          }
        });
      },
    });
  }
}
