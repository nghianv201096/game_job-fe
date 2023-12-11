export class ApiResponse<T> {
  isSuccessful!: boolean;
  errorCode: string | undefined;
  message: string | undefined;
  data: T | undefined;
}

export class MethodResult<T> {
  success!: boolean;
  error: string | undefined;
  message: string | undefined;
  data: T | undefined;
  additionalData: string | undefined;
}