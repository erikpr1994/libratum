import { createContext, useState, ReactNode } from 'react';

export const balanceContext = createContext(undefined);
export const balanceDispatchContext = createContext(undefined);

type BalanceProviderType = {
  children: ReactNode;
};

export function BalanceProvider({ children }: BalanceProviderType) {
  const [balance, setBalance] = useState(0);

  return (
    <balanceContext.Provider value={[balance, setBalance]}>
      {children}
    </balanceContext.Provider>
  );
}
