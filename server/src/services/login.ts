import jwt from 'jsonwebtoken';
import { LoginUser } from 'src/@types/users';
import { SECRET } from 'src/database';
import * as User from '../models/users';

const generatorToken = async (data: LoginUser) => {
  const { email, password } = data;
  const user = await User.findByEmail(email);
  if (!user) return { status: 404, message: 'User not found!' };
  if (user.password !== password) return { status: 401, message: 'Email or Password invalid!' };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { password: _, ...newUser } = user;
  const token = jwt.sign({ data: newUser }, SECRET);

  return { status: 200, data: { token } };
};

export default generatorToken;
