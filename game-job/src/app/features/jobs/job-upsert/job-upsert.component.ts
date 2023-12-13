import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassificationSourceDto } from 'src/app/models/classification/classification-source.dto';
import { ClassificationService } from 'src/app/services/classification.service';
import { ClassificationEnum } from '../job-autocomplete/job-autocomplete.component';
import { JobStatusEnum } from 'src/app/enums/job-status.enum';
import { JobService } from 'src/app/services/job.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-job-upsert',
  templateUrl: './job-upsert.component.html',
  styleUrls: ['./job-upsert.component.css'],
})
export class JobUpsertComponent {
  isUpdate!: boolean;
  id!: number;
  title!: string;
  form!: FormGroup;
  categories!: ClassificationSourceDto[];
  locations!: ClassificationSourceDto[];
  jobTypes!: ClassificationSourceDto[];
  skills!: ClassificationSourceDto[];
  statuses: JobStatusEnum[] = JobStatusEnum.All;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private classificationService: ClassificationService,
    private jobService: JobService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private location: Location,
    private commonService: CommonService
  ) {
    this.form = this.formBuilder.group({
      code: [{ value: '', disabled: true }],
      title: ['', Validators.required],
      categoryId: [null, Validators.required],
      locationId: [null, Validators.required],
      jobTypeId: [null, Validators.required],
      skillIds: [[], Validators.required],
      salary: ['', Validators.required],
      status: [{ value: null, disabled: true }, Validators.required],
      introduction: ['', Validators.required],
      description: [
        'Hãy mô tả chi tiết những đầu mục công việc để ứng viên có thể hiểu rõ hơn về yêu cầu của công ty bạn với vị trí này.',
        Validators.required,
      ],
      requirement: ['', Validators.required],
      interests: ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((rs) => {
      this.id = rs['id'];
      this.isUpdate = this.id > 0;
      if (this.isUpdate) {
        this.title = 'Cập nhật tin tuyển dụng';
        this.getData();
      } else {
        this.title = 'Thêm mới tin tuyển dụng';
      }
    });

    this.getDropdownData();
  }

  getData() {
    this.commonService.showLoading();
    this.jobService
      .getJobForUpsert(this.id)
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success && rs.data) {
          this.form.patchValue(rs.data);
        }
      });
  }

  getDropdownData() {
    this.classificationService.getClassificationSources().subscribe((rs) => {
      if (rs.success && rs.data) {
        this.categories = rs.data.filter(
          (i) => i.type == ClassificationEnum.Category
        );
        this.locations = rs.data.filter(
          (i) => i.type == ClassificationEnum.Location
        );
        this.jobTypes = rs.data.filter(
          (i) => i.type == ClassificationEnum.JobType
        );
        this.skills = rs.data.filter((i) => i.type == ClassificationEnum.Skill);
      }
    });
  }

  save() {
    if (this.isUpdate) {
      this.update();
    } else {
      this.insert();
    }
  }

  insert() {
    this.jobService.createJob(this.form.getRawValue()).subscribe((rs) => {
      if (rs.success) {
        this.messageService.add({
          severity: 'success',
          detail: 'Thêm mới tin tuyển dụng thành công!',
        });
        this.router.navigate(['tin-tuyen-dung', 'thao-tac', rs.data]);
      } else {
        this.messageService.add({
          severity: 'error',
          detail: rs.error,
        });
      }
    });
  }

  update() {
    this.jobService
      .updateJob(this.id, this.form.getRawValue())
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Cập nhật tin tuyển dụng thành công!',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.error,
          });
        }
      });
  }

  delete() {
    if (this.isUpdate) {
      this.confirmationService.confirm({
        message: 'Bạn có chắc chắn muốn xóa tin tuyển dụng này?',
        accept: () => {
          this.commonService.showLoading();
          this.jobService
            .deleteJob(this.id)
            .pipe(
              finalize(() => {
                this.commonService.hideLoading();
              })
            )
            .subscribe((rs) => {
              if (rs.success) {
                this.messageService.add({
                  severity: 'success',
                  detail: 'Xóa tin tuyển dụng thành công!',
                });

                this.router.navigate(['/']);
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
  }

  back() {
    this.location.back();
  }
}
