import { ClassificationSourceDto } from "../classification/classification-source.dto";

export class JobDto {
  id!: number;
  title!: string;
  employerAvatar!: string;
  employerFullname!: string;
  categoryNames?: string;
  salary?: string;
  jobTypeNames?: string;
  skills?: ClassificationSourceDto[];
  locationNames?: string;
  isHotJob!: boolean;
}
