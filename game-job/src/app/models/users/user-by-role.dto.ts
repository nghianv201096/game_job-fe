import { JobSummaryForCandidateDto } from "../jobs/job-summary-for-candidate.dto";
import { JobSummaryForEmployerDto } from "../jobs/job-summary-for-employer.dto";

export class UserByRoleDto {
  id!: number;
  email!: string;
  fullName!: string;
  phoneNumber?: string;
}

export class EmployerDto extends UserByRoleDto {
  summary?: JobSummaryForEmployerDto;
}

export class CandidateDto extends UserByRoleDto {
  summary?: JobSummaryForCandidateDto;
}