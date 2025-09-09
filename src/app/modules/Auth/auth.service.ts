import httpStatus from 'http-status';
import User from '../User/user.model';
import { LoginPayload } from './auth.interface';
import { AppError } from '../../../errors';
import { jwtHelpers } from '../../../helpers';
import config from '../../../config';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = async (payload: LoginPayload) => {
  const { email, password } = payload;

  // Find user with password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  // Check password
  const isMatch = await User.isPasswordMatched(password, user?.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_access_secret as string,
    config.jwt.jwt_access_expires_in as string,
  );

  const refreshToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_refresh_secret as string,
    config.jwt.jwt_refresh_expires_in as string,
  );

  //  update refresh token field
  await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });

  return { role: user.role, accessToken, refreshToken };
};

const logoutFromDB = async (user: JwtPayload) => {
  const userId = user.id;

  await User.findByIdAndUpdate(userId, { refreshToken: null });

  return null;
};

const generateRefreshTokenFromDB = async (token: string) => {
  const user = await User.findOne({ refreshToken: token });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelpers.generateToken(
    jwtPayload,
    config.jwt.jwt_access_secret as string,
    config.jwt.jwt_access_expires_in as string,
  );

  return { accessToken };
};


export const AuthServices = {
  loginUser,
  logoutFromDB,
  generateRefreshTokenFromDB,
};
