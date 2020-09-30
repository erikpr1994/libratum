import {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

type typeBalanceContext = {
  balance?: any[];
  setBalance?: Dispatch<SetStateAction<any[]>>;
};

const defaultBalanceContext: typeBalanceContext = {};

export const balanceContext = createContext(defaultBalanceContext);

type BalanceProviderType = {
  children: ReactNode;
};

export function BalanceProvider({ children }: BalanceProviderType) {
  const [balance, setBalance] = useState<any[]>([]);

  return (
    <balanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </balanceContext.Provider>
  );
}
