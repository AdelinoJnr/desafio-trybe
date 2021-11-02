import connection from './connection';

import { createUser } from 'src/@types/users';
import { ObjectId } from 'mongodb';

export const create = async (data: createUser) => {
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({ ...data });
  return { id: insertedId, ...data };
};

export const getAll = async () => {
  const db = await connection();
  const users = db.collection('users').find().toArray();
  return users;
};

export const getById = async (id: string) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const user = db.collection('users').findOne({ _id: new ObjectId(id) });
  return user;
};

export const findByEmail = async (email: string) => {
  const db = await connection();
  const user = db.collection('users').findOne({ email });
  return user;
};

export default { getAll, create, getById, findByEmail };