import dashboardController from './dashboard';
import { mockUserBalances } from './mockUserBalances';

describe('should display data on dashboard', () => {
  const req = {
    query: {
      userId: mockUserBalances[0].userId,
    }
  };
  const res = {
    send: jest.fn(() => res).mockName('send'),
    status: jest.fn(() => res).mockName('status'),
  };

  const updateBalances = jest.fn();
  const getBalances = jest.fn();


  test('updateBalances should have been called once', async () => {
    await dashboardController(req, res);
    expect(updateBalances).toHaveBeenCalled();
  });

  test('getBalances should have been called once', async () => {
    await dashboardController(req, res);
    expect(getBalances).toHaveBeenCalled();
  });
});
