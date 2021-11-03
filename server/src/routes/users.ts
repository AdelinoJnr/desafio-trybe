import express from 'express';
import * as User from '../controllers/users';

const router = express.Router();

router.get('/', User.getAll);
router.get('/:id', User.getById);
router.post('/', User.create);

export default router;
