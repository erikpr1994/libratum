import { Users, ApiKeys } from '../models/index';

export const getUserData = async (userId: number) => {
  return await Users.findByPk(userId);
};

export const createUser = async () => {};

export const updateUser = async () => {};

export const getApiKeys = async (userId: number) => {
  try {
    return await ApiKeys.findByPk(userId);
  } catch (e) {
    throw new Error(e);
  }
};

export const saveApiKeys = async () => {};

export default () => {};
