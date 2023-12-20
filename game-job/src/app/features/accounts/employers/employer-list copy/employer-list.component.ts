import { Component, OnInit } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import {
  EmployerDto,
  UserByRoleDto,
} from 'src/app/models/users/user-by-role.dto';
import { CommonService } from 'src/app/services/common.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css'],
})
export class EmployerListComponent implements OnInit {
  users: EmployerDto[] = [];
  /**
   *
   */
  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.commonService.showLoading();
    var getEmployers = this.userService.ViewEmployers();
    var getJobSummaryForEmployers =
      this.jobService.viewJobSummaryForEmployers();
    forkJoin([getEmployers, getJobSummaryForEmployers])
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe(([employers, summaries]) => {
        if (
          employers.success &&
          employers.data &&
          summaries.success &&
          summaries.data
        ) {
          this.users = [];
          for (var i = 0; i < employers.data.length; i++) {
            const user = employers.data[i];
            const summary = summaries.data.find((i) => i.userId == user.id);
            this.users.push({
              id: user.id,
              email: user.email,
              fullName: user.fullName,
              phoneNumber: user.phoneNumber,
              summary: summary,
            });
          }
        }
      });
  }

  reload() {
    this.getData();
  }
}
