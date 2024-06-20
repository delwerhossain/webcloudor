import { Schema, model } from 'mongoose';
import { AddressSchema } from '../Order/Order.model';
import { TUser } from './User.interface';

const UserSchema = new Schema<TUser>(
  {
    userType: {
      type: String,
      enum: ['superAdmin', 'admin', 'user'],
      default: 'user', // Ensures the default value is 'user'
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'User Name Required'],
    },
    occupationType: {
      type: String,
      enum: [
        'Business Owner',
        'Job Holder',
        'Freelancer',
        'Job Candidate',
        'Student',
      ],
    },
    occupationDescription: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Number Required'],
    },
    shippingAddress: [AddressSchema],
    billingAddress: [AddressSchema],
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

export const UserModel = model<TUser>('user', UserSchema);
