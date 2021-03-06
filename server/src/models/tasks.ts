import { ObjectId } from 'mongodb';

import { CreateTask, UpdateTask } from 'src/@types/tasks';
import connection from './connection';

export const create = async (data: CreateTask, userId: string) => {
  const db = await connection();
  const { insertedId } = await db.collection('tasks').insertOne({ ...data, userId });
  return { id: insertedId, ...data, userId };
};

export const getAll = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

export const getById = async (userId: string) => {
  if (!ObjectId.isValid(userId)) return null;
  const db = await connection();
  const tasks = await db.collection('tasks').find({ userId }).toArray();
  return tasks;
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
