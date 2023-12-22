import { RoleEnum } from 'src/app/enums/role.enum';

export class UserProfileDto {
  constructor(
    id: number,
    fullName: string,
    email: string,
    phoneNumber: string | undefined,
    roles: string[]
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
    this.roleNames = RoleEnum.All.filter(
      (r) => this.roles.includes(r.code) == true
    )
      .map((item) => item.name)
      .join(', ');
  }

  id!: number;
  fullName!: string;
  email!: string;
  phoneNumber?: string;
  facebook?: string;
  linkdIn?: string;
  website?: string;
  address?: string;

  description?: string;

  avatarFileName?: string;

  roles!: string[];
  roleNames?: string;

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
