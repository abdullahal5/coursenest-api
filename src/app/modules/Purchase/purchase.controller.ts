import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PurchaseServices } from './purchase.service';
import { catchAsync, SendResponse } from '../../../shared';

const purchaseCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  const result = await PurchaseServices.purchaseCourse(userId, courseId);

  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course purchased successfully',
    data: result,
  });
});

const getMyPurchases = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await PurchaseServices.getUserPurchases(userId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Purchased courses retrieved successfully',
    data: result,
  });
});

export const PurchaseController = {
  purchaseCourse,
  getMyPurchases,
};
