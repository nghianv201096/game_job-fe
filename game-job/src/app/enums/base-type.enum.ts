export class BaseTypeEnum {
    id!: number;
    code!: string;
    name!: string;
    static All: BaseTypeEnum[] = [];

    constructor(id: number, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}