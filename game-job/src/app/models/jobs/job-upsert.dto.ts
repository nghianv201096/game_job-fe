export class JobUpsertDto {
    id!: number;
    code!: string;
    title!: string;
    locationId!: number;
    categoryId!: number;
    jobTypeId!: number;
    skillIds!: number[];
    salary!: string;
    introduction!: string;
    description!: string;
    requirement!: string;
    interests!: string;
    status!: number;
}