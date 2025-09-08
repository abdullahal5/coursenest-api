import httpStatus from 'http-status';
import Course from './course.model';
import { ICourse } from './course.interface';
import { AppError } from '../../../errors';

const createCourse = async (payload: Partial<ICourse>): Promise<ICourse> => {
  const existingCourse = await Course.findOne({ title: payload.title });
  if (existingCourse) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course with this title already exists');
  }

  const course = await Course.create(payload);
  return course;
};

const getAllCourses = async (): Promise<ICourse[]> => {
  const courses = await Course.find({});
  return courses;
};

const getCourseById = async (courseId: string): Promise<ICourse | null> => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  return course;
};

const updateCourse = async (
  courseId: string,
  payload: Partial<ICourse>,
): Promise<ICourse | null> => {
  const course = await Course.findByIdAndUpdate(courseId, payload, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  return course;
};

const deleteCourse = async (courseId: string): Promise<ICourse | null> => {
  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  return course;
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
