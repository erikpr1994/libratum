import { useContext } from 'react';

import { balanceContext } from '@hooks/balanceProvider';

export default function balancer() {
  const [balance, setBalance] = useContext(balanceContext);

  const increment = () => {
    setBalance(3);
  };

  return (
    <>
      <h1>Hello!</h1>

      <p>{balance}</p>
      <div onClick={increment}>BUTTON</div>
    </>
  );
}
