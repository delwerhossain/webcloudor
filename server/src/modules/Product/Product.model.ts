// Product.model.ts
import { Schema, model } from 'mongoose';
import { TReviewDetails, TProduct } from './Product.interface';

// Review Details Schema
const ReviewDetailsSchema = new Schema<TReviewDetails>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
  },
});

// Product Schema
const ProductSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Product Name Required'],
    },
    price: {
      type: Number,
      required: [true, 'Price Required'],
    },
    liveLink: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description Required'],
    },
    image: {
      type: String,
      trim: true,
      required: [true, 'Image Required'],
    },
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category ID Required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity Required'],
    },
    uploadByUserID: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: [true, 'Uploaded By user ID Required'],
    },
    reviews: {
      type: [ReviewDetailsSchema],
      default: [],
    },
  },
  { timestamps: true },
);

// Export the Product model
export const ProductModel = model<TProduct>('Product', ProductSchema);
