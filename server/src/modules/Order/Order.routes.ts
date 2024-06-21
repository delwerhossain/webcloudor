import { Router } from 'express';
import { OrderControllers } from './Order.controller';
// import { CombineOrderReview } from '../../CombineControllers/SIngleCourseWithReviews';

const router = Router();

router.patch('/:orderID', OrderControllers.updateOrder);
router.post('/', OrderControllers.CreateOrderAndUser);
router.get('/', OrderControllers.GetAllOrder);
// router.get('/best', OrderControllers.GetBestReview);
// router.get(
//   '/:orderID/reviews',
//   CombineOrderReview.GetSingleOrderWithReviews,
// );
router.get('/:orderID', OrderControllers.GetSingleOrder);

//* order id neVER be deleted
// router.delete('/:orderID', OrderControllers.deleteOrder);

export const OrderRoutes = router;
