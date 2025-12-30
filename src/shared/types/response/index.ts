import { CommonErrorDto } from './CommonErrorDto';
import { CommonSuccessDto } from './CommonSuccessDto';

export type { CommonErrorDto, CommonSuccessDto };
export type ApiSuccess<T> = CommonSuccessDto<T>;
export type ApiError = CommonErrorDto;
