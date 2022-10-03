import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppErrors from '@shared/errors/AppErrors';
import '@shared/container';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:8081'],
  }),
);
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

export { app };
