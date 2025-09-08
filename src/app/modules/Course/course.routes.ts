import express from 'express';
import { auth, validateRequest } from '../../middlewares';
import { CourseController } from './course.controller';
import { USER_ROLE } from '../User/user.constant';
import { createCourseSchema, updateCourseSchema } from './course.validation';

const router = express.Router();

// Any user can get all courses
router.get('/', auth(USER_ROLE.admin, USER_ROLE.user), CourseController.getAllCourses);

// Any user can get a single course by ID
router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.user), CourseController.getCourseById);

// Admin can create a course
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createCourseSchema),
  CourseController.createCourse,
);

// Admin can update a course
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateCourseSchema),
  CourseController.updateCourse,
);

// Admin can delete a course
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  CourseController.deleteCourse,
);

export const courseRoutes = router;
