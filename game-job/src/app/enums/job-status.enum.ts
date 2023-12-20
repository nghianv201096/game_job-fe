import { BaseTypeEnum } from "./base-type.enum";

export class JobStatusEnum extends BaseTypeEnum {
    static New = new JobStatusEnum(0, 'Mới tạo', 'Mới tạo');
    static Waiting = new JobStatusEnum(1, 'Chờ duyệt', 'Chờ duyệt');
    static Approve = new JobStatusEnum(2, 'Đã duyệt', 'Đã duyệt');
    static Reject = new JobStatusEnum(3, 'Không hợp tiêu chí', 'Không hợp tiêu chí');
    static Display = new JobStatusEnum(4, 'Đang hiển thị', 'Đang hiển thị');
    static Strip = new JobStatusEnum(5, 'Đã gỡ', 'Đã gỡ');
    static OutOfDate = new JobStatusEnum(6, 'Hết hạn', 'Hết hạn');

    static override All = [
        this.New,
        this.Waiting,
        this.Approve,
        this.Display,
        this.Strip,
        this.OutOfDate,
    ];
}