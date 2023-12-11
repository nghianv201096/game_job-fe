import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BookTypeEnum } from 'src/app/enums/book-type.enum';
import { BookDto } from 'src/app/models/books/book.dto';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
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
      this.loadData();
    });
  }

  loadData() {
    this.bookService.getBookById(this.id).subscribe((data) => {
      if (data.isSuccessful && data.data) {
        this.form.patchValue(data.data);
      }
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    const model = this.form.getRawValue();
    this.bookService.updateBook(this.id, model as any).subscribe((data) => {
      if (data.isSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update book successfully!',
        });

        this.router.navigate(['/books', 'view', this.id]);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: data.message,
        });
      }
    });
  }
}
