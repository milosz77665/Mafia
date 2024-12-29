import { Router } from 'express';
import { newUser, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/new', newUser);
router.patch('/update/:id', updateUser);

export default router;
