import { literal } from 'sequelize';

import { Request, Response } from 'express';

import { UserBalances } from '../models';
import { UserBalanceModel } from '../models/userBalances';
import { CurrenciesModel } from '../models/currencies';

import binance from '../binanceApi';

import { getApiKeys } from './user';

import currenciesController from './currencies';

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
  balancePercentage: number | null = null
) => {
  try {
    return UserBalances.findOrCreate<UserBalanceModel>({
      where: {
        userId,
        currencyId,
        balance,
        balancePercentage,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

const updateBalancePercentage = async (
  currency: CurrenciesModel,
  balancePercentage?: number
) => {
  // TODO: Add a try catch
  // TODO: Crear función para comprobar que el balancePercentage da 100% en total o controlar en frontend
  return UserBalances.update(
    { balancePercentage },
    {
      where: {
        userId: 1, // TODO: Change userId to use the one coming from the request
        currencyId: currency.id,
      },
    }
  );
};

/* TODO New Feature: 
  Crear una función para calcular los nuevos balances cuando cambia una porcentage o hacerlo en el frontend 
*/

const updateBalances = async (userId: number) => {
  try {
    const response = await getApiKeys(userId);
    const data = response?.get();
    if (data) {
      const { apiKey, secretKey } = data;
      const balance = await binance(apiKey, secretKey).balance();

      return Object.entries(balance).forEach(async (item: any) => {
        const balance = Number(item[1].available) + Number(item[1].onOrder);
        const currency = item[0];
        currenciesController.updateCurrency(currency);
        if (balance) {
          const currencyType = await currenciesController.getCurrencyByCode(
            currency
          );

          if (currencyType) {
            const { id: currencyId } = currencyType.get();
            updateBalance(currencyId, balance, userId);
            return item;
          }
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
