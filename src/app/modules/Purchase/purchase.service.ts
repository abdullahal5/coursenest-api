import httpStatus from 'http-status';
import { AppError } from '../../../errors';
import { Purchase } from './purchase.model';
import Course from '../Course/course.model';
import { Types } from 'mongoose';

const purchaseCourse = async (userId: string, courseId: string) => {
  if (!Types.ObjectId.isValid(courseId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid courseId');
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const alreadyPurchased = await Purchase.findOne({ userId, courseId });
  if (alreadyPurchased) {
    throw new AppError(httpStatus.CONFLICT, 'Course already purchased');
  }

  const purchase = await Purchase.create({
    userId,
    courseId,
    amount: course.price,
  });

  // Increment purchase count in course model
  await Course.findByIdAndUpdate(courseId, {
    $inc: { purchaseCount: 1 },
  });

  return purchase;
};

const getUserPurchases = async (userId: string) => {
  return Purchase.find({ userId }).populate('courseId');
};

export const PurchaseServices = {
  purchaseCourse,
  getUserPurchases,
};
