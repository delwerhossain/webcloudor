import { Schema, model } from 'mongoose';
import { TOrder, TDetails, Tags } from './Order.interface';

const TagsSchema = new Schema<Tags>({
  productName: {
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
  productName: {
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
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming there is a User collection to reference
  },

  doneBy: {
    type: String, // who is doing the order 
    trim: true,
  },
  durationInDays: {
    type: Number,
  },
  description: { type: String, trim: true }
}, { timestamps: true });

export const OrderModel = model<TOrder>('order', orderSchema);
