import { getBalances } from './balance';

test('should return a user balance object with a given user id', () => {
  const balance = {
    userId: 2,
    currencyId: 1,
  };
  expect(getBalances(2)).resolves.toEqual(balance);
});
