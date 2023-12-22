import { Injectable, OnDestroy } from '@angular/core';
import { UserDto } from '../models/authentication/user.dto';
import {
  LoginReqDto,
  LoginResDto,
  RegisterReqDto,
} from '../models/authentication/login-req.dto';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { ApiResponse, MethodResult } from '../models/api-response.dto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserProfileDto } from '../models/authentication/user-menu.dto';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private commonService: CommonService
  ) {}

  apiUrl = `${environment.baseUrl}/account`;
  TOKEN_NAME = 'Token';
  USER_INFO = 'UserInfo';

  private authChangeSub = new ReplaySubject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  timoutId: any = null;

  login(model: LoginReqDto): Observable<LoginResDto> {
    const url = `${this.apiUrl}/login`;

    return this.http.post<LoginResDto>(url, model).pipe(
      tap((loginRs) => {
        if (!!loginRs.accessToken) {
          localStorage.setItem(
            this.TOKEN_NAME,
            `${loginRs.tokenType} ${loginRs.accessToken}`
          );
          this.http
            .get<MethodResult<UserProfileDto>>(
              `${environment.baseUrl}/User/ViewUserProfile`
            )
            .subscribe((profileRs) => {
              if (profileRs.success) {
                localStorage.setItem(
                  this.USER_INFO,
                  JSON.stringify(profileRs.data)
                );
              }
            });
        } else {
          this.resetUserProfile();
        }
      }),
      catchError((err) => {
        this.resetUserProfile();

        throw err;
      })
    );
  }

  loginAndGetUserProfile(
    loginReq: LoginReqDto
  ): Observable<MethodResult<UserProfileDto>> {
    this.commonService.showLoading();
    return this.http.post<LoginResDto>(`${this.apiUrl}/login`, loginReq).pipe(
      switchMap((loginResponse) => {
        if (!loginResponse || !loginResponse.accessToken) {
          this.commonService.hideLoading();
          return throwError('Đăng nhập không thành công!');
        }

        return this.http
          .get<MethodResult<UserProfileDto>>(
            `${environment.baseUrl}/User/ViewUserProfile`,
            {
              headers: {
                Authorization: `${loginResponse.tokenType} ${loginResponse.accessToken}`,
              },
            }
          )
          .pipe(
            tap((userProfileRs) => {
              this.commonService.hideLoading();
              if (userProfileRs.success) {
                localStorage.setItem(
                  this.TOKEN_NAME,
                  `${loginResponse.tokenType} ${loginResponse.accessToken}`
                );

                localStorage.setItem(
                  this.USER_INFO,
                  JSON.stringify(userProfileRs.data)
                );

                this.authChangeSub.next(true);
              } else {
                this.resetUserProfile();
                throw Error('Lấy thông tin đăng nhập thất bại!');
              }
            })
          );
      }),
      catchError((error) => {
        this.commonService.hideLoading();
        this.resetUserProfile();
        return throwError('Đăng nhập không thành công!');
      })
    );
  }

  register(model: RegisterReqDto) {
    return this.http.post<MethodResult<string>>(
      `${environment.baseUrl}/user/register`,
      model
    );
  }

  private resetUserProfile() {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.USER_INFO);
    this.authChangeSub.next(false);
  }

  logout() {
    this.resetUserProfile();
    this.messageService.add({
      severity: 'success',
      detail: 'Đăng xuất thành công!',
    });
    this.router.navigate(['/']);
  }

  public setAuthenticationInfo(loginResDto: LoginResDto | undefined) {
    const isAuthenticated = !!loginResDto;
    localStorage.setItem(
      this.TOKEN_NAME,
      isAuthenticated ? `Bearer ${loginResDto?.accessToken}` : ''
    );

    this.authChangeSub.next(isAuthenticated);
  }

  public getAuthorizationToken(): string {
    return localStorage.getItem(this.TOKEN_NAME) ?? '';
  }

  public getUserInfo(): UserProfileDto | null {
    const user = localStorage.getItem(this.USER_INFO);
    if (!user) {
      return null;
    } else {
      const userParsed = JSON.parse(user) as any;
      if (!userParsed) {
        return null;
      }

      return new UserProfileDto(
        userParsed.id,
        userParsed.fullName,
        userParsed.email,
        userParsed.phoneNumber,
        userParsed.roles
      );
    }
  }

  public autoLogin(): void {
    const token = this.getAuthorizationToken();
    const user = this.getUserInfo();

    if (!!token) {
      this.autoLogout();
    }

    this.authChangeSub.next(!!token);
  }

  public autoLogout() {
    return;
    const remainTime = this.decodeToken(this.getAuthorizationToken());
    if (this.timoutId) {
      clearTimeout(this.timoutId);
    }

    this.timoutId = setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Logout',
        detail: 'Session is expired!',
      });

      this.setAuthenticationInfo(undefined);
      this.router.navigate(['/home']);
    }, remainTime);
  }

  decodeToken(token: string): number {
    try {
      const val = jwtDecode(token);
      const remainTimeInMs = (val.exp ?? 0) * 1000 - Date.now();

      return remainTimeInMs >= 0 ? remainTimeInMs : 0;
    } catch (error) {
      console.error('Invalid token: ', error);

      return 0;
    }
  }
}
