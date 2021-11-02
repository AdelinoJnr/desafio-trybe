import Joi from "joi";

export const createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createTask = Joi.object({
  task: Joi.string().required(),
});

export const updateTask = Joi.object({
  userId: Joi.number().required(),
  task: Joi.string().required(),
});