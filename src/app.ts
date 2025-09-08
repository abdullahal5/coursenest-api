/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { notfound } from './app/middlewares';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parsers
app.use(cors());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send({
    Message: 'COURSE MANAGEMENT API IS RUNNING...',
  });
});

// Error Handling
app.use(notfound);
app.use(globalErrorHandler);

export default app;
