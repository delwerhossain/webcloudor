import { Schema, model } from 'mongoose';
import { TReview, TReviewDetails } from './Review.interface';


const reviewDetailsSchema = new Schema<TReviewDetails>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderID: {
    type: Schema.Types.ObjectId,
    ref: 'order',    
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const ReviewSchema = new Schema<TReview>({
  productID: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: [true, 'Product Id required'],
  },
  reviewDetails: {
    type: [reviewDetailsSchema],
    default: []
  }
}, { timestamps: true });

export const ReviewModel = model<TReview>('review', ReviewSchema);
