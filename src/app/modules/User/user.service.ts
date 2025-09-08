/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import User from './user.model';
import { IUser } from './user.interface';
import { AppError } from '../../../errors';

const registerUser = async (payload: IUser): Promise<Partial<IUser>> => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, `User already exists with email: ${payload.email}`);
  }

  const newUser = await User.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to register user');
  }

  const { password, refreshToken, ...safeUser } = newUser.toObject();

  return safeUser;
};


const getProfile = async (userId: string | undefined): Promise<IUser> => {
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const user = await User.findById(userId).select('-password -refreshToken');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

export const UserServices = {
  registerUser,
  getProfile,
};
