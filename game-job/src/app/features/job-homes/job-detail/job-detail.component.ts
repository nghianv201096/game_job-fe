import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { catchError, finalize, forkJoin } from 'rxjs';
import { JobStatusEnum } from 'src/app/enums/job-status.enum';
import { MethodResult } from 'src/app/models/api-response.dto';
import { CandidateJobDetail } from 'src/app/models/authentication/candidate-job-detail.dto';
import { CreatorJobDetail } from 'src/app/models/authentication/creator-job-detail.dto';
import { UserProfileDto } from 'src/app/models/authentication/user-menu.dto';
import { JobDetailDto } from 'src/app/models/jobs/job-detail.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  user: UserProfileDto | null;

  showApprove: boolean = false;
  approveModel: any = {
    fromDate: new Date(),
    duration: 10,
    isHotJob: true,
  };

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private commonService: CommonService,
    private authenService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.commonService.showLoading();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getData();
    });
    this.activatedRoute.data.subscribe((rs) => {
      this.isPreview = rs['isPreview'];
    });
    this.user = this.authenService.getUserInfo();
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
          const getCandidateInfo = this.userService.getCandiateJobDetail(this.id);
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

  like() {
    this.commonService.showNotImplement();
  }

  canSubmit() {
    return (
      this.isPreview &&
      this.job &&
      this.job.status == JobStatusEnum.New.id &&
      this.user &&
      (this.user.isAdmin() || (this.creator && this.creator.id == this.user.id))
    );
  }

  canHide() {
    return (
      this.isPreview &&
      this.job &&
      this.job.status == JobStatusEnum.Approve.id &&
      this.user &&
      (this.user.isAdmin() || (this.creator && this.creator.id == this.user.id))
    );
  }

  canApprove() {
    return (
      this.isPreview &&
      this.job &&
      this.job.status == JobStatusEnum.Waiting.id &&
      this.user &&
      this.user.isAdmin()
    );
  }

  submit() {
    this.confirmationService.confirm({
      header: 'Trình đăng tin tuyển dụng',
      message: 'Bạn có chắc muốn trình đăng tin tuyển dụng này?',
      acceptLabel: 'Có',
      acceptButtonStyleClass: 'btn btn-success',
      rejectLabel: 'Không',
      rejectButtonStyleClass: 'btn btn-default me-2',
      accept: () => {
        this.commonService.showLoading();
        this.jobService
          .submitJob(this.job.id)
          .pipe(
            finalize(() => {
              this.commonService.hideLoading();
            })
          )
          .subscribe((rs) => {
            if (rs.success) {
              this.messageService.add({
                severity: 'success',
                detail: 'Trình đăng tin tuyển dụng thành công!',
              });
              this.getData();
            } else {
              this.messageService.add({
                severity: 'error',
                detail: rs.message,
              });
            }
          });
      },
    });
  }

  hide() {
    this.confirmationService.confirm({
      header: 'Gỡ tin tuyển dụng',
      message: 'Bạn có chắc muốn gỡ tin tuyển dụng này?',
      acceptLabel: 'Có',
      acceptButtonStyleClass: 'btn btn-success',
      rejectLabel: 'Không',
      rejectButtonStyleClass: 'btn btn-default me-2',
      accept: () => {
        this.commonService.showLoading();
        this.jobService
          .hideJob(this.job.id)
          .pipe(
            finalize(() => {
              this.commonService.hideLoading();
            })
          )
          .subscribe((rs) => {
            if (rs.success) {
              this.messageService.add({
                severity: 'success',
                detail: 'Gỡ tin tuyển dụng thành công!',
              });
              this.getData();
            } else {
              this.messageService.add({
                severity: 'error',
                detail: rs.message,
              });
            }
          });
      },
    });
  }

  displayApprove() {
    this.showApprove = true;
  }

  closeApprove() {
    this.showApprove = false;
  }

  approve() {
    this.commonService.showLoading();

    this.jobService
      .approveJob(this.job.id, this.approveModel)
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Duyệt đăng tin tuyển dụng thành công!',
          });
          this.getData();
          this.closeApprove();
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }
}
