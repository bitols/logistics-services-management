import { NextFunction, Request, Response } from 'express';

export const loggingRequest = async (
  request: Request,
  respose: Response,
  next: NextFunction,
): Promise<void> => {
  console.log(
    `[INFO] ${new Date().toLocaleString()} Request ${request.method} ${
      request.baseUrl
    }${request.path} received`,
  );
  return next();
};
