// User.type.ts

import { Types } from 'mongoose';

export type TOrderDetails = {
  orderId: Types.ObjectId;
  rating?: number;
  review?: string;
};

export type TUser = {
  userType?: 'superAdmin' | 'admin' | 'user';
  name: string;
  email: string;
  number: string;
  address: string;
  orderDetails?: TOrderDetails[];
};
