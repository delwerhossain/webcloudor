import { z } from 'zod';

const categoryValidation = z.object({
  name: z.string().trim().min(1),
});
const categoryUpdateValidation = z.object({
  name: z.string().trim().min(1).optional(),
});
export const CategoryValidation = {
  categoryValidation,
  categoryUpdateValidation,
};
