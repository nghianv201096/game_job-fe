export class JobManagementDto {
  id!: number;
  code!: string;
  title!: string;
  status!: number;
  from!: Date | null;
  to!: Date | null;
  createdDate!: Date;
  modifiedDate!: Date;
  createdBy!: number;
  isHotJob!: boolean;
  totalOfView!: number;
  totalOfApplyEmployer!: number;
  totalOfApplyNewEmployer!: number;
  totalOfApplyAdmin!: number;
  totalOfApplyNewAdmin!: number;
}

