import { CreateTask, UpdateTask } from 'src/@types/tasks';
import * as Schema from '../utils/schema';
import * as Task from '../models/tasks';

interface Payload {
  _id: string,
  name: string,
  email: string
}

export const create = async (data: CreateTask, _user: Payload) => {
  
  const { error } = Schema.createTask.validate(data);
  if (error) return { status: 400, message: 'Invalid entries!' };

  const task = await Task.create(data);

  return { status: 201, data: task };
};

export const getAll = async () => {
  const tasks = await Task.getAll();

  return { status: 200, data: tasks };
};

export const getById = async (user: Payload) => {
  const { _id } = user;
  const task = await Task.getById(_id);
  if (!task) return { status: 404, message: 'Task not found!' };

  return { status: 200, data: task };
};

export const remove = async (id: string) => {
  const task = await Task.getById(id);
  if (!task) return { status: 404, message: 'Task not found!' };

  await Task.remove(id);

  return { status: 204, data: 'Sucess removed!' };
};

export const update = async (id: string, data: UpdateTask) => {
  const { error } = Schema.createTask.validate(data);
  if (error) return { status: 400, message: 'Invalid entries!' };

  const task = await Task.update(id, data);
  if (!task) return { status: 404, message: 'Task not found!' };

  return { status: 200, data: task };
};
