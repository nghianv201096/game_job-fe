import { Component, OnInit } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import {
  CandidateDto
} from 'src/app/models/users/user-by-role.dto';
import { CommonService } from 'src/app/services/common.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidateListComponent implements OnInit {
  users: CandidateDto[] = [];
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
    var getEmployers = this.userService.ViewCandidates();
    var getJobSummaryForCanidates =
      this.jobService.viewJobSummaryForCandidates();
    forkJoin([getEmployers, getJobSummaryForCanidates])
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
