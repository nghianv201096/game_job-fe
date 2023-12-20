export interface LoginReqDto {
  email: string;
  password: string;
}

export interface LoginResDto {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

export interface RegisterReqDto {
  email: string;
  password: string;
  reenterPassword: string;
  role: number;
  fullname: string;
}
