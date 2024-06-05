import { Types } from 'mongoose';

export type TReview = {
  orderId: Types.ObjectId;
  rating: number;
  review: string;
  // createdAt: Date;
  // updatedAt: Date;
  // userId: Types.ObjectId;
};
