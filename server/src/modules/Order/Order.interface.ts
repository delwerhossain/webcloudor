import { Types } from 'mongoose';
export type Tags = {
  name: string;
  isDeleted?: boolean;
};
export type TDetails = {
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};

export type TOrder = {
  email: string; //!change 
  name: string; //!change 
  categoryId: Types.ObjectId;
  price: number;
  tags?: Tags[]; //!change 
  startDate: Date; // orderDate
  endDate?: Date;  //* deliveryDate ? todo : make it optional
  durationInDays?: number; //! change
  userID?: number; //! change
  doneBy?: string;  // //! change
  details?: string; //!change
  phone: string;//!change
  address?: string;//!change

};
