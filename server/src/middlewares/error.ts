import { Request, Response, NextFunction } from 'express';

interface Error {
  status: number,
  message: string,
}

const error = async (error: Error, _req: Request, res: Response, next: NextFunction) => {
  const { message, status } = error;
  res.status(status).json({ message });
};

export default error;