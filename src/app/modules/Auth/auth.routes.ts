import express from 'express';
import { auth, validateRequest } from '../../middlewares';
import { AuthController } from './auth.controller';
import { loginUserSchema } from './auth.validation';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post('/login', validateRequest(loginUserSchema), AuthController.loginUser);

router.post('/logout', auth(USER_ROLE.admin, USER_ROLE.user), AuthController.logout);

router.post(
  '/refresh-token',
  AuthController.generateRefreshToken,
);

export const authRoutes = router;
