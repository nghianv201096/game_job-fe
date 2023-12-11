import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
    name: 'imageUrl'
})
export class ImagePipe implements PipeTransform {
    transform(value: string) {
        return environment.imageUrl + value;
    }
}