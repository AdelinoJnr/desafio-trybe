import Task from '../models/tasks';
import { createTask, updateTask } from 'src/@types/tasks';
import Schema from 'src/utils/schema';

const create = async (data: createTask, userId: string) => {
  const { error } = Schema.createTask.validate(data);
  if (error) return { status: 400, message: 'Invalid entries!' };

  const task = await Task.create(data, userId);

  return { status: 201, data: task };
};

const getAll = async () => {
  const tasks = await Task.getAll();
  
  return { status: 200, data: tasks };
};

const getById = async (id: string) => {
  const task = await Task.getById(id);
  if (!task) return { status: 404, message: 'Task not found!' };

  return { status: 200, data: task };
};

const remove = async (id: string) => {
  const task = await Task.getById(id);
  if (!task) return { status: 404, message: 'Task not found!' };

  await Task.remove(id);

  return { status: 204, data: 'Sucess removed!' }
}

const update = async (id: string, data: updateTask) => {
  const { error } = Schema.createTask.validate(data);
  if (error) return { status: 400, message: 'Invalid entries!' };

  const task = await Task.update(id, data);
  if (!task) return { status: 404, message: 'Task not found!' };

  return { status: 200, data: task }
}

export default { create, getAll, getById, update, remove }