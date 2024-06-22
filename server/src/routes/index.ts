import { Router } from 'express';
import { UserRoutes } from '../modules/User/User.routes';
import { OrderRoutes } from '../modules/Order/Order.routes';
import { CategoryRoutes } from '../modules/Category/Category.routes';
import { ReviewRoutes } from '../modules/Review/Review.routes';
import { ProductRoutes } from '../modules/Product/Product.routes';


const router = Router();


const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
