import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { UserProfileDto } from 'src/app/models/authentication/user-menu.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user?: UserProfileDto;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.commonService.showLoading();
    this.userService
      .getUserProfile()
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success && rs.data) {
          this.user = rs.data;
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }
}
