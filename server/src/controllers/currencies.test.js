import {
  getCurrencies,
  getCurrencyByCode,
  getCurrencyById,
  updateCurrency
} from './currencies';
import { Currencies } from '../models';

jest.mock('../models', () => ({ Currencies: () => {} }));
const mockCurrencies = {
  id: 1,
  code: 'EUR',
  name: 'euro',
  availableToRebalance: true,
};
const mockTable = [
  { id: 1, code: 'EUR', name: 'euro', availableToRebalance: true },
  { id: 2, code: 'BTC', name: 'bitcoin', availableToRebalance: true },
];

describe('Get currency by id', () => {
  const input = 1;
  Currencies.findOne = jest.fn();
  Currencies.findOne.mockResolvedValue(mockCurrencies);
  test('Currencies.findOne should have been called once', async () => {
    await getCurrencyById(input);
    expect(Currencies.findOne).toHaveBeenCalled();
  });
  test('Currencies.findOne should have been called with currencyId', async () => {
    await getCurrencyById(input);
    expect(Currencies.findOne).toHaveBeenCalledWith({
      where: {
        id: input,
      },
    });
  });
  test('getCurrencyById should return a currency row', async () => {
    expect(getCurrencyById(input)).resolves.toBe(mockCurrencies);
  });
  test('getCurrencyById should throw an error if query to database fails', async () => {
    Currencies.findOne.mockRejectedValueOnce('500');
    await expect(getCurrencyById(input)).rejects.toThrow('500');
  });
});

describe('Get Currency By Code', () => {
  const input = 'EUR';
  Currencies.findOne = jest.fn();
  Currencies.findOne.mockResolvedValue(mockCurrencies);
  test('Currencies.findOne should be called once', async () => {
    await getCurrencyByCode(input);
    expect(Currencies.findOne).toHaveBeenCalled();
  });
  test('Currencies.findOne should have been called with a currencyCode', async () => {
    await getCurrencyByCode(input);
    expect(Currencies.findOne).toHaveBeenCalledWith({
      where: {
        code: input,
      },
    });
  });
  test('GetCurrencyByCode should return a currency row', async () => {
    expect(getCurrencyByCode(input)).resolves.toBe(mockCurrencies);
  });
  test('GetCurrencyByCode should throw an error if query to the database fails', async () => {
    Currencies.findOne.mockRejectedValue('500');
    await expect(getCurrencyByCode(input)).rejects.toThrow('500');
  });
});
describe('Get Currencies works', () => {
  Currencies.findAll = jest.fn();
  Currencies.findAll.mockResolvedValue(mockTable);
  test('Currencies.findAll is called once', async () => {
    await getCurrencies();
    expect(Currencies.findAll).toHaveBeenCalled();
  });
  test('Currencies.findAll should return currencies table from dB', async () => {
    expect(getCurrencies()).resolves.toBe(mockTable);
  });
  test('getCurrencies should throw an error if query to the database fails', async () => {
    Currencies.findAll.mockRejectedValue('500');
    await expect(getCurrencies()).rejects.toThrow('500');
  });
});
describe('updateCurrency works', () => {
  const input = mockCurrencies.code;
  // mockUpdated = {};
  const inputLD = {
    id: 1,
    code: 'LDEUR',
    name: 'euro',
    availableToRebalance: true,
  };
  Currencies.findOrCreate = jest.fn();
  Currencies.findOrCreate.mockResolvedValue(); // Uncompleted
  test('Currencies.findOrCreate is called once', async () => {
    await updateCurrency(input);
    expect(Currencies.findOrCreate).toHaveBeenCalled();
  });
  // Jaume: is this test really necessary?
  test('updateCurrency is called with a currency (string)', async () => {
    await updateCurrency(input);
    expect(Currencies.findOrCreate).toHaveBeenCalledWith({
      where: {
        code: input,
        availableToRebalance: mockCurrencies.availableToRebalance,
      },
    });
  });
  test('If currency starts with "LD", "availableToRebalance" shoudl be set to false', async () => {
    await updateCurrency(inputLD.code);
    expect(Currencies.findOrCreate).toHaveBeenCalledWith({
      where: {
        code: inputLD.code,
        availableToRebalance: false,
      },
    });
  });
  // test('updateCurreny updates specific row', async () => {});
  // test('Throw error if code is not found in dB', async () => {
  //   Currencies.findOrCreate.mockRejectedValue('500');
  //   await expect(updateCurrency('fakeString')).rejects.toThrow('500');
  // });
});
