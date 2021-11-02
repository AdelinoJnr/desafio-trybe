import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { SECRET } from '../database';

interface Myreq extends Request {
  user?: string
}

const auth = async (req: Myreq, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token invalid!' });

  try {
    const payload = jwt.verify(token, SECRET);
    // req.user = payload.data;
    return next();
  } catch (_e) {
    return res.status(401).json({ message: 'Token invalid!' });
  }
};

export default auth;
