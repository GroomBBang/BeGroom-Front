// CommonSuccessDto.ts
import type { CommonDto } from './CommonDto';

export type CommonSuccessDto<T> = CommonDto & {
  result: T;
};
