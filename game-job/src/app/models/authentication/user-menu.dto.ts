import { RoleEnum } from 'src/app/enums/role.enum';

export class UserProfileDto {
  constructor(
    id: number,
    fullname: string,
    email: string,
    phoneNumber: string,
    roles: string[]
  ) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
  }

  id!: number;
  fullname!: string;
  email!: string;
  phoneNumber!: string;
  roles!: string[];

  private isInRole(role: string): boolean {
    return this.roles?.includes(role) === true;
  }

  isAdmin(): boolean {
    return this.isInRole(RoleEnum.Admin.code);
  }

  isEmployer(): boolean {
    return this.isInRole(RoleEnum.Employer.code);
  }

  isCandidate(): boolean {
    return this.isInRole(RoleEnum.Candidate.code);
  }
}
