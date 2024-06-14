import { Schema, model } from 'mongoose';
import { AddressSchema } from '../Order/Order.model';
import { TUser } from './User.interface';


const UserSchema = new Schema<TUser>({
  userType: {
    type: String,
    enum: {
      values: ["superAdmin",'admin', 'user'],
      default: 'user',
    }
  },
  name: {
    type: String,    
    trim: true,
    required: [true, 'User Name Required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email Required'],
  },
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Number Required'],
  },
  address: [AddressSchema],
}, { timestamps: true });

export const UserModel = model<TUser>('user', UserSchema);
