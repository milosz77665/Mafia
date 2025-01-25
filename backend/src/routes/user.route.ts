import express, { Router } from 'express';
import { deleteUser, newUser, updateUser } from '../controllers/user.controller';
import path from 'path';

const router = Router();

router.post('/', newUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.use('/avatars', express.static(path.join(__dirname, '..', 'avatars')));

export default router;
