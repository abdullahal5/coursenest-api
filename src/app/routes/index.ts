import { Router } from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { authRoutes } from '../modules/Auth/auth.routes';
import { courseRoutes } from '../modules/Course/course.routes';
const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/course',
    route: courseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
