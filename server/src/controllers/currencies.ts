import { CurrenciesModel } from 'src/models/currencies';
import { Currencies } from '../models';

const getCurrencyById = async (currencyId: number) => {
  // TODO: Add a try catch
  return await Currencies.findOne<CurrenciesModel>({
    where: {
      id: currencyId,
    },
  });
};

const getCurrencyByCode = async (currencyCode: string) => {
  // TODO: Add a try catch
  return await Currencies.findOne<CurrenciesModel>({
    where: {
      code: currencyCode,
    },
  });
};

const getCurrencies = async () => {
  // TODO: Add a try catch
  return await Currencies.findAll<CurrenciesModel>();
};

const updateCurrency = async (currency: string) => {
  // TODO: Add a try catch
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
};

const updateCurrencies = async (balances: object) => {
  // TODO: Add a try catch
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
};

export default {
  getCurrencyById,
  getCurrencyByCode,
  getCurrencies,
  updateCurrency,
  updateCurrencies,
};
