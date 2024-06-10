// validationSchemas.ts
import { z } from 'zod';
import { Types } from 'mongoose';

// Helper schema for ObjectId validation
const ObjectIdSchema = z.string().length(24, "Invalid ObjectId format");

// Review Details Validation Schema
const reviewDetailsSchema = z.object({
  user: ObjectIdSchema.refine(id => Types.ObjectId.isValid(id), { message: 'Invalid User ID' }),
  rating: z.number().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must be at most 5" }),
  comment: z.string().trim().nonempty("Comment is required"),
  date: z.date().optional(),
});

// Product Validation Schema
const productSchema = z.object({
  name: z.string().trim().nonempty({ message: 'Product Name is required' }),
  price: z.number().nonnegative({ message: 'Price must be a non-negative number' }),
  description: z.string().trim().nonempty({ message: 'Description is required' }),
  image: z.string().trim().nonempty({ message: 'Image URL is required' }),
  categoryID: ObjectIdSchema.refine(id => Types.ObjectId.isValid(id), { message: 'Invalid Category ID' }),
  quantity: z.number().nonnegative({ message: 'Quantity must be a non-negative number' }),
  reviews: z.array(reviewDetailsSchema).default([]),
});

export { reviewDetailsSchema, productSchema };
