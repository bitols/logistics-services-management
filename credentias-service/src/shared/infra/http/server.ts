import 'reflect-metadata';
import 'dotenv/config';
import appApiConfig from '@config/appApiConfig';
import { app } from './app';

const port = appApiConfig.port;

app.listen(port, async () => {
  console.log(`Server started on port ${port}!`);
});
