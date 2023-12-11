import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BookTypeEnum } from 'src/app/enums/book-type.enum';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent {
  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private messageService: MessageService
  ) {}

  types = BookTypeEnum.All;

  form = this.fb.group({
    name: ['', Validators.required],
    type: [BookTypeEnum.ProgrammingBook.code, 
      Validators.required],
    author: ['', Validators.required],
    locked: [false, Validators.required],
  });

  save() {
    if (!this.form.valid) {
      return;
    }

    const model = this.form.getRawValue();
    this.bookService.createBook(model as any).subscribe((data) => {
      if (data.isSuccessful) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Create book successfully!',
        });
        this.router.navigate(['/books', 'view', data.data]);
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
