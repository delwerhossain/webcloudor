import { z } from 'zod';
import { addressValidation } from '../Order/Order.validation';
const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/;

const user = z.object({
  userType: z.enum(['superAdmin', 'admin', 'user']).default('user'),
  name: z.string().trim().min(1),
  email: z.string().trim().min(1).optional(),
  occupationType: z.enum([
    'Business Owner',
    'Job Holder',
    'Freelancer',
    'Job Candidate',
    'Student',
  ]),
  occupationDescription: z.string().trim().optional(),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      phoneRegex,
      'Invalid phone number format. It should be a 10-digit number.',
    )
    .min(10)
    .max(15),
  shippingAddress: addressValidation.optional(),
  billingAddress: addressValidation.optional(),
  password: z.string().trim().min(1).optional(),
});

const userValidation = user;
const userUpdateValidation = user.partial();
export const UserValidation = {
  userValidation,
  userUpdateValidation,
};
