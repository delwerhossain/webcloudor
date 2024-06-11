import { Router } from 'express';
import { OrderControllers } from './Order.controller';
// import { CombineOrderReview } from '../../CombineControllers/SIngleCourseWithReviews';


const router = Router();

router.patch('/:orderId', OrderControllers.updateOrder);
router.post('/', OrderControllers.CreateOrder);
router.get('/', OrderControllers.GetAllOrder);
// router.get('/best', OrderControllers.GetBestReview);
// router.get(
//   '/:orderId/reviews',
//   CombineOrderReview.GetSingleOrderWithReviews,
// );
router.get('/:orderId', OrderControllers.GetSingleOrder);

//* order id neVER be deleted
// router.delete('/:orderId', OrderControllers.deleteOrder);



export const OrderRoutes = router;
