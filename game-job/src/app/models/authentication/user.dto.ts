export class UserDto {
  constructor(id: number, username: string, role: string) {
    this.id = id;
    this.username = username;
    this.role = role;
  }

  id!: number;
  username!: string;
  role!: string;
}
