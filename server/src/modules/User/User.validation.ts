import { z } from 'zod';
const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/;

const userValidation = z.object({
  userType: z.enum(['superAdmin', 'admin', 'user']),
  name: z.string().trim().min(1),
  email: z.string().trim().min(1),
  number: z
    .string()
    .trim()
    .regex(
      phoneRegex,
      'Invalid phone number format. It should be a 10-digit number.',
    ),
  address: z.string().trim().min(1),
});
const userUpdateValidation = z.object({
  userType: z.enum(['superAdmin', 'admin', 'user']).optional(),
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().min(1).optional(),
  number: z
    .string()
    .trim()
    .regex(
      phoneRegex,
      'Invalid phone number format. It should be a 10-digit number.',
    )
    .optional(),
  address: z.string().trim().min(1).optional(),
});
export const UserValidation = {
  userValidation,
  userUpdateValidation,
};
