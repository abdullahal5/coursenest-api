/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from './errorType';

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: any = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};
