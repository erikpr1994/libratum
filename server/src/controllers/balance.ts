import { literal } from 'sequelize';

import { Request, Response } from 'express';

import { UserBalances } from '../models';
import { UserBalanceModel } from '../models/userBalances';
import { CurrenciesModel } from '../models/currencies';

import binance from '../binanceApi';

import { getApiKeys } from './user';

import currenciesController from './currencies';
import currenciesConverter from './currenciesConverter';

const getBalances = async (userId: number) => {
  const query = literal('balance > 0');

  const balance = await UserBalances.findAll<UserBalanceModel>({
    where: {
      userId: userId,
      balance: query,
    },
  });

  return balance.map((item) => {
    return item;
  });
};

const getBalance = async (req: Request, res: Response) => {
  const userId: number = req.body.userId;
  const currencyId: number = req.body.currencyId;
  if (!userId || !currencyId) {
    res.sendStatus(500);
  }
  try {
    const balance = await UserBalances.findOne<UserBalanceModel>({
      where: {
        userId,
        currencyId,
      },
    });

    res.send(balance);
  } catch (e) {
    res.send(e);
  }
};

const updateBalance = async (
  currencyId: number,
  balance: number,
  userId: number,
  totalInBTC: number,
  totalInEur: number,
  balancePercentage: number | null = null
) => {
  try {
    const userBalance = await UserBalances.findOrCreate<UserBalanceModel>({
      where: {
        userId,
        currencyId,
        balance,
        totalInBTC,
        totalInEur,
        balancePercentage,
      },
    });

    const [data, isNew] = userBalance;
    const { balance: oldBalance } = data.get();

    if (
      (balance && oldBalance && oldBalance !== balance) ||
      (isNew && oldBalance > 0)
    ) {
      if (!isNew) {
        await UserBalances.update<UserBalanceModel>(
          { balance, totalInBTC, totalInEur },
          {
            where: {
              userId,
              currencyId,
            },
          }
        );

        // calculateBalance(userId);
      }
    }
  } catch (e) {
    throw new Error(e);
  }
};

const updateBalancePercentage = async (
  currency: CurrenciesModel,
  userId: number,
  balancePercentage?: number
) => {
  // TODO: Add a try catch
  // TODO: Crear función para comprobar que el balancePercentage da 100% en total o controlar en frontend

  UserBalances.update(
    { balancePercentage },
    {
      where: {
        userId,
        currencyId: currency.id,
      },
    }
  );
};

/* TODO New Feature: 
  Crear una función para calcular los nuevos balances cuando cambia una porcentage o hacerlo en el frontend 

const calculateBalance = async (userId: number) => {
  const balances = await getBalances(userId);
  const newBalance = Object.entries(balances).map((data) => {
    const { balance, balancePercentage, currencyId, userId } = data[1].get();
    return { balance, balancePercentage, currencyId, userId };
  });

  newBalance.forEach((item) => {
    console.log(item);
  });
};
*/

const updateBalances = async (userId: number) => {
  try {
    const response = await getApiKeys(userId);
    const data = response?.get();
    if (data) {
      const { apiKey, secretKey } = data;
      const balance = await binance(apiKey, secretKey).balance();

      Object.entries(balance).forEach(async (item: any) => {
        const total = Number(item[1].available) + Number(item[1].onOrder);
        const totalInBTC = currenciesConverter.convertToBTC();
        const totalInEur = currenciesConverter.convertToEUR();
        const currency = item[0];
        currenciesController.updateCurrency(currency);

        const currencyType = await currenciesController.getCurrencyByCode(
          currency
        );

        if (currencyType) {
          const { id: currencyId } = currencyType.get();
          updateBalance(currencyId, total, userId, totalInBTC, totalInEur);
        }
      });
    }
  } catch (e) {
    throw new Error(e);
  }
};

export default {
  getBalance,
  getBalances,
  updateBalance,
  updateBalances,
  updateBalancePercentage,
};
