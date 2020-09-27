import { Request, Response } from 'express';

import balanceController from './balance';
import currenciesController from './currencies';

export default async (req: Request, res: Response) => {
  // TODO: Add a try catch
  const { userId } = req.query;

  await balanceController.updateBalances(Number(userId));

  // TODO: Return the currency data inside the balance (Possibly using GraphQL)
  const currencies = await currenciesController.getCurrencies();
  const balances = await balanceController.getBalances(Number(userId));
  res.send({
    balances,
    currencies,
  });
};
