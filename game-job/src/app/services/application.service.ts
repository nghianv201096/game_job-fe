import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MethodResult } from '../models/api-response.dto';
import { ApplicationDto } from '../models/applications/application.dto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  apiUrl: string = `${environment.baseUrl}/Application`;

  constructor(private http: HttpClient) {}

  viewApplications(model: any): Observable<MethodResult<ApplicationDto[]>> {
    return this.http.post<MethodResult<ApplicationDto[]>>(
      `${this.apiUrl}/ViewApplications`,
      model
    );
  }

  viewApplication(id: number): Observable<MethodResult<ApplicationDto>> {
    return this.http.get<MethodResult<ApplicationDto>>(
      `${this.apiUrl}/ViewApplication/${id}`
    );
  }

  viewApplicationForCreate(id: number): Observable<MethodResult<ApplicationDto>> {
    return this.http.get<MethodResult<ApplicationDto>>(
      `${this.apiUrl}/ViewApplicationForCreate/${id}`
    );
  }

  createApplication(model: any): Observable<MethodResult<number>> {
    return this.http.post<MethodResult<number>>(
      `${this.apiUrl}/CreateApplication`,
      model
    );
  }
  approveApplicationForEmployer(model: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/ApproveApplicationForEmployer`,
      model
    );
  }

  rejectApplicationForEmployer(model: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/RejectApplicationForEmployer`,
      model
    );
  }

  approveApplicationForAdmin(model: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/ApproveApplicationForAdmin`,
      model
    );
  }

  rejectApplicationForAdmin(model: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/RejectApplicationForAdmin`,
      model
    );
  }

  CancelApplication(model: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/CancelApplication`,
      model
    );
  }
}
