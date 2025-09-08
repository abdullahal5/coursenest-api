/* eslint-disable @typescript-eslint/no-explicit-any */

import { TErrorSources, TGenericErrorResponse } from './errorType';

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMsg = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMsg} is all ready exists!!!`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};
