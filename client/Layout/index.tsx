import { ReactNode } from 'react';

import Bar from 'Components/Bar';

import { BalanceProvider } from '@hooks/useBalance';
import { LoginProvider } from '@hooks/useLogin';
import { LoadingProvider } from '@hooks/useLoading';

import Avatar from 'Components/Avatar';
import Logo from './Logo';
import Navigation from './Navigation';

import { colors } from '../styles/theme.js';

type AppLayoutType = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutType) => {
  const nav = ['dashboard', 'balancer'];

  return (
    <BalanceProvider>
      <LoadingProvider>
        <LoginProvider>
          <div>
            <nav>
              <Logo src={'logo/Original_Transparent.png'} alt="Libratum logo" />
              <Navigation navigation={nav} />
              {
                <Avatar
                  alt="avatar"
                  src="./avatar.jpg"
                  text="Erik Pastor"
                  width={80}
                  height={80}
                />
              }
            </nav>

            <Bar>
              <main>{children}</main>
            </Bar>
          </div>
        </LoginProvider>
      </LoadingProvider>
      <style jsx>{`
        div {
          height: 100%;
          width: 100%;
        }

        nav {
          position: fixed;
          height: 100px;
          width: 100vw;
          background: ${colors.white};
          padding: 0 2em;
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          grid-template-rows: 100px;
          color: ${colors.black};
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
          align-items: center;
          justify-content: center;
        }

        main {
          width: 100%;
          position: absolute;
          bottom: 0;
          height: calc(100vh - 100px);
          background: ${colors.Cultured};
          padding: 1em;
          display: flex;
          place-content: center;
          place-items: center;
          overflow: auto;
        }
      `}</style>
    </BalanceProvider>
  );
};

export default AppLayout;
