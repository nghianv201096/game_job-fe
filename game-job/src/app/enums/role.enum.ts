import { BaseTypeEnum } from './base-type.enum';

export class RoleEnum extends BaseTypeEnum {
  static Admin = new RoleEnum(1, 'ROLE_ADMIN', 'Quản trị viên');
  static Candidate = new RoleEnum(2, 'ROLE_CANDIDATE', 'Ứng viên');
  static Employer = new RoleEnum(3, 'ROLE_EMPLOYER', 'Nhà tuyển dụng');
  static Guest = new RoleEnum(4, 'ROLE_GUEST', 'Khách');

  static override All = [this.Admin, this.Candidate, this.Employer, this.Guest];
}
