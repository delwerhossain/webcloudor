import { z } from 'zod';
import { addressValidation } from '../Order/Order.validation';
const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/;

const user = z.object({
  userType: z.enum(['superAdmin', 'admin', 'user']),
  name: z.string().trim().min(1),
  email: z.string().trim().min(1),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      phoneRegex,
      'Invalid phone number format. It should be a 10-digit number.',
    ),
  address: addressValidation,
});

const userValidation = user
const userUpdateValidation = user.partial();
export const UserValidation = {
  userValidation,
  userUpdateValidation,
};
