import Express, { Application } from 'express';
import { config } from 'dotenv';
import { dbConfig } from './models';

import router from './router';

config();
const { PORT, ENVIRONMENT } = process.env;

if (ENVIRONMENT === 'TEST') {
  dbConfig
    .sync({ force: true })
    .then(() => {})
    .catch((error) => {
      throw new Error(error);
    });
} else {
  dbConfig
    .authenticate()
    .then(() => {})
    .catch((error) => {
      throw new Error(error);
    });
}

const app: Application = Express();

app.use(router);

app.listen(PORT);
