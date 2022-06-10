import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppErrors from '@shared/errors/AppErrors';
import '@shared/container';
import appApiConfig from '@config/appApiConfig';

const port = appApiConfig.port;

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppErrors) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      error: error.name,
      message: error.message,
    });
  },
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}!`);
});
