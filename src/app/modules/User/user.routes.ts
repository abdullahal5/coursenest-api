import express from 'express';
import { auth, validateRequest } from '../../middlewares';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { registerUserSchema } from './user.validation';

const router = express.Router();

router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.getProfile);

router.post('/create-user', validateRequest(registerUserSchema), UserController.registerUser);

export const userRoutes = router;
