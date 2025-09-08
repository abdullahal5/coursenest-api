import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { catchAsync, SendResponse } from '../../../shared';
import { UserServices } from './user.service';

// Register a new user
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.registerUser(req.body);

  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

// Get logged-in user profile
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.getProfile(req.user?.id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile fetched successfully',
    data: user,
  });
});

export const UserController = {
  registerUser,
  getProfile,
};
