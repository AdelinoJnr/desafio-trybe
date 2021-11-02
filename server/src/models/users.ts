import connection from './connection';

import { createUser } from 'src/@types/users';
import { ObjectId } from 'mongodb';

const create = async (data: createUser) => {
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({ ...data });
  return { id: insertedId, ...data };
};

const getAll = async () => {
  const db = await connection();
  const users = db.collection('users').find().toArray();
  return users;
};

const getById = async (id: string) => {
  if (!ObjectId.isValid(id)) return null
  const db = await connection();
  const user = db.collection('users').findOne({ _id: new ObjectId(id) });
  return user;
};

const findByEmail = async (email: string) => {
  const db = await connection();
  const user = db.collection('users').findOne({ email });
  return user;
};

export default { getAll, create, getById, findByEmail };