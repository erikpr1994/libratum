import { CurrenciesModel } from 'src/models/currencies';
import { Currencies } from '../models';

export const getCurrencyById = async (currencyId: number) => {
  try {
    return await Currencies.findOne<CurrenciesModel>({
      where: {
        id: currencyId,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrencyByCode = async (currencyCode: string) => {
  try {
    return await Currencies.findOne<CurrenciesModel>({
      where: {
        code: currencyCode,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrencies = async () => {
  try {
    return await Currencies.findAll<CurrenciesModel>();
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCurrency = async (currency: string) => {
  try {
    let availableToRebalance = true;
    if (currency.startsWith('LD')) {
      availableToRebalance = false;
    }
    return Currencies.findOrCreate<CurrenciesModel>({
      where: {
        code: currency,
        availableToRebalance,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCurrencies = async (balances: object) => {
  try {
    return Object.entries(balances).forEach(
      (currency: [key: string, value: any]) => {
        const [key] = currency;
        let availableToRebalance = true;
        if (key.startsWith('LD')) {
          availableToRebalance = false;
        }
        return Currencies.findOrCreate<CurrenciesModel>({
          where: {
            code: key,
            availableToRebalance,
          },
        });
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  getCurrencyById,
};
