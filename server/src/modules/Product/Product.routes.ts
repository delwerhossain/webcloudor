import { Router } from 'express';
import { ProductControllers } from './Product.controller';
const router = Router();

router.get('/', ProductControllers.GetAllProducts);
router.get('/:id', ProductControllers.GetSingleProduct);
router.post('/', ProductControllers.CreateProduct);
router.post('/:id', ProductControllers.UpdateProduct);

export const ProductRoutes = router;
