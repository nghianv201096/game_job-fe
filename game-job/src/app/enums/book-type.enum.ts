import { BaseTypeEnum } from './base-type.enum';

export class BookTypeEnum extends BaseTypeEnum {
  static ProgrammingBook = new BookTypeEnum(1, 'Programming', 'Programming');
  static NovelBook = new BookTypeEnum(2, 'Novel', 'Novel');
  static AnimeBook = new BookTypeEnum(3, 'Anime', 'Anime');
  static EnglishBook = new BookTypeEnum(4, 'English', 'English');

  static override All = [
    this.ProgrammingBook,
    this.NovelBook,
    this.AnimeBook,
    this.EnglishBook,
  ];
}
