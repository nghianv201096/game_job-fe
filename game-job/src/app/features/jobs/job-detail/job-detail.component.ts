import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import { MethodResult } from 'src/app/models/api-response.dto';
import { CandidateJobDetail } from 'src/app/models/authentication/candidate-job-detail.dto';
import { CreatorJobDetail } from 'src/app/models/authentication/creator-job-detail.dto';
import { JobDetailDto } from 'src/app/models/jobs/job-detail.dto';
import { CommonService } from 'src/app/services/common.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent {
  id!: number;
  isPreview: boolean = false;

  job!: JobDetailDto;
  creator!: CreatorJobDetail;
  candidate!: CandidateJobDetail;
  FileHelper: any;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private commonService: CommonService
  ) {
    this.commonService.showLoading();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getData();
    });
  }

  getData() {
    this.commonService.showLoading();
    if (!this.id) {
      this.job = new JobDetailDto();
      this.creator = new CreatorJobDetail();
      this.candidate = new CandidateJobDetail();
    } else {
      this.jobService.getJob(this.id).subscribe((rs) => {
        if (rs.success && rs.data) {
          this.job = rs.data;

          const getCreatorObservable = this.userService.getCreatorJobDetail(
            this.job.createdBy
          );
          const getCandidateInfo = this.userService.getCandiateJobDetail();
          forkJoin([getCreatorObservable, getCandidateInfo])
            .pipe(
              finalize(() => {
                setTimeout(() => {
                  this.commonService.hideLoading();
                }, 200);
              })
            )
            .subscribe(([creatorRs, candidateRs]) => {
              this.setCreatorInfo(creatorRs);
              this.setCandidateInfo(candidateRs);
            });
        }
      });
    }
  }

  setCreatorInfo(rs: MethodResult<CreatorJobDetail>) {
    if (rs.success && rs.data) {
      this.creator = rs.data;
    }
  }

  setCandidateInfo(rs: MethodResult<CandidateJobDetail>) {
    if (rs.success && rs.data) {
      this.candidate = rs.data;
    }
  }

  back() {
    this.location.back();
  }

  apply() {
    this.commonService.showNotImplement();
  }

  like() {
    this.commonService.showNotImplement();
  }
}
