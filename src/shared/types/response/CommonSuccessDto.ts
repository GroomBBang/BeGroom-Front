export interface CommonSuccessDto<T> {
  statusCode: number;
  message: string;
  result: T;
}
