import { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

const defaultContext = {
  logged: false,
  setLogged: (boolean) => {},
};

export const loginContext = createContext(defaultContext);

type BalanceProviderType = {
  children: ReactNode;
};

export function LoginProvider({ children }: BalanceProviderType) {
  const router = useRouter();
  const setLogged = (login) => {
    setState(login);
    if (login === true) {
      console.log('fired');

      router.push('/dashboard');
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
