import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import {
  JobApplyStatusEnum,
  JobApplyStatusForCandidateEnum,
  JobApplyStatusForEmployerEnum,
} from 'src/app/enums/job-apply-status.enum';
import { ApplicationDto } from 'src/app/models/applications/application.dto';
import { UserProfileDto } from 'src/app/models/authentication/user-menu.dto';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-job-apply-list',
  templateUrl: './job-apply-list.component.html',
  styleUrls: ['./job-apply-list.component.css'],
})
export class JobApplyListComponent implements OnInit {
  applications: ApplicationDto[] = [];
  statuses = JobApplyStatusEnum.All;
  user?: UserProfileDto | null;

  constructor(
    private applicationService: ApplicationService,
    private commonService: CommonService,
    private authenService: AuthenticationService
  ) {
    this.user = this.authenService.getUserInfo();
    this.statuses = this.user?.isEmployer()
      ? JobApplyStatusForEmployerEnum.All
      : this.user?.isCandidate()
      ? JobApplyStatusForCandidateEnum.All
      : JobApplyStatusEnum.All;
  }
  ngOnInit(): void {
    this.getData();
  }
  reload() {
    this.getData();
  }

  getData() {
    this.commonService.showLoading();
    this.applicationService
      .viewApplications({})
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success && rs.data) {
          this.applications = rs.data;
        }
      });
  }
}
