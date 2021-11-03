import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { SECRET } from '../database';

interface Payload extends JwtPayload {
  _id: string,
  name: string,
  email: string
}

interface Myreq extends Request {
  user?: Payload
}

const auth = async (req: Myreq, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token invalid!' });

  try {
    const { data } = jwt.verify(token, SECRET) as Payload;

    req.user = data;
    
    return next();
  } catch (_e) {
    return res.status(401).json({ message: 'Token invalid!' });
  }
};

export default auth;
