import { ObjectId } from 'mongodb';

import { CreateTask, UpdateTask } from 'src/@types/tasks';
import connection from './connection';

export const create = async (data: CreateTask, userId: string) => {
  const db = await connection();
  const { insertedId } = await db.collection('tasks').insertOne({ ...data, userId });
  return { id: insertedId, ...data };
};

export const getAll = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

export const getById = async (id: string) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });
  return task;
};

export const remove = async (id: string) => {
  const db = await connection();
  await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
};

export const update = async (id: string, data: UpdateTask) => {
  const db = await connection();
  const task = await db.collection('tasks').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...data } });
  return task;
};
