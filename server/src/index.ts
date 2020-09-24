import Express, { Application, json } from 'express';
import { config } from 'dotenv';
import { dbConfig } from './models';

import router from './router';

config();
const { PORT } = process.env;

dbConfig
  // .sync({ force: true })
  .authenticate()
  .then(() => {})
  .catch((error) => {
    throw new Error(error);
  });

const app: Application = Express();

app.use(json());
app.use(router);

app.listen(PORT);
