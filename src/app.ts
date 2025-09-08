/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import status from 'http-status';

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

// not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'API NOT FOUND!',
    error: {
      path: req.originalUrl,
      message: 'Your requested path is not found!',
    },
  });
});

export default app;
