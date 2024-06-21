// validationSchemas.ts
import { z } from 'zod';
import { Types } from 'mongoose';

// Helper schema for ObjectId validation
const ObjectIdSchema = z.string().length(24, 'Invalid ObjectId format');

// Review Details Validation Schema
const productReviewValidation = z.object({
  user: ObjectIdSchema.refine((id) => Types.ObjectId.isValid(id), {
    message: 'Invalid User ID',
  }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
  comment: z.string().trim().min(1),
  date: z.date().optional(),
});
//z.string().trim().min(1)
// Product Validation Schema
const productCreateValidation = z.object({
  name: z.string().trim().min(1),
  price: z
    .number()
    .nonnegative({ message: 'Price must be a non-negative number' }),
  description: z.string().trim().min(1),
  image: z.string().trim().min(1),
  categoryID: ObjectIdSchema.refine((id) => Types.ObjectId.isValid(id), {
    message: 'Invalid Category ID',
  }),
  quantity: z
    .number()
    .nonnegative({ message: 'Quantity must be a non-negative number' }),
  uploadByUserID: z.string().trim().min(1),
  reviews: z.array(productReviewValidation).default([]),
});

const productUpdateValidation = z.object({
  name: z.string().trim().min(1),
  price: z
    .number()
    .nonnegative({ message: 'Price must be a non-negative number' }),
  liveLink: z.string().trim().min(1),
  description: z.string().trim().min(1),
  image: z.string().trim().min(1),
  categoryID: ObjectIdSchema.refine((id) => Types.ObjectId.isValid(id), {
    message: 'Invalid Category ID',
  }),
  quantity: z
    .number()
    .nonnegative({ message: 'Quantity must be a non-negative number' }),
  uploadByUserID: z.string().trim().min(1),
  reviews: z.array(productReviewValidation).default([]),
});

export const ProductValidation = {
  productReviewValidation,
  productCreateValidation,
  productUpdateValidation,
};
