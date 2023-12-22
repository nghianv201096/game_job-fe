import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MethodResult } from '../models/api-response.dto';
import { CreatorJobDetail } from '../models/authentication/creator-job-detail.dto';
import { CandidateJobDetail } from '../models/authentication/candidate-job-detail.dto';
import { UserByRoleDto } from '../models/users/user-by-role.dto';
import { UserProfileDto } from '../models/authentication/user-menu.dto';

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

  getCandiateJobDetail(
    jobId: number
  ): Observable<MethodResult<CandidateJobDetail>> {
    return this.http.get<MethodResult<CandidateJobDetail>>(
      `${this.apiUrl}/ViewCandidateJobDetail/${jobId}`
    );
  }

  getUserProfile(): Observable<MethodResult<UserProfileDto>> {
    return this.http.get<MethodResult<UserProfileDto>>(
      `${this.apiUrl}/ViewUserProfile`
    );
  }

  ViewCandidates(): Observable<MethodResult<UserByRoleDto[]>> {
    return this.http.get<MethodResult<UserByRoleDto[]>>(
      `${this.apiUrl}/ViewCandidates`
    );
  }

  ViewEmployers(): Observable<MethodResult<UserByRoleDto[]>> {
    return this.http.get<MethodResult<UserByRoleDto[]>>(
      `${this.apiUrl}/ViewEmployers`
    );
  }

  updateAvatar(data: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/UpdateAvatar`,
      data
    );
  }

  update(data: any): Observable<MethodResult<string>> {
    return this.http.put<MethodResult<string>>(
      `${this.apiUrl}/Update`,
      data
    );
  }
}
