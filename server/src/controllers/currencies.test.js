import Obj from './currencies';
// import { getCurrencyById } from './currencies';
// import { Currencies } from '../models';

describe('', () => {
  // console.log({getCurrencyById})
  jest.mock('../models');
  const spy = jest.spyOn(Obj, 'getCurrencyById');
  test('', () => {
    spy('string').then(() => {
      expect(spy).toHaveBeenCalled();
      expect(spy).toBeCalledWith(expect.any(Number));
    });
  });
});
// test('should get currency by id', () => {
//   const currency = {
//     id: 1,
//     code: 'EUR',
//     name: 'euro',
//     availableToRebalance: false,
//   };

//   const mockFn = jest.fn().mockReturnValue(currency);
//   console.log(mockFn())
//   const value = getCurrencyById(mockFn());
//   expect(mockFn).toHaveBeenCalled();
//   expect(mockFn).toHaveBeenCalledWith({
//     where: {
//       id: currency.id,
//     },
//   });
//   expect(value).toBe(currency);
// });

// test('should throw if Currencies.findOne throws', () => {
//   const myError = new Error();

//   expect(getCurrencyById(1)).toThrow(myError);
// });
