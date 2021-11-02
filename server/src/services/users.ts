import User from '../models/users';
import Schema from '../utils/schema';
import { createUser } from 'src/@types/users';

const create = async (data: createUser) => {
  const { error } = Schema.createUser.validate(data);
  if (error) return { status: 400, message: 'Invalid entries!' }

  const findEmail = await User.findByEmail(data.email);
  if (findEmail) return { status: 400, message: 'User alrealy exist!' }

  const user = await User.create(data);
  const { password: _, ...newUser } = user;

  return { status: 201, data: newUser };
};

const getAll = async () => {
  const users = await User.getAll();

  return { status: 200, data: users }
};

const getById = async (id: string) => {
  const user = await User.getById(id);
  if (!user) return { status: 404, message: 'User not found!' };

  return { status: 200, data: user }
};

export default { getAll, getById, create }