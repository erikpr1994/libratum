import { literal } from 'sequelize';

import { Request, Response } from 'express';

import { UserBalances } from '../models';
import { UserBalanceModel } from '../models/userBalances';
import { CurrenciesModel } from '../models/currencies';

import binance from '../binanceApi';

import { getApiKeys } from './user';

import currenciesController from './currencies';

const getBalances = async (userId: number) => {
  try {
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
  } catch (err) {
    throw new Error(err.message);
  }
};

const getBalance = async (req: Request, res: Response) => {
  try {
    const userId: number = req.body.userId;
    const currencyId: number = req.body.currencyId;
    if (!userId || !currencyId) {
      res.sendStatus(500);
    }
    const balance = await UserBalances.findOne<UserBalanceModel>({
      where: {
        userId,
        currencyId,
      },
    });

    res.send(balance);
  } catch (e) {
    res.send(e.message);
  }
};

const updateBalance = async (
  currencyId: number,
  userId: number,
  balance: number,
  totalInBTC: number,
  totalInEur: number,
  value: number,
  balancePercentage: number | undefined = undefined
) => {
  try {
    UserBalances.findOrCreate<UserBalanceModel>({
      where: {
        userId,
        currencyId,
      },
    });

    await UserBalances.update<UserBalanceModel>(
      {
        balance: balance,
        totalInBTC: totalInBTC,
        totalInEur: totalInEur,
        value: value,
        balancePercentage,
      },
      {
        where: {
          userId,
          currencyId,
        },
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateBalancePercentage = async (
  currency: CurrenciesModel,
  userId: number,
  balancePercentage?: number
) => {
  // TODO: Crear función para comprobar que el balancePercentage da 100% en total o controlar en frontend
  try {
    UserBalances.update(
      { balancePercentage },
      {
        where: {
          userId,
          currencyId: currency.id,
        },
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
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
      const { BTCEUR } = await binance(apiKey, secretKey).prices(`BTCEUR`);

      Object.entries(balance).forEach(async (item: any) => {
        const total = Number(item[1].available) + Number(item[1].onOrder);
        const currency = item[0];
        currenciesController.updateCurrency(currency);

        const currencyType = await currenciesController.getCurrencyByCode(
          currency
        );

        if (currencyType) {
          let { id: currencyId, code } = currencyType.get();

          if (code.startsWith('LD')) {
            code = code.substring(2);
          }

          let pair = `${code}BTC`;
          if (code === 'USDT') {
            pair = `EUR${code}`;
          }

          const pairs = await binance(apiKey, secretKey)
            .prices(pair)
            .then((prices: any) => prices)
            .catch(() => {});

          let totalInBTC, totalInEur, value;
          if (total > 0) {
            if (pairs && pairs[`${pair}`] !== undefined) {
              value = pairs[`${pair}`];
              totalInBTC = total * value;
              totalInEur = BTCEUR * totalInBTC;
            }
          }

          if (code === 'USDT') {
            totalInBTC = 0;
            totalInEur = value * total;
          }

          if (!totalInBTC) totalInBTC = 0;
          if (!totalInEur) totalInEur = 0;

          updateBalance(
            currencyId,
            userId,
            total,
            totalInBTC,
            totalInEur,
            value
          );
        }
      });
    }
  } catch (err) {}
};

export default {
  getBalance,
  getBalances,
  updateBalance,
  updateBalances,
  updateBalancePercentage,
};
