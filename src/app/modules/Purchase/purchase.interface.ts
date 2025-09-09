import { Types } from "mongoose";

export interface IPurchase {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  amount: number;
  date: Date;
}
