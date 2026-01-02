import { CommonApiDto } from '@/shared/types/response';
import { error } from 'console';

const success: CommonApiDto = {
  statusCode: 200,
  message: 'Success',
};

console.log('Types work!', success, error);
