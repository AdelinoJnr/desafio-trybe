import express from 'express';
import cors from 'cors';

import userRouter from '../routes/users';
import taskRouter from '../routes/tasks';
import loginRouter from '../routes/login';

import MiddlewareError from '../middlewares/error';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Users
app.use('/api/users', userRouter);

// Task
app.use('/api/tasks', taskRouter);

// Login
app.use('/api/login', loginRouter);

// Middlewares Error
app.use(MiddlewareError);

export default app;
