import { z } from 'zod';

// in Future we can add more fields
const detailsSchema = z.object({
  level: z
    .enum(['Beginner', 'Intermediate', 'Advanced'])
    .refine((data) => data !== undefined, {
      message: 'Level must be either Beginner, Intermediate, or Advanced',
    })
    .optional(),
  description: z.string().trim().min(1).optional(),
});

const tagSchema = z.object({
  name: z.string().min(1),
  isDeleted: z.boolean().optional(),
});

const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/;

const createOrderSchemaValidation = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().min(1),
  categoryId: z.string().min(1),
  price: z.number().min(0),
  tags: z.array(tagSchema).optional(),
  startDate: z.date(),
  endDate: z.date(),
  userID: z.number().optional(),
  doneBy: z.string().trim().min(1).optional(),
  durationInDays: z.number().optional(),
  details: z.string().optional(),
  phone: z
    .string()
    .trim()
    .regex(
      phoneRegex,
      'Invalid phone number format. It should be a 10-digit number.',
    ),
  address: z.string().trim().min(1).optional(),
});
const updateOrderSchemaValidation = z.object({
  email: z.string().trim().email().optional(),
  name: z.string().trim().min(1).optional(),
  categoryId: z.string().optional(),
  price: z.number().min(0).optional(),
  tags: z.array(tagSchema).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  userID: z.number().optional(),
  doneBy: z.string().trim().min(1).optional(),
  durationInDays: z.number().optional(),
  details:  z.string().optional(),
  phone: z
    .string()
    .trim()
    .regex(
      phoneRegex,
      'Invalid phone number format. It should be a 10-digit number.',
    )
    .optional(),
  address: z.string().trim().min(1).optional(),
});

export const OrderValidation = {
  createOrderSchemaValidation,
  updateOrderSchemaValidation,
};
