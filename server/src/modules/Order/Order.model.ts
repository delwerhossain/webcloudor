import { Schema, model } from 'mongoose';
import { TOrder, TDetails, Tags } from './Order.interface';

const TagsSchema = new Schema<Tags>({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
// in Future we can add more fields
const DetailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: {
      values: ['Beginner', 'Intermediate', 'Advanced'],
      message: 'Level must be either Beginner, Intermediate or Advanced',
    },

    required: [true, 'Level is required'],
  },
  description: {
    type: String,
    trim: true,
    required: false,
    default: 'Detailed description of the order',
  },
});

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Title is required'],
  },

  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, 'CategoryId is required'],
    ref: 'Category',
  },
  price: { type: Number, required: [true, 'Price is required'] },
  tags: {
    type: [TagsSchema] ,
    default: [], // Ensure tags is always an array
  },

  startDate: {
    type: Date,
    trim: true,
    required: [true, 'Start Date is required'],
  },
  endDate: {
    type: Date,
    trim: true,
    required: [true, 'End Date is required'],
  },
  userID: {
    type: Number,
  },

  doneBy: {
    type: String,
    trim: true,
  },
  durationInDays: {
    type: Number,
  },
  details: { type: String, trim: true },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  address: { type: String },
});

export const OrderModel = model<TOrder>('order', orderSchema);
