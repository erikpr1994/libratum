import { Request, Response } from 'express';

import balanceController from './balance';
import currenciesController from './currencies';

export default async (req: Request, res: Response) => {
  // TODO: Add a try catch
  const { userId } = req.body;

  await balanceController.updateBalances(userId);

  const currencies = await currenciesController.getCurrencies();
  const balances = await balanceController.getBalances(userId);
  res.send({
    balances,
    currencies,
  });
};
