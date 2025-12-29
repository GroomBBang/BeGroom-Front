import {
  http as mswHttp,
  type DefaultBodyType,
  type HttpResponseResolver,
  type PathParams,
} from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const createPath = (path: string) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}/${cleanPath}`;
};

export const api = {
  get: <
    Params extends PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
    ResponseBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    path: string,
    resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
  ) => mswHttp.get<Params, RequestBodyType, ResponseBodyType>(createPath(path), resolver),

  post: <
    Params extends PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
    ResponseBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    path: string,
    resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
  ) => mswHttp.post<Params, RequestBodyType, ResponseBodyType>(createPath(path), resolver),

  put: <
    Params extends PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
    ResponseBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    path: string,
    resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
  ) => mswHttp.put<Params, RequestBodyType, ResponseBodyType>(createPath(path), resolver),

  delete: <
    Params extends PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
    ResponseBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    path: string,
    resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
  ) => mswHttp.delete<Params, RequestBodyType, ResponseBodyType>(createPath(path), resolver),

  patch: <
    Params extends PathParams,
    RequestBodyType extends DefaultBodyType = DefaultBodyType,
    ResponseBodyType extends DefaultBodyType = DefaultBodyType,
  >(
    path: string,
    resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>,
  ) => mswHttp.patch<Params, RequestBodyType, ResponseBodyType>(createPath(path), resolver),
};
