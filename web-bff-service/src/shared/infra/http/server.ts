import 'reflect-metadata';
import 'dotenv/config';
import appApiConfig from '@config/app/config';
import { app } from './app';

const port = appApiConfig.port;

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
