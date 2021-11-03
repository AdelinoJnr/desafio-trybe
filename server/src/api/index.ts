import express from 'express';

import userRouter from '../routes/users';
import taskRouter from '../routes/tasks';
import loginRouter from '../routes/login';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users
app.use('/api/users', userRouter);

// Task
app.use('/api/tasks', taskRouter);

// Login
app.use('/api/login', loginRouter);

export default app;
