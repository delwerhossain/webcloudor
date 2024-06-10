import { z } from 'zod';

const userValidation = z.object({
  userType: z.enum(['superAdmin', 'admin', 'user']), 
  name: z.string().trim().min(1),
  email: z.string().trim().min(1),
  number: z.string().trim().min(1),
  address: z.string().trim().min(1),
});
const userUpdateValidation = z.object({
  userType: z.enum(['superAdmin', 'admin', 'user']).optional(),
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().min(1).optional(),
  number: z.string().trim().min(1).optional(),
  address: z.string().trim().min(1).optional(),
});
export const UserValidation = {
  userValidation,
  userUpdateValidation,
};
