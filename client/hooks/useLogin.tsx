import { createContext, useState, ReactNode, useContext } from 'react';
import { useRouter } from 'next/router';

import { balanceContext } from './useBalance';
import { isLoadedContext } from './useLoading';

const defaultContext = {
  logged: false,
  setLogged: (boolean) => {},
};

export const loginContext = createContext(defaultContext);

type BalanceProviderType = {
  children: ReactNode;
};

const url = `http://192.168.1.225:3001/dashboard?userId=${1}`;

export function LoginProvider({ children }: BalanceProviderType) {
  const { setBalance } = useContext(balanceContext);
  const { setLoaded } = useContext(isLoadedContext);
  const router = useRouter();
  const setLogged = (login) => {
    setState({ logged: login, setLogged });
    setLoaded(false);
    if (login === true) {
      fetch(url)
        .then((res) => res.json())
        .then((response) => {
          setBalance(response);
          setLoaded(true);
        });
      setTimeout(() => router.push('/dashboard'), 1000);
    }
  };

  const initialState = {
    ...defaultContext,
    setLogged,
  };

  const [state, setState] = useState(initialState);

  return (
    <loginContext.Provider value={state}>{children}</loginContext.Provider>
  );
}
