import Login from '../services/login';
import { Request, Response } from 'express';

const generatorToken = async (req: Request, res: Response) => {
  const { status, data, message } = await Login(req.body);
  if (message) return res.status(status).json({ message });

  return res.status(status).json(data);
};

export default generatorToken;
