import { Types } from 'mongoose';

export type TReview = {
  productID: Types.ObjectId;
  reviewDetails: TReviewDetails[]
};

export type TReviewDetails = {
  userID: Types.ObjectId;
  orderID: Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;
}