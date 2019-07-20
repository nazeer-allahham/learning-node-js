import { UsersController } from './../controllers/users-controller';
import { Router } from 'express';

const router = Router();

router.get('/', UsersController.index);
router.get('/add', UsersController.create);
router.post('/add', UsersController.save);

export default router;