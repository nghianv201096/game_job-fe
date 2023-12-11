import { environment } from 'src/environments/environment';

export class FileHelper {
  static getUrl(name: string) {
    return environment.imageUrl + name;
  }
}
