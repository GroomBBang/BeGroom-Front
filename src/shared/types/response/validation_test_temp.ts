import { ApiError, ApiSuccess } from '@/shared/types/response';

const success: ApiSuccess<{ id: number }> = {
  statusCode: 200,
  message: 'Success',
  result: { id: 1 },
};

const error: ApiError = {
  statusCode: 400,
  statusMessage: 'Bad Request',
};

console.log('Types work!', success, error);
