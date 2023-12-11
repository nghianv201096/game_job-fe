export class ClassificationDto {
    type!: number;
    typeName!: number;
    items!: ClassificationItemDto[];
}

export class ClassificationItemDto {
    id!: number;
    name!: string;
}

export class ClassificationClickDto {
    type!: number;
    id!: number;
}