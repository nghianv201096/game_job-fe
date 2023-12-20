import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MethodResult } from '../models/api-response.dto';
import { JobDto } from '../models/jobs/job.dto';
import { JobDetailDto } from '../models/jobs/job-detail.dto';
import { JobUpsertDto } from '../models/jobs/job-upsert.dto';
import { JobManagementDto } from '../models/jobs/job-management.dto';
import { JobSummaryForEmployerDto } from '../models/jobs/job-summary-for-employer.dto';
import { JobSummaryForCandidateDto } from '../models/jobs/job-summary-for-candidate.dto';

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

  getJobsForManangement(): Observable<MethodResult<JobManagementDto[]>> {
    return this.http.get<MethodResult<JobManagementDto[]>>(
      `${this.apiUrl}/ViewJobsForManangement`
    );
  }

  viewJobSummaryForEmployers(): Observable<MethodResult<JobSummaryForEmployerDto[]>> {
    return this.http.get<MethodResult<JobSummaryForEmployerDto[]>>(
      `${this.apiUrl}/ViewJobSummaryForEmployers`
    );
  }

  viewJobSummaryForCandidates(): Observable<MethodResult<JobSummaryForCandidateDto[]>> {
    return this.http.get<MethodResult<JobSummaryForCandidateDto[]>>(
      `${this.apiUrl}/ViewJobSummaryForCandidates`
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

  submitJob(id: number): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/SubmitJob/${id}`,
      {}
    );
  }

  hideJob(id: number): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/HideJob/${id}`,
      {}
    );
  }

  approveJob(id: number, model: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/ApproveJob/${id}`,
      model
    );
  }
}
