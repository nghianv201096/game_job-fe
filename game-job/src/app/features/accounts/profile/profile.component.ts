import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { finalize } from 'rxjs';
import { RoleEnum } from 'src/app/enums/role.enum';
import { UserProfileDto } from 'src/app/models/authentication/user-menu.dto';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload?: FileUpload;
  user?: UserProfileDto;
  isShowUploadAvatar: boolean = false;
  isShowUpdate: boolean = false;
  file?: any;
  form!: FormGroup;

  constructor(
    private commonService: CommonService,
    private messageService: MessageService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      roleNames: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      phoneNumber: ['', Validators.required],
      facebook: ['', Validators.required],
      linkdIn: ['', Validators.required],
      address: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

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
          const roleNames = RoleEnum.All.filter(
            (r) => rs.data?.roles.includes(r.code) == true
          )
            .map((item) => item.name)
            .join(', ');
          this.user.roleNames = roleNames;
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }

  selectAvatar($event: any) {
    this.file = $event.files[0];
  }

  clearAvatar() {
    this.file = null;
  }

  uploadAvatar($event: any) {
    if (!this.file) {
      this.messageService.add({
        severity: 'error',
        detail: 'Bạn chưa chọn ảnh',
      });
    }

    const formData = new FormData();
    formData.append('file', this.file);
    this.commonService.showLoading();
    this.userService
      .updateAvatar(formData)
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Cập nhật ảnh đại diện thành công!',
          });
          this.fileUpload?.clear();
          this.getData();
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }

  showUpdate() {
    this.isShowUpdate = true;
    this.form.patchValue(this.user ?? {});
  }

  update() {
    this.commonService.showLoading();
    const model = this.form.getRawValue();
    this.userService
      .update(model)
      .pipe(
        finalize(() => {
          this.commonService.hideLoading();
        })
      )
      .subscribe((rs) => {
        if (rs.success) {
          this.messageService.add({
            severity: 'success',
            detail: 'Cập nhật thông tin thành công!',
          });
          this.getData();
          this.isShowUpdate = false;
        } else {
          this.messageService.add({
            severity: 'error',
            detail: rs.message,
          });
        }
      });
  }
}
