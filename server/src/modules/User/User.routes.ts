import { Router } from 'express';
import { UserControllers } from './User.controller';
const router = Router();

router.get('/', UserControllers.GetAllUsers);
router.get('/:id', UserControllers.GetSingleUser);
router.post('/', UserControllers.CreateUser);
router.patch('/:id', UserControllers.UpdateUser);

export const UserRoutes = router;
