import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JobDto } from 'src/app/models/jobs/job.dto';
import { JobService } from 'src/app/services/job.service';
import { JobAutocompleteComponent } from '../job-autocomplete/job-autocomplete.component';
import { CommonService } from 'src/app/services/common.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  @ViewChild(JobAutocompleteComponent)
  autocompleteSearch!: JobAutocompleteComponent;

  jobs: JobDto[] = [];

  constructor(
    private jobService: JobService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getData({});
  }

  getData(searchData: any) {
    this.commonService.showLoading();
    this.jobService
      .getJobs(searchData)
      .pipe(finalize(() => {
        this.commonService.hideLoading();
      }))
      .subscribe((rs) => {
        this.jobs = rs.data ?? [];
      });
  }

  search(searchData: any) {
    this.getData(searchData);
  }

  copyToClipboard(job: JobDto) {}

  createJob() {
    this.commonService.showNotImplement();
  }
}
