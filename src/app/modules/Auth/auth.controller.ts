import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { catchAsync, SendResponse } from '../../../shared';
import { AuthServices } from './auth.service';

// Login user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { role, accessToken, refreshToken } = await AuthServices.loginUser(req.body);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken, role },
  });
});

// Logout
const logout = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.logoutFromDB(req.user);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  logout,
};
