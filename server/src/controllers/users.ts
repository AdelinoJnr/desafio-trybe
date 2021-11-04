import { NextFunction, Request, Response } from 'express';
import * as User from '../services/users';

import { Myreq } from 'src/@types/tasks';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { status, data, message } = await User.create(req.body);
  if (message) return next({ message, status });

  return res.status(status).json(data);
};

export const getAll = async (_req: Request, res: Response) => {
  const { status, data } = await User.getAll();

  return res.status(status).json(data);
};

export const getById = async (req: Request, res: Response) => {
  const { status, data, message } = await User.getById(req.params.id);
  if (message) return res.status(status).json({ message });

  return res.status(status).json(data);
};

export const decodeUser = async (req: Myreq, res: Response) => {
  const user = req.user;
  
  return res.status(200).json(user);
};