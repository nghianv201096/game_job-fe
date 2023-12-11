import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { error } from 'protractor';
import { LoginReqDto } from 'src/app/models/authentication/login-req.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: LoginReqDto = { username: '', password: '' };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ) {}

  loginUser() {
    this.authService.login(this.user).subscribe({
      next: (rs) => {
        if (rs.isSuccessful) {
          this.router.navigate(['/books']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Fail',
            detail: rs.message,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Fail',
          detail: error,
        });
      },
    });
  }
}
