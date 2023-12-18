import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { JobStatusEnum } from 'src/app/enums/job-status.enum';
import { JobManagementDto } from 'src/app/models/jobs/job-management.dto';
import { CommonService } from 'src/app/services/common.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-management-list',
  templateUrl: './job-management-list.component.html',
  styleUrls: ['./job-management-list.component.css'],
})
export class JobManagementListComponent implements OnInit {
  jobs: JobManagementDto[] = [];
  statuses = JobStatusEnum.All;

  constructor(
    private jobService: JobService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.commonService.showLoading();
    this.jobService
      .getJobsForManangement()
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success && rs.data) {
          this.jobs = rs.data;
        }
      });
  }

  reload() {
    this.getData();
  }
}
