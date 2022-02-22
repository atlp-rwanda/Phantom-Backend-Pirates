import { Router } from 'express';
const router = Router();
import "@babel/polyfill"
import { createUser, getUser, getUsers, deleteUser, updateUsers } from '../controllers/user.controller';

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUsers);

export default router;