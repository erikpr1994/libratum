import { config } from 'dotenv';

import { dbConfig, Users, ApiKeys } from '../models';
import { UserModel } from '../models/user';
import { ApiKeyModel } from '../models/apiKeys';

function createData() {
  try {
    config();
    const { API_KEY, SECRET_KEY } = process.env;

    dbConfig
      .sync({ force: true })
      .then(() => {
        Users.findOrCreate<UserModel>({
          where: {
            id: 1,
          },
        });

        ApiKeys.findOrCreate<ApiKeyModel>({
          where: {
            userId: 1,
            apiKey: API_KEY,
            secretKey: SECRET_KEY,
          },
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
}

createData();
