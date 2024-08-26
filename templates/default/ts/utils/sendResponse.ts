import { Response } from 'express';
import { ApiResponse } from '../types/response.type';

const sendResponse = <T>(res: Response, data: ApiResponse<T>): void => {
  const responseData: ApiResponse<T> = {
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };

  res.status(data.statusCode || 200).json(responseData);
};

export default sendResponse;