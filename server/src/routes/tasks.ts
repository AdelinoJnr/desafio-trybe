import express from 'express';
import Task from '../controllers/tasks';

const router = express.Router();

router.get('/', Task.getAll);
router.get('/:id', Task.getById);
router.post('/', Task.create);
router.put('/:id', Task.update);
router.delete('/:id', Task.remove);

export default router;