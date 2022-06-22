import AppError from '@shared/errors/AppErrors';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

export interface ICreateSession {
  email: string;
  password: string;
}

export interface ITokenSession {
  token: string;
}

export default class CreateSessionsUseCase {
  public async execute({
    email,
    password,
  }: ICreateSession): Promise<ITokenSession> {
    const user = {
      email: 'bitols@gmail.com',
      password: '$2a$08$4e3rh0SR8U8SAjMpuRl4/.hnrfOzZmMq8RzfDC8ZEclKsmvjr8hH6',
      senderId: '62a545e2672e6ae02a54ac0e',
    };

    if (user.email !== email) {
      throw new AppError('Incorrect email/password credentials.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password credentials.', 401);
    }

    const token = sign(
      {
        body: {
          user: user.email,
        },
      },
      authConfig.jwt.secret,
      {
        subject: user.senderId,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return {
      token,
    };
  }
}
