import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { AppError } from '../../errors';
import { jwtHelpers } from '../../helpers';

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      const verifiedUser = jwtHelpers.verifyToken(token, config.jwt.jwt_access_secret as Secret);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      req.user = verifiedUser;

      next();
    } catch (error) {
      next(error);
    }
  };
};
