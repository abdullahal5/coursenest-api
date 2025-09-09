import express from 'express';
import { PurchaseController } from './purchase.controller';
import { auth, validateRequest } from '../../middlewares';
import { USER_ROLE } from '../User/user.constant';
import { createPurchaseSchema } from './purchase.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(createPurchaseSchema),
  PurchaseController.purchaseCourse,
);

router.get('/my', auth(USER_ROLE.user), PurchaseController.getMyPurchases);

export const purchaseRoutes = router;
