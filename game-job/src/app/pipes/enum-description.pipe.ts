import { Pipe, PipeTransform, Type } from "@angular/core";
import { BaseTypeEnum } from "../enums/base-type.enum";

@Pipe({
    name: 'enumDescription'
})
export class EnumDescriptionPipe implements PipeTransform {
    transform(value: number, types: BaseTypeEnum[]) {
        const e = types.filter(t => t.id == value);
        if(e[0]) {
            return e[0].code;
        }

        return '';
    }
}