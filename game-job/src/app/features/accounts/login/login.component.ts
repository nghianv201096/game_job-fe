import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { error } from 'protractor';
import { LoginReqDto } from 'src/app/models/authentication/login-req.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: LoginReqDto = { email: '', password: '' };
  isDevelopment = !environment.production && false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ) {}

  loginUser() {
    this.authService.loginAndGetUserProfile(this.user).subscribe({
      next: (rs) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Đăng nhập thành công!',
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Đăng nhập lỗi',
          detail: error,
        });
      },
    });
  }
}
