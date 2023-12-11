import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MethodResult } from '../models/api-response.dto';
import { ClassificationDto } from '../models/classification/classification.dto';
import { ClassificationSourceDto } from '../models/classification/classification-source.dto';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  apiUrl: string = `${environment.baseUrl}/Classification`;

  constructor(private http: HttpClient) {}

  getClassifications(): Observable<MethodResult<ClassificationDto[]>> {
    return this.http.get<MethodResult<ClassificationDto[]>>(
      `${this.apiUrl}/GetClassifications`
    );
  }

  getClassificationSources(): Observable<
    MethodResult<ClassificationSourceDto[]>
  > {
    return this.http.get<MethodResult<ClassificationSourceDto[]>>(
      `${this.apiUrl}/GetClassificationSources`
    );
  }
}
