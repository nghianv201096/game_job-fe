import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MethodResult } from '../models/api-response.dto';
import { JobDto } from '../models/jobs/job.dto';
import { JobDetailDto } from '../models/jobs/job-detail.dto';
import { JobUpsertDto } from '../models/jobs/job-upsert.dto';

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

  getJobForUpsert(id: number): Observable<MethodResult<JobUpsertDto>> {
    return this.http.get<MethodResult<JobUpsertDto>>(
      `${this.apiUrl}/ViewJobForUpsert/${id}`
    );
  }

  getRelatedJobs(id: number): Observable<MethodResult<JobDto[]>> {
    return this.http.get<MethodResult<JobDto[]>>(
      `${this.apiUrl}/ViewRelatedJobs/${id}`
    );
  }

  createJob(model: any): Observable<MethodResult<number>> {
    return this.http.post<MethodResult<number>>(
      `${this.apiUrl}/CreateJob`,
      model
    );
  }

  updateJob(id: number, model: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/UpdateJob/${id}`,
      model
    );
  }

  deleteJob(id: number): Observable<MethodResult<string>> {
    return this.http.delete<MethodResult<string>>(
      `${this.apiUrl}/deleteJob/${id}`
    );
  }
}
