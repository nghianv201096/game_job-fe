import { ClassificationSourceDto } from "../classification/classification-source.dto";

export class JobDetailDto {
    id!: number;
    title!: string;
    isHotJob!: boolean;
    createdDate!: Date;
    createdBy!: number;
    categoryNames?: string;
    salary?: string;
    jobTypeNames?: string;
    skills!: ClassificationSourceDto[];
    locationNames?:string;
    introduction?:string;
    description?:string;
    requirement?:string;
    interests?:string;
}