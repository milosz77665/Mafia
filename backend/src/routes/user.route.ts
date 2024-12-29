import { Router } from 'express';
import { deleteUser, newUser, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/new', newUser);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
