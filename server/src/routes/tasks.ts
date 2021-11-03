import express from 'express';
import * as Task from '../controllers/tasks';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', Task.getAll);
router.get('/userId', auth, Task.getById);
router.post('/', auth, Task.create);
router.put('/:id', Task.update);
router.delete('/:id', Task.remove);

export default router;
