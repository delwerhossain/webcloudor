import { Router } from 'express';
import { CategoryControllers } from './Category.controller';
const router = Router();

router.get('/', CategoryControllers.GetAllCategories);
router.get('/:id', CategoryControllers.GetSingleCategory);
router.post('/', CategoryControllers.CreateCategory);
// update category
router.patch('/:id', CategoryControllers.UpdateCategory);

export const CategoryRoutes = router;
