/* eslint-disable @typescript-eslint/no-explicit-any */
export type TArgsParam = Record<string, any>;
export type TError = {
  data: {
    message: string;
    stack: string;
    errorMessage: {
      path: string;
      message: string;
    };
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage?: number;
  offset?: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
  statusCode?: number;
  code?: number;
};