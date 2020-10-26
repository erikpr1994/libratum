import {
  getBalances,
  getBalance,
  updateBalance,
} from './balance';
import { UserBalances } from '../models';

jest.mock('../models', () => ({ UserBalances: () => {} }));
const mockUserBalances = {
  userId: 4,
  currencyId: 1,
  balance: 10,
  totalInBTC: 10,
  totalInEur: 10,
  balancePercentage: 10,
  value: 10,
};

describe('should return a user balance object with a given user id', () => {
  UserBalances.findAll = jest.fn();
  UserBalances.findAll.mockResolvedValue(mockUserBalances);
  test('UserBalances.findOne should have been called once', async () => {
    await getBalances(mockUserBalances.userId);
    expect(UserBalances.findAll).toHaveBeenCalled();
    expect(getBalances(mockUserBalances.userId)).resolves.toBe(
      mockUserBalances
    );
  });

  test('should return user balance', async () => {
    expect(getBalances(mockUserBalances.userId)).resolves.toBe(
      mockUserBalances
    );
  });
});

describe('should get user balances', () => {
  const req = {
    body: {
      userId: mockUserBalances.userId,
      currencyId: mockUserBalances.currencyId,
    },
  };
  const res = {
    send: jest.fn(() => res).mockName('send'),
    status: jest.fn(() => res).mockName('status'),
  };

  UserBalances.findOne = jest.fn();
  UserBalances.findOne.mockResolvedValue(mockUserBalances);

  test('UserBalances.findOne should have been called once', async () => {
    await getBalance(req, res);
    expect(UserBalances.findOne).toHaveBeenCalled();
  });

  test('should call res.send with user balance', async () => {
    await getBalance(req, res);
    expect(res.send).toHaveBeenCalledWith(mockUserBalances);
  });
});

describe('should update user balance', () => {
  UserBalances.findOrCreate = jest.fn();
  UserBalances.update = jest.fn();
  UserBalances.findOrCreate.mockResolvedValue(mockUserBalances);
  UserBalances.update.mockResolvedValue(mockUserBalances);

  test('UserBalances.findOrCreate should have been called once', async () => {
    await updateBalance(
      mockUserBalances.currencyId,
      mockUserBalances.userId,
      mockUserBalances.balance,
      mockUserBalances.totalInBTC,
      mockUserBalances.totalInEur,
      mockUserBalances.value,
      mockUserBalances.balancePercentage
    );
    expect(UserBalances.findOrCreate).toHaveBeenCalled();
  });

  test('UserBalances.update should have been called once', async () => {
    await updateBalance(
      mockUserBalances.currencyId,
      mockUserBalances.userId,
      mockUserBalances.balance,
      mockUserBalances.totalInBTC,
      mockUserBalances.totalInEur,
      mockUserBalances.value,
      mockUserBalances.balancePercentage
    );
    expect(UserBalances.update).toHaveBeenCalled();
  });

  test('should update user balance', async () => {
    expect(
      updateBalance(
        mockUserBalances.currencyId,
        mockUserBalances.userId,
        mockUserBalances.balance,
        mockUserBalances.totalInBTC,
        mockUserBalances.totalInEur,
        mockUserBalances.value,
        mockUserBalances.balancePercentage
      )
    ).resolves.toBe(mockUserBalances);
  });
});


describe('should update user balances', () => {
  test('should return user balance', async () => {
    expect(getBalances(mockUserBalances.userId)).resolves.toBe(
      mockUserBalances
    );
  });
});




/*
export const updateBalances = async (userId: number) => {
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
*/