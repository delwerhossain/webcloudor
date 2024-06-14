// User.type.ts
import { IAddress } from '../Order/Order.interface';

export type TUser = {
  userType?: 'superAdmin' | 'admin' | 'user';
  name: string;
  email: string;
  phoneNumber: string;
  address: IAddress;
};
