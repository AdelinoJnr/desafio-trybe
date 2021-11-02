import Task from '../services/tasks';
import { Request, Response } from 'express';

const create = async (req: Request, res: Response) => {
  const { status, data, message } = await Task.create(req.body, req.params.id);
  if (message) return res.status(status).json({ message });

  res.status(status).json(data);
};

const getAll = async (_req: Request, res: Response) => {
  const { status, data } = await Task.getAll();

  res.status(status).json(data);
};

const getById = async (req: Request, res: Response) => {
  const { status, data, message } = await Task.getById(req.params.id);
  if (message) return res.status(status).json({ message });

  res.status(status).json(data);
};

const remove = async (req: Request, res: Response) => {
  const { status, data, message } = await Task.remove(req.params.id);
  if (message) return res.status(status).json({ message });

  res.status(status).json({ message: data });
};

const update = async (req: Request, res: Response) => {
  const { status, data, message } = await Task.update(req.params.id, req.body);
  if (message) return res.status(status).json({ message });

  res.status(status).json(data);
};

export default { create, getAll, getById, remove, update }