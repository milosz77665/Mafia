import { Router } from 'express';
import { deleteUser, newUser, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/', newUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
