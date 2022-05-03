import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

const port = process.env.APP_API_PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}!`);
});
