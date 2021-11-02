import { Request, Response } from 'express';

interface Myreq extends Request {
  user?: string
}

const auth = async (req: Myreq, res: Response) => {
  console.log(req, res);
  req.user = 'Adelino';
};

export default auth;
