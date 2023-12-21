import { JobApplyStatusEnum } from 'src/app/enums/job-apply-status.enum';

export class ApplicationDto {
  id!: number;
  candidateId!: number;
  candidateFullName?: string | null;
  candidateEmail?: string | null;

  jobId!: number;
  jobCode?: string | null;
  jobTitle?: string | null;

  employerId!: number;
  employerEmail?: string | null;
  employerFullName?: string | null;

  status!: number;
  coverLetter!: string;
  cvFilePath!: string;
  cvFileName!: string;
  rejectReason?: string | null;

  createdDate!: Date;
}


