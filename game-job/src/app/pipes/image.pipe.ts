import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
    name: 'imageUrl'
})
export class ImagePipe implements PipeTransform {
    transform(value?: string) {
        return environment.imageUrl + (value ?? '00000000-0000-0000-0000-000000000000.png');
    }
}