import { z } from 'zod';

const reviewValidation = z.object({
  orderID: z.string(),
  rating: z.number().min(0),
  review: z.string().trim().min(1),
  comment: z.string().trim().min(1),
});
const reviewUpdateValidation = z.object({
  name: z.string().trim().min(1).optional(),
});
export const ReviewValidation = {
  reviewValidation,
  reviewUpdateValidation,
};
