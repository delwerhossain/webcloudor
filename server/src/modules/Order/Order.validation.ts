import { z } from 'zod';
import { Types } from 'mongoose';

// Helper function to validate ObjectId
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

const objectIdSchema = z.string().refine(isValidObjectId, {
  message: "Invalid ObjectId format",
});

// in Future we can add more fields
const descriptionSchema = z.object({
  level: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .optional(),
  description: z.string().trim().min(1).optional(),
});

const tagSchema = z.object({
  productName: z.string().min(1),
  isDeleted: z.boolean().optional(),
});


const createOrderSchemaValidation = z.object({
  productName: z.string().trim().min(1),
  categoryId: objectIdSchema,
  price: z.number().min(0),  
  startDate: z.date(),
  endDate: z.date(),
  userID: objectIdSchema.optional(),
  doneBy: z.string().trim().min(1).optional(),
  durationInDays: z.number().optional(),
  description: z.string().optional(), 
});

const updateOrderSchemaValidation = z.object({
  productName: z.string().trim().min(1).optional(),
  categoryId: objectIdSchema.optional(),
  price: z.number().min(0).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  userID: objectIdSchema.optional(),
  doneBy: z.string().trim().min(1).optional(),
  durationInDays: z.number().optional(),
  description: z.string().optional(),
});

export const OrderValidation = {
  createOrderSchemaValidation,
  updateOrderSchemaValidation,
};
