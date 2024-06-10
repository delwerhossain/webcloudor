import { Schema, model } from 'mongoose';
import { TReview } from './Review.interface';

const ReviewSchema = new Schema<TReview>({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'order',
    required: [true, 'Order Id required'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'rating Required'],
  },
  review: {
    type: String,
    required: [true, 'review Required'],
  },
});

export const ReviewModel = model<TReview>('review', ReviewSchema);
