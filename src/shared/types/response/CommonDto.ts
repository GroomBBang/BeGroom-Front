export interface CommonSuccessResponse<T> {
  statusCode: number;
  message: string;
  result: T;
}

export interface CommonErrorResponse {
  status_code: number;
  status_message: string;
}
