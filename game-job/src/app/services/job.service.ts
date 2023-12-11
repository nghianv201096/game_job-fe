import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MethodResult } from '../models/api-response.dto';
import { JobDto } from '../models/jobs/job.dto';
import { JobDetailDto } from '../models/jobs/job-detail.dto';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  apiUrl: string = `${environment.baseUrl}/Job`;

  constructor(private http: HttpClient) {}

  getJobs(model: any): Observable<MethodResult<JobDto[]>> {
    return this.http.post<MethodResult<JobDto[]>>(
      `${this.apiUrl}/ViewJobs`,
      model
    );
  }

  getJob(id: number): Observable<MethodResult<JobDetailDto>> {
    return this.http.get<MethodResult<JobDetailDto>>(
      `${this.apiUrl}/ViewJob/${id}`
    );
  }

  getRelatedJobs(id: number): Observable<MethodResult<JobDto[]>> {
    return this.http.get<MethodResult<JobDto[]>>(
      `${this.apiUrl}/ViewRelatedJobs/${id}`
    );
  }
}
