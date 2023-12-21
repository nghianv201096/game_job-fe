import { BaseTypeEnum } from "./base-type.enum";

export class JobApplyStatusEnum extends BaseTypeEnum {
    static AdminWaiting = new JobApplyStatusEnum(1, 'Chờ QTV duyệt', 'Chờ QTV duyệt');
    static AdminReject = new JobApplyStatusEnum(2, 'Chưa khớp tiêu chí', 'Chưa khớp tiêu chí');
    static EmployerWating = new JobApplyStatusEnum(3, 'Chờ NTD duyệt', 'Chờ NTD duyệt');
    static EmployerApprove = new JobApplyStatusEnum(4, 'Thành công', 'Thành công');
    static EmployerReject = new JobApplyStatusEnum(5, 'NTD từ chối', 'NTD từ chối');
    static Cancel = new JobApplyStatusEnum(6, 'Hủy ứng tuyển', 'Hủy ứng tuyển');

    static override All = [
        this.AdminWaiting,
        this.AdminReject,
        this.EmployerWating,
        this.EmployerApprove,
        this.EmployerReject,
        this.Cancel,
    ];
}

export class JobApplyStatusForCandidateEnum extends BaseTypeEnum {
    static AdminWaiting = new JobApplyStatusForCandidateEnum(1, 'Đang xử lý', 'Đang xử lý');
    static AdminReject = new JobApplyStatusForCandidateEnum(2, 'Chưa khớp tiêu chí', 'Chưa khớp tiêu chí');
    static EmployerWating = new JobApplyStatusForCandidateEnum(3, 'Đang xử lý', 'Đang xử lý');
    static EmployerApprove = new JobApplyStatusForCandidateEnum(4, 'Chấp nhận', 'Chấp nhận');
    static EmployerReject = new JobApplyStatusForCandidateEnum(5, 'Chưa khớp tiêu chí', 'Chưa khớp tiêu chí');
    static Cancel = new JobApplyStatusForCandidateEnum(6, 'Hủy ứng tuyển', 'Hủy ứng tuyển');

    static override All = [
        this.AdminWaiting,
        this.AdminReject,
        this.EmployerWating,
        this.EmployerApprove,
        this.EmployerReject,
        this.Cancel,
    ];
}

export class JobApplyStatusForEmployerEnum extends BaseTypeEnum {
    static EmployerWating = new JobApplyStatusForCandidateEnum(3, 'Chờ duyệt', 'Chờ duyệt');
    static EmployerApprove = new JobApplyStatusForCandidateEnum(4, 'Chấp nhận', 'Chấp nhận');
    static EmployerReject = new JobApplyStatusForCandidateEnum(5, 'Chưa khớp tiêu chí', 'Chưa khớp tiêu chí');

    static override All = [
        this.EmployerWating,
        this.EmployerApprove,
        this.EmployerReject,
    ];
}
