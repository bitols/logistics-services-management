export default {
  encryption: {
    salt: process.env.HASH_SALT as unknown as number,
  },
};
