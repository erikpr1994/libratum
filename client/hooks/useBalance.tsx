import { createContext, useState, ReactNode } from 'react';

const defaultBalanceContext = {
  balance: [],
  setBalance: (object) => {},
};

export const balanceContext = createContext(defaultBalanceContext);

type BalanceProviderType = {
  children: ReactNode;
};

export function BalanceProvider({ children }: BalanceProviderType) {
  const setBalance = (balance) => {
    setBalanceState(balance);
  };

  const initialBalanceState = { ...defaultBalanceContext, setBalance };

  const [balanceState, setBalanceState] = useState(initialBalanceState);

  return (
    <balanceContext.Provider value={balanceState}>
      {children}
    </balanceContext.Provider>
  );
}
