import { Router } from 'express';

import loginController from './controllers/login';
import userController from './controllers/user';
import dashboardController from './controllers/dashboard';
import balanceController from './controllers/balance';

const router = Router();

router.get('/login', loginController);
router.get('/me', userController);
router.get('/dashboard', dashboardController);
router.route('/rebalance').get().post();

router.get('/getBalance', balanceController.getBalance);

export default router;
