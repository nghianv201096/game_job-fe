import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClassificationClickDto } from '../models/classification/classification.dto';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor() {}

  private classificationChangeSubject = new Subject<ClassificationClickDto>();
  public classificationChanged = this.classificationChangeSubject.asObservable();

  searchClassification(value: ClassificationClickDto) {
    this.classificationChangeSubject.next(value);
  }
}
