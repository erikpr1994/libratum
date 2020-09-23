import Express from 'express';
import { config } from 'dotenv';

import router from './router';

config();
const app = Express();

const { PORT } = process.env;

app.use(router);

app.listen(PORT);
