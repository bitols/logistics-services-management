import 'dotenv/config';
export = {
  url: `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(
    process.env.DB_PASSWORD as string,
  )}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
};
