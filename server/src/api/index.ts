import expres from 'express';

import userRouter from '../routes/users';
import taskRouter from '../routes/tasks';

const app = expres();
app.use(expres.json());

// Users
app.use('/api/user', userRouter);

// Task
app.use('/api/task', taskRouter);

export default app;
