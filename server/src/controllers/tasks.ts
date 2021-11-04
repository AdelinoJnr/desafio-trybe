import { Request, Response } from 'express';
import * as Task from '../services/tasks';

import { Myreq, Payload } from 'src/@types/tasks';

export const create = async (req: Myreq, res: Response) => {
  const user: Payload | undefined = req.user;
  
  const { status, data, message } = await Task.create(req.body, (user as any));
  if (message) return res.status(status).json({ message });

  return res.status(status).json(data);
};

export const getAll = async (_req: Request, res: Response) => {
  const { status, data } = await Task.getAll();

  return res.status(status).json(data);
};

export const getById = async (req: Myreq, res: Response) => {
  const user: Payload | undefined = req.user;

  const { status, data, message } = await Task.getById((user as any));
  if (message) return res.status(status).json({ message });

  return res.status(status).json(data);
};

export const remove = async (req: Request, res: Response) => {
  const { status, data, message } = await Task.remove(req.params.id);
  if (message) return res.status(status).json({ message });

  return res.status(status).json({ message: data });
};

export const update = async (req: Request, res: Response) => {

  const { status, data, message } = await Task.update(req.params.id, req.body);
  if (message) return res.status(status).json({ message });

  return res.status(status).json(data);
};
