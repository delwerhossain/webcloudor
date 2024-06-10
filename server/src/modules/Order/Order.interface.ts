import { Types } from 'mongoose';
export type Tags = {
  productName: string;
  isDeleted?: boolean;
};
export type TDetails = {
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};

export type TOrder = {
  productName: string; //!change 
  categoryId: Types.ObjectId;
  price: number;
  startDate: Date; // orderDate
  endDate?: Date;  //* deliveryDate ? todo : make it optional
  durationInDays?: number; //! change
  userID?: number; //! change
  doneBy?: string;  // //! change
  description?: string; //!change

};
