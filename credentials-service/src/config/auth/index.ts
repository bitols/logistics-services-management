import { JwtPayload, sign, verify } from 'jsonwebtoken';
import config from '@config/auth/config';

const validate = async (token: string): Promise<JwtPayload> => {
  const bearer = token.split(' ');
  const bearerToken = bearer[1];

  return (await verify(bearerToken, config.jwt.secret, {
    algorithms: ['HS256'],
  })) as JwtPayload;
};

const create = async (payload: string | object | Buffer): Promise<string> => {
  return await sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
    algorithm: 'HS256',
  });
};

export { create, validate };
