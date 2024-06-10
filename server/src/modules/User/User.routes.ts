import { Router } from 'express';
import { UserControllers } from './User.controller';
const router = Router();

router.get('/', UserControllers.GetAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.post('/', UserControllers.CreateUser);
router.post('/:id', UserControllers.UpdateUser);

export const UserRoutes = router;
