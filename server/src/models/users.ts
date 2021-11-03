import { CreateUser } from 'src/@types/users';
import { ObjectId } from 'mongodb';
import connection from './connection';

export const create = async (data: CreateUser) => {
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne({ ...data });
  return { id: insertedId, ...data };
};

export const getAll = async () => {
  const db = await connection();
  const users = await db.collection('users').find().toArray();
  return users;
};

export const getById = async (id: string) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
  return user;
};

export const findByEmail = async (email: string) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};
