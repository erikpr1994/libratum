import { Request, Response } from 'express';

import { updateBalances, getBalances } from './balance';
import currenciesController from './currencies';

export default async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    await updateBalances(Number(userId));

    // TODO: Return the currency data inside the balance (Possibly using GraphQL)
    await getBalances(Number(userId)).then((balance) => {
      const balances = Object.entries(balance).map(async (data) => {
        
        const newData = data[1].get();

        const currencyData = await currenciesController.getCurrencyById(
          newData.currencyId
        );

        const currency = currencyData?.get();

        const returnData = { ...newData, ...currency };

        return returnData;
      });

      Promise.all(balances).then((data) => res.send(data));
    });
  } catch (err) {
    throw new Error(err);
  }
};
