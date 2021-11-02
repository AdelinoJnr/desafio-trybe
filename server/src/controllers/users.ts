import User from '../services/users';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
  const { status, data, message } = await User.create(req.body);
  if (message) return res.status(status).json({ message });

  res.status(status).json(data);
};

const getAll = async (_req: Request, res: Response) => {
  const { status, data } = await User.getAll();

  res.status(status).json(data);
};

const getById = async (req: Request, res: Response) => {
  const { status, data, message } = await User.getById(req.params.id);
  if (message) return res.status(status).json({ message });

  res.status(status).json(data);
};

export default { create, getAll, getById }