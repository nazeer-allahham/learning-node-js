import { UsersController } from './../controllers/users-controller';
import { Router } from 'express';

const router = Router();

router.get('/', UsersController.index);
router.get('/add', UsersController.create);
router.post('/add', UsersController.save);
router.get('/edit/:id', UsersController.edit);
router.post('/edit/:id', UsersController.update);
router.get('/remove/:id', UsersController.destroy);

export default router;