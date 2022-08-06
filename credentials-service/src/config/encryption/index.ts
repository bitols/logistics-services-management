import { hash, compare } from 'bcryptjs';
import config from '@config/encryption/config';
const hashString = async (s: string): Promise<string> => {
  return await hash(s, config.encryption.salt);
};

const compareHashString = async (s: string, hash: string): Promise<boolean> => {
  return await compare(s, hash);
};

export { hashString, compareHashString };
