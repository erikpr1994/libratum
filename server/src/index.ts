import Express, { Application, json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import { dbConfig } from './models';

import router from './router';

config();
const { PORT } = process.env;

const app: Application = Express();

app.use(cors());
app.use(json());
app.use(router);

dbConfig
  .authenticate()
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    throw new Error(error);
  });
