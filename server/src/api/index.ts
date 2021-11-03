import express from 'express';

import userRouter from '../routes/users';
import taskRouter from '../routes/tasks';
import loginRouter from '../routes/login';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users
app.use('/api/user', userRouter);

// Task
app.use('/api/task', taskRouter);

// Login
app.use('/api/login', loginRouter);

export default app;
