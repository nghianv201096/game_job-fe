import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';
import { finalize } from 'rxjs';
import { JobApplyStatusEnum, JobApplyStatusForCandidateEnum, JobApplyStatusForEmployerEnum } from 'src/app/enums/job-apply-status.enum';
import { ApplicationDto } from 'src/app/models/applications/application.dto';
import { UserProfileDto } from 'src/app/models/authentication/user-menu.dto';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-job-apply-upsert',
  templateUrl: './job-apply-upsert.component.html',
  styleUrls: ['./job-apply-upsert.component.css'],
})
export class JobApplyUpsertComponent implements OnInit {
  statuses: JobApplyStatusEnum[] = JobApplyStatusEnum.All;
  application!: ApplicationDto;

  id: number = 0;
  jobId!: number;
  isAddNew: boolean = true;
  form!: FormGroup;
  user?: UserProfileDto | null;
  cvFile?: File | null;

  isWatingAdminDecision: boolean = false;
  isWatingEmployerDecision: boolean = false;
  isCandidateCanCancel = false;

  msg: string = '';
  msgClass = '';

  constructor(
    private applicationService: ApplicationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenService: AuthenticationService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      candidateFullName: [{ value: '', disabled: true }],
      candidateEmail: [{ value: '', disabled: true }],
      jobCode: [{ value: '', disabled: true }],
      jobTitle: [{ value: '', disabled: true }],
      employerEmail: [{ value: '', disabled: true }],
      employerFullName: [{ value: '', disabled: true }],
      status: [{ value: null, disabled: true }, Validators.required],
      coverLetter: [
        { value: '', disabled: !this.isAddNew },
        Validators.required,
      ],
      rejectReason: [{ value: '', disabled: true }, Validators.required],
      createdDate: [null, Validators.required],
    });
    this.user = this.authenService.getUserInfo();
    this.statuses = this.user?.isEmployer()
      ? JobApplyStatusForEmployerEnum.All
      : this.user?.isCandidate()
        ? JobApplyStatusForCandidateEnum.All
        : JobApplyStatusEnum.All;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((rs) => {
      this.id = rs['id'];
      this.isAddNew = !(this.id > 0);
      this.jobId = rs['jobId'];
      this.getData();
    });
  }

  getData() {
    this.commonService.showLoading();
    if (this.isAddNew) {
      this.applicationService
        .viewApplicationForCreate(this.jobId)
        .pipe(
          finalize(() => {
            this.commonService.hideLoading();
          })
        )
        .subscribe((rs) => {
          if (rs.success && rs.data) {
            this.application = rs.data;
            this.form.patchValue(rs.data);
          }
        });
    } else {
      this.applicationService
        .viewApplication(this.id)
        .pipe(
          finalize(() => {
            this.commonService.hideLoading();
          })
        )
        .subscribe((rs) => {
          if (rs.success && rs.data) {
            this.application = rs.data;
            this.formMessage();
            this.form.patchValue(rs.data);

            this.isWatingAdminDecision =
              this.application.status == JobApplyStatusEnum.AdminWaiting.id &&
              (this.user?.isAdmin() ?? false);
            this.isWatingEmployerDecision =
              this.application.status == JobApplyStatusEnum.EmployerWating.id &&
              (this.user?.isEmployer() ?? false);
            this.isCandidateCanCancel =
              (this.application.status == JobApplyStatusEnum.AdminWaiting.id ||
                this.application.status ==
                  JobApplyStatusEnum.EmployerWating.id) &&
              (this.application.candidateId == this.user?.id ?? false);
          }
        });
    }
  }

  formMessage() {
    if (this.user?.id != this.application.candidateId) {
      return;
    }
    
    if (this.application.status == JobApplyStatusEnum.EmployerApprove.id) {
      this.msg =
        'Chúc mừng bạn, Nhà tuyển dụng đã chấp nhận thư ứng tuyển và sẽ sớm liên hệ bạn.';
      this.msgClass = 'alert-success';
    } else if (
      this.application.status == JobApplyStatusEnum.EmployerReject.id ||
      this.application.status == JobApplyStatusEnum.AdminReject.id
    ) {
      this.msg = 'Rất tiếc, CV của bạn chưa phù hợp tiêu chí tuyển dụng.';
      this.msgClass = 'alert-warning';
    } else {
      this.msg = 'CV của bạn đang trong quá trình xử lý.';
      this.msgClass = 'alert-info';
    }
  }

  onSelect($event: FileSelectEvent) {
    if ($event.files.length) {
      this.cvFile = $event.files[0];
    } else {
      this.cvFile = null;
    }
  }

  onClear() {
    this.cvFile = null;
  }

  onDownload() {}

  hasRejectReason() {
    return this.application && this.application.rejectReason;
  }

  save() {
    var data = this.form.getRawValue();
    var coverLetter = data['coverLetter'];
    if (!this.cvFile || !coverLetter) {
      this.messageService.add({
        severity: 'error',
        detail: 'Chưa chọn CV hoặc điền lời giới thiệu',
      });
      return;
    }

    var formData = new FormData();
    formData.append('cvFile', this.cvFile);
    formData.append('jobId', this.jobId.toString());
    formData.append('coverLetter', data['coverLetter']);
    this.commonService.showLoading();
    this.applicationService
      .createApplication(formData)
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Ứng tuyển thành công',
          });
          this.router.navigate(['/ung-tuyen', 'chi-tiet', this.jobId, rs.data]);
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }

  approveForAdmin() {
    this.commonService.showLoading();
    this.applicationService
      .approveApplicationForAdmin({ id: this.id })
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Duyệt ứng tuyển thành công',
          });
          this.getData();
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }

  rejectForAdmin() {
    this.commonService.showLoading();
    this.applicationService
      .rejectApplicationForAdmin({ id: this.id })
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Từ chối ứng tuyển thành công',
          });
          this.getData();
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }

  approveForEmployer() {
    this.commonService.showLoading();
    this.applicationService
      .approveApplicationForEmployer({ id: this.id })
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Duyệt ứng tuyển thành công',
          });
          this.getData();
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }

  rejectForEmployer() {
    this.commonService.showLoading();
    this.applicationService
      .rejectApplicationForEmployer({ id: this.id })
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Từ chối ứng tuyển thành công',
          });
          this.getData();
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }

  cancel() {
    this.commonService.showLoading();
    this.applicationService
      .CancelApplication({ id: this.id })
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Huỷ bỏ ứng tuyển thành công',
          });
          this.getData();
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }
}
