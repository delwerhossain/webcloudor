// Product.interface.ts
import { Types } from 'mongoose';

export interface TReviewDetails {
  user: Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;
}

export interface TProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryID: Types.ObjectId;
  quantity: number;
  uploadByUserID: Types.ObjectId;
  reviews: TReviewDetails[];
}
