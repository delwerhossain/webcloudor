import { Schema, model } from 'mongoose';
import { TOrderDetails, TUser } from './User.interface';

const OrderDetailsSchema = new Schema<TOrderDetails>({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'order',
    required: [true, 'Order Id required'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
  },
});

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
  number: {
    type: String,
    trim: true,
    required: [true, 'Number Required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address Required'],
  },
  orderDetails:{
    type: [OrderDetailsSchema],
    default: []
  }
});

export const UserModel = model<TUser>('user', UserSchema);
