import connection from './connection';
import { ObjectId } from 'mongodb';

import { createTask, updateTask } from 'src/@types/tasks';

const create = async (data: createTask, userId: string) => {
  const db = await connection();
  const { insertedId } = await db.collection('tasks').insertOne({ ...data, userId });
  return { id: insertedId, ...data };
};

const getAll = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

const getById = async (id: string) => {
  if (!ObjectId.isValid(id)) return null
  const db = await connection();
  const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });
  return task;
};

const remove = async (id: string) => {
  const db = await connection();
  await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
};

const update = async (id: string, data: updateTask) => {
  const db = await connection();
  const task = await db.collection('tasks').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { ...data } });
  return task;
};

export default { getAll, create, getById, remove, update };