import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
