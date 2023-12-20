import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RoleEnum } from 'src/app/enums/role.enum';
import {
  RegisterReqDto,
} from 'src/app/models/authentication/login-req.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  candidateRole = RoleEnum.Candidate;
  employerRole = RoleEnum.Employer;
  user: RegisterReqDto = {
    email: '',
    password: '',
    reenterPassword: '',
    role: RoleEnum.Employer.id,
    fullname: ''
  };

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  registerUser() {
    this.authService.register(this.user).subscribe({
      next: (rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Đăng ký thành công!',
          });
          this.router.navigate(['/dang-nhap']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Đăng ký lỗi',
            detail: rs.message,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Đăng ký lỗi',
          detail: error,
        });
      },
    });
  }
}
