import { Router } from 'express';
import { CategoryControllers } from './Category.controller';
const router = Router();

router.get('/', CategoryControllers.GetAllCategories);
router.get('/:id', CategoryControllers.getSingleCategory);
router.post('/', CategoryControllers.CreateCategory);

export const CategoryRoutes = router;
