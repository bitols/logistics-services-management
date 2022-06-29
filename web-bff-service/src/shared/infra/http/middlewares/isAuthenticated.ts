import AppError from '@shared/errors/AppErrors';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { container } from 'tsyringe';
import { GetSessionsUseCase } from '@modules/credentials/useCases/GetSessionsUseCase';
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

  const getSession = container.resolve(GetSessionsUseCase);
  const session = await getSession.execute({ token });

  request.session = session;
  return next();
};
