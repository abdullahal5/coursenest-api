import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { catchAsync, SendResponse } from '../../../shared';
import { CourseService } from './course.service';

// Create a course (Admin only)
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseService.createCourse(req.body);

  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: course,
  });
});

// Get all courses (User & Admin)
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const courses = await CourseService.getAllCourses();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses fetched successfully',
    data: courses,
  });
});

// Get a single course by ID
const getCourseById = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseService.getCourseById(req.params.id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully',
    data: course,
  });
});

// Update course (Admin only)
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseService.updateCourse(req.params.id, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: course,
  });
});

// Delete course (Admin only)
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const course = await CourseService.deleteCourse(req.params.id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: course,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
