import AppError from '@shared/errors/AppErrors';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { ValidateSessionsUseCase } from '@modules/credentials/useCases/ValidateSessionsUseCase';
export const isAutenticated = async (
  request: Request,
  respose: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  const validateSession = container.resolve(ValidateSessionsUseCase);
  const credential = await validateSession.execute({ token });

  request.credential = credential;
  return next();
};
