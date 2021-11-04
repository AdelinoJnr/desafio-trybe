import { Request } from 'express';

export interface CreateTask {
  task: string,
}

export interface UpdateTask {
  task: string,
}

export interface Payload {
  _id: string,
  name: string,
  email: string
}

export interface Myreq extends Request {
  user?: Payload
}
