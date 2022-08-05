import { JwtPayload, sign, verify } from 'jsonwebtoken';
import config from '@config/auth/config';

const validate = async (token: string): Promise<JwtPayload> => {
  return (await verify(token, config.jwt.secret)) as JwtPayload;
};

const create = async (payload: string | object | Buffer): Promise<string> => {
  return await sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export { create, validate };
