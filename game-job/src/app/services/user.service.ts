import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MethodResult } from '../models/api-response.dto';
import { CreatorJobDetail } from '../models/authentication/creator-job-detail.dto';
import { CandidateJobDetail } from '../models/authentication/candidate-job-detail.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = `${environment.baseUrl}/User`;

  constructor(private http: HttpClient) {}

  getCreatorJobDetail(id: number): Observable<MethodResult<CreatorJobDetail>> {
    return this.http.get<MethodResult<CreatorJobDetail>>(
      `${this.apiUrl}/ViewCreatorJobDetail/${id}`
    );
  }

  getCandiateJobDetail(): Observable<MethodResult<CandidateJobDetail>> {
    return this.http.get<MethodResult<CandidateJobDetail>>(
      `${this.apiUrl}/ViewCandidateJobDetail`
    );
  }
}
